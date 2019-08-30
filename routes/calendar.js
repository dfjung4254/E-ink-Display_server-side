var express = require('express');
const Jwt = require('jsonwebtoken');
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const config = require('../config');
var User = require('../model/user');
var router = express.Router();

/* TODO Author : 정근화 */

/*

    본 모듈은 /calendar 로 들어온다.
    google calendar api 호출을 사용하여
    개인의 달략에 관한 요청값을 반환한다.

    참고 : https://developers.google.com/calendar/quickstart/nodejs

    * 호출 과정
    1. 먼저 요청의 헤더로 부터 jwt를 수신한다.
    2. jwt 를 verify 하고 jwt 로 부터 user_id 검출한다.
    3. user_id 로 DB 를 조회하여 access_token 을 조회한다.
``
*/

/* JWT 인증을 위한 secret 키 */
const SECRET = config.JWT_SECRET;

/* google calendar 를 위한 credential 인증 정보 */
const CLIENT_ID = config.WEB_CLIENT_ID;
const CLIENT_SECRET = config.WEB_CLIENT_SECRET;
const CLIENT_REDIRECT_URIS = config.WEB_REDIRECT_URIS;

/* 달력 호출을 위한 Scope 설정 */
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

/*

    /calendar/next
    
    post 로 들어온 유저의 JWT 값을 인증하고
    userId 값으로 DB를 조회하여 googleToken을 조회한 후
    
    구글 Calendar api 를 호출한다.
    다음 primary calendar의 다음 10일 일정을 받아서
    반환한다.

    ** 10일 이 아닐 경우 body 에 nextCount : 12 이런식으로
    불러올 리스트의 개수를 parameter로 넣어서 호출한다.

*/
router.post('/next', function (req, res) {

    // /* 헤더로 부터 JWT 를 수신한다. */
    // var reqJwt = req.headers.jwt;

    // /* 받아온 JWT 를 검사한다. */
    // /*
    
    //     token does not exist
    //     - 토큰이 존재하지 않음(로그인 안된 상태) 403 반환

    // */
    // if (!reqJwt) {
    //     return res.status(403).json({
    //         success: false,
    //         message: 'not logged in'
    //     })
    // }

    // /*
    
    //     token exixt
    //     - 토큰 존재, 토큰의 유효성을 검증하고
    //     유효하면 디코딩된 값에서 userId 값을 추출한다.

    // */
    // var decoded = Jwt.verify(reqJwt, SECRET);
    // console.log("decoded userId : " + decoded.userId);

    /* 요청에서 jwt 를 추출한 다음 veryfy 및 decoding 한다. */
    var decoded = verifyJwt(req);

    /* 달력의 일정리스트 호출 개수의 디폴트값은 10이다. */
    var maxCount = req.body.nextCount;
    if(!maxCount){
        maxCount = 10;
    }

    /*

        userId 값을 통해 db의
        AuthCode 값을 조회한다.
        authCode 조회 성공 후 인증된 auth클라이언트를 이용해
        원하는 함수를 호출한다. (listEvents 실행)

    */
    getAuthCode(decoded.userId).then(authClient => {
        console.log("authClient get : "+ authClient);
        if(authClient){
            listEvents(authClient, maxCount, res);
        }else{
            res.set(500);
            res.end();
        }        
    });

});

/*

    /calendar/certainday
    
    post 로 들어온 유저의 JWT 값을 인증하고
    userId 값으로 DB를 조회하여 googleToken을 조회한다.

     - yyyy (4자리 int)
     - m or mm (1 또는 2자리 int)
     - d or dd (1 또는 2자리 int)

    또한 요청 body 의 값을 통해 특정 년, 월, 일을 추출한다.
    
    구글 Calendar api 를 호출한다.
    해당 년, 월, 일의 제목과 내용을 호출하여 반환한다.

*/
router.post('/certainday', function(req, res){

    var decoded = verifyJwt(req);

    var _year = req.body.year;
    var _month = req.body.month;
    var _day = req.body.day;

    var _minDate = new Date(_year, _month - 1, _day, 0, 0, 0);
    var _maxDate = new Date(_year, _month - 1, _day + 1, 0, 0, 0);

    getAuthCode(decoded.userId).then(authClient => {
        if(authClient){
            listCertainDay(authClient, _minDate, _maxDate, res);
        }else{
            res.set(500);
            res.end();
        }
    });

});

