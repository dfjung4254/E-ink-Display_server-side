/* TODO: Author : 정근화 */

/*

    에러를 발생 시 LogHandler를 거쳐 ErrorHandler 에서
    처리한다.

    해당 에러메세지와 상태를 담아 응답함.

*/
module.exports = (err, req, res, next) => {

    res.status(err.status || 400);
    res.json(err);

};