/*

    User DB 에서 user_id 를 사용하여 해당 유저의
    access_Token 을 반환한다.

*/
async function getAuthCode(user_id) {

    try {

        var resultUser = await User.findOne({ userId: user_id }).catch(console.error);

        if (resultUser) {

            /* 구글 토큰 존재 */
            /*
    
                credential 정보로 OAuth 클라이언트 객체를 생성하고
                DB에 존재하던 authCode 로 getToken 을 얻어낸다.
                객체에 토큰 값을 담는다.
    
                Create an OAuth2 client with the given credentials, and then execute the
                given callback function.
                @param {Object} credentials The authorization client credentials.
                @param {function} callback The callback to call with the authorized client.
            
            */
            console.log("OAuth start");
            const oAuth2Client = new google.auth.OAuth2(
                CLIENT_ID, CLIENT_SECRET, CLIENT_REDIRECT_URIS);
            console.log("OAuth2Client is created!");

            // const authUrl = oAuth2Client.generateAuthUrl({
            //     access_type: 'offline',
            //     scope: SCOPES,
            // });
            // console.log('Authorize this app by visiting this url:', authUrl);

            // console.log("Enter oAuth2Client.getToken : resultUser.google_authCode : " + resultUser.tokens.access_token);
            // const { tokens } = await oAuth2Client.getToken(resultUser.access_token);
            // console.log("oAuth2Client.getToken success! : " + tokens.toString());

            console.log("access_token : " + resultUser.tokens.access_token);
            console.log("oAuth2Client.refresh_token[pre] : " + JSON.stringify(oAuth2Client.credentials));
            // oAuth2Client.setCredentials(resultUser.tokens);

            oAuth2Client.credentials = {
                refresh_token: resultUser.tokens.refresh_token,
                access_token: resultUser.tokens.access_token
            };
            // oAuth2Client.refreshAccessToken(function (err, tokens) {
            //     console.log(tokens)
            //     oAuth2Client.credentials = { access_token: tokens.access_token }
            //     callback(oauth2Client);
            // });

            console.log("oAuth2Client.access_token : " + oAuth2Client.credentials.access_token);
            console.log("oAuth2Client.refresh_token : " + oAuth2Client.credentials.refresh_token);
            console.log("OAuth finish");

            /*
    
                accessToken 의 만료시점이 다가올 경우 감지하여 refreshToken 을 발급받는다.
                refreshToken 을 발급받아 DB 에 토큰으로 저장한다.
    
            */
            oAuth2Client.on(resultUser.tokens, (tokens) => {
                if (tokens.refresh_token) {

                    // store the refresh_token in my database!
                    console.log("REFRESH_TOKEN*** : " + tokens.refresh_token);

                    refreshToken(tokens.refreshToken);

                }

                console.log("ACCESS_TOKEN*** : " + tokens.access_token);
                console.log("ID_TOKEN*** : " + tokens.id_token);

            });

            return oAuth2Client;
            // listEvents(oAuth2Client, res);

        } else {

            return null;
            /* 구글 토큰 미존재 */
            // res.set(500);
            // res.end();
        }



    } catch (err) {

        console.error(err);

    }

}

/*

    현재 시간으로부터 다음 count개의 이벤트를 유저의 primary 달력에서 가져온다.

    Lists the next 10 events on the user's primary calendar.
    @param {google.auth.OAuth2} auth An authorized OAuth2 client.

*/
function listEvents(auth, count, response) {

    console.log("entered listEvent, Auth : " + auth);

    const calendar = google.calendar({ version: 'v3', auth });
    calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: count,
        singleEvents: true,
        orderBy: 'startTime',
    }, (err, res) => {
        if (err){
            response.set(400);
            response.end();
            return console.log('The API returned an error: ' + err);
        } 

        /* 달력 이벤트 객체를 리턴 */
        const events = res.data.items;
        var retObj = new Object();
        retObj.days = events;
        console.log("Calendar 10days return : " + JSON.stringify(retObj));
        response.json(retObj);

    });
}

/*

    특정 범위의 날짜 구간의 이벤트를
    유저의 primary 달력에서 가져온다.

    해당 minDate, maxDate 는 시간까지 정의가 되어 있어야 한다.

*/
function listCertainDay(auth, minDate, maxDate, response){

    console.log("entered listCertainDay, Auth : " + auth);

    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.list({
        calendarId: 'primary',
        timeMin: minDate.toISOString(),
        timeMax: maxDate.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
    }, (err, res) => {
        if(err){
            response.set(400);
            response.end();
            return console.log('The API returned an error: ' + err);            
        }

        /* 달력 이벤트 객체를 리턴 */
        const events = res.data.items;
        var retObj = new Object();
        retObj.days = events;
        console.log("Calendar Certain days(" + minDate.toISOString + ") return : " + JSON.stringify(retObj));
        response.json(retObj);        

    });

}

/*

    해당 JWT 토큰을 입증하고 디코딩 된 값에서
    userId 를 추출한다.

*/
function verifyJwt(req){

    /* 헤더로 부터 JWT 를 수신한다. */
    var reqJwt = req.headers.jwt;

    /* 받아온 JWT 를 검사한다. */
    /*
    
        token does not exist
        - 토큰이 존재하지 않음(로그인 안된 상태) 403 반환

    */
    if (!reqJwt) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }

    /*
    
        token exixt
        - 토큰 존재, 토큰의 유효성을 검증하고
        유효하면 디코딩된 값에서 userId 값을 추출한다.

    */
    var decoded = Jwt.verify(reqJwt, SECRET);
    console.log("decoded userId : " + decoded.userId);

    return decoded;

}

/*
 
    accessToken 은 기한이 만료된다.
    oAuthClient.on 으로 기한이 만료되면 다음 refreshToken 을
    보급한다. 이때 토큰을 DB 에 갱신하여 저장해준다.
 
*/
async function refreshToken(refreshToken) {

    try {

        /* userId 가 일치하는 유저가 DB에 존재하는지 조회한다. */
        var resultUser = await User.findOne({ userId: payload.sub });

        /* 조회한 유저의 구글 토큰값을 갱신한다. */
        resultUser.tokens = refreshToken;
        resultUser = await resultUser.save();

    } catch (err) {

        console.error(err);

    }

}

module.exports = router;