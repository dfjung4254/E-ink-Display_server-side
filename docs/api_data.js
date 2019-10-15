define({ "api": [
  {
    "type": "delete",
    "url": "/calendar/:_id",
    "title": "DeleteCalendar",
    "name": "DeleteCalendar",
    "group": "Calendar",
    "description": "<p>기존의 캘린더 일정을 삭제합니다.</br></p> <pre><code>_id 값은 GET 을 통해 넘어온 calendar 의 _id 값이며,&lt;/br&gt; URL 을 통해 삭제하고자 하는 특정 calendar 일정을 지정할 수 있습니다.&lt;/br&gt;</code></pre>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":_id",
            "description": "<p>URL 의 path 에 올려야 하는 해당 일정의 고유번호입니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(url) 예제",
          "content": "URL : http://169.56.98.117/calendar/b25dtstnmhjk4rploc5gl2vvks",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>캘린더 삭제에 성공 메세지가 담겨있습니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>캘린더 삭제 api 통신 상태는 200 입니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Calendar Event [b25dtstnmhjk4rploc5gl2vvks] delete Success!\",\n    \"status\": 200\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FAILED_GOOGLE",
            "description": "<p>Google API 를 호출하는데 실패하였습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : FAILED_GOOGLE",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"FAILED_GOOGLE\",\n    \"message\": \"Failed to GET google calendar api!\",\n    \"status\": 500\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/calendar.js",
    "groupTitle": "Calendar"
  },
  {
    "type": "get",
    "url": "/calendar/certainday/:year/:month/:day",
    "title": "GetCertainDay",
    "name": "GetCertainDay",
    "group": "Calendar",
    "description": "<p>요청받은 년(yyyy), 월(mm), 일(dd) 에 따라 해당 일에 등록된 일정들을 리턴합니다</br> 달력리스트는 JSONObject 형태로 리턴되는 것이 아니라</br> JSONArray 형태로 리턴되는것에 유의하셔야 합니다.</br> 요청 들어온 유저의 JWT 값을 인증하고</br> userId 값으로 DB를 조회하여 googleToken을 조회한다.</br></br></p> <pre><code> - yyyy (4자리 int)&lt;/br&gt;  - m or mm (1 또는 2자리 int)&lt;/br&gt;  - d or dd (1 또는 2자리 int)&lt;/br&gt;&lt;/br&gt;  또한 요청 body 의 값을 통해 특정 년, 월, 일을 추출한다.&lt;/br&gt;&lt;/br&gt;  구글 Calendar api 를 호출한다.&lt;/br&gt; 해당 년, 월, 일의 제목과 내용을 호출하여 반환한다.&lt;/br&gt;</code></pre>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":year",
            "description": "<p>URL에 가져올 일정의 날짜의 년도를 적습니다. (yyyy)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":month",
            "description": "<p>URL에 가져올 일정의 날짜의 월을 적습니다. (m 또는 mm)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":day",
            "description": "<p>URL에 가져올 일정의 날짜의 일을 적습니다. (d 또는 dd)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(url) 예제",
          "content": "http://169.56.98.117/calendar/certainday/2019/8/29",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>현재 캘린더 정보의 고유 id 값, _id를 통해 PUT, DELETE 할 수 있습니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "day",
            "description": "<p>몇 일인지 나타냅니다. startTime 기준으로 일정의 시작일을 나타냅니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>일정의 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "memo",
            "description": "<p>일정의 메모, 내용</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>일정의 시작 시간을 뜻합니다.</br> yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br> [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "endTime",
            "description": "<p>일정의 종료 시간을 뜻합니다.</br> yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br> [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>일정의 장소</p>"
          },
          {
            "group": "Success 200",
            "type": "People[]",
            "optional": false,
            "field": "people",
            "description": "<p>이 일정에 함께 참여하는 사람들을 배열의 형태로 담고 있습니다.</br> 기본적으로 POST 를 통해 일정을 등록하면 자기자신이 자동으로 추가됩니다.</br> 만약 타인이 자기자신의 계정을 이 people 배열에 포함하여 일정을 등록했다면</br> 자신의 계정에서도 해당 일정이 GET 됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-email",
            "description": "<p>참여자의 이메일을 나타냅니다.</br> 일정을 등록할 때 참여자의 email 정보는 필수입니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "people-self",
            "description": "<p>참여자의 배열중에 자기자신의 정보에는 self : true 로 표시됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-organizer",
            "description": "<p>이 일정을 생성한 사람입니다. </br> 생성한 사람의 정보에만 organizer : true 가 표시됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-responseStatus",
            "description": "<p>해당 참여자가 이 일정에 참여하는지 참여하지 않는지 여부를 나타냅니다.</br> needsAction : 아직 응답 안함</br> declined : 일정 거절됨</br> accepted : 일정 수락함</br> tentative : 일정 잠정적 수</br>락 이 기능을 구현하지 않으실거라면 굳이 안건드리셔도 됩니다.</br> 만약 일정 수락과 초대를 구현하려면 responseStatus 를 PUT 하는 방식으로 만드시면 됩니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n[\n    // 2019년 8월 29 일의 일정들이 Array 형태로 리턴됩니다.\n    {\n        \"_id\": \"0qs3g68igdd8gmnddri9hhk171\",\n        \"day\": 29,\n        \"title\": \"코딩테스트 공부\",\n        \"memo\": \"\",\n        \"startTime\": \"2019-08-29\",\n        \"endTime\": \"2019-08-30\",\n        \"location\": \"\",\n        \"people\":[]\n    },\n    {\n        \"_id\": \"49n80mkp9he93ftr9vt532g0tq\",\n        \"day\": 29,\n        \"title\": \"혼자 공부하기 ㅋ\",\n        \"memo\": \"\",\n        \"startTime\": \"2019-08-29\",\n        \"endTime\": \"2019-08-30\",\n        \"location\": \"\",\n        \"people\":[]\n    },\n    {\n        \"_id\": \"5ac3ec1rvfnsft12cjm1sa3pmu\",\n        \"day\": 29,\n        \"title\": \"네이버 오픈클래스 1시\",\n        \"memo\": \"\",\n        \"startTime\": \"2019-08-29T17:00:00+09:00\",\n        \"endTime\": \"2019-08-29T18:00:00+09:00\",\n        \"location\": \"\",\n        \"people\":[]\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FAILED_GOOGLE",
            "description": "<p>Google API 를 호출하는데 실패하였습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_DATE",
            "description": "<p>URL Path 에서 요청한 날짜가 유효하지 않습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : FAILED_GOOGLE",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"FAILED_GOOGLE\",\n    \"message\": \"Failed to GET google calendar api!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : INVALID_DATE",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"name\" : \"FAILED_GOOGLE\",\n    \"message\": \"You input invalid date, check url parameter again!\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/calendar.js",
    "groupTitle": "Calendar"
  },
  {
    "type": "get",
    "url": "/calendar/certainmonth/:year/:month",
    "title": "GetCertainMonth",
    "name": "GetCertainMonth",
    "group": "Calendar",
    "description": "<p>요청받은 년(yyyy), 월(mm) 따라 해당 월에 등록된 모든 일정들을 리턴합니다</br> 달력리스트는 JSONObject 형태로 리턴되는 것이 아니라</br> JSONArray 형태로 리턴되는것에 유의하셔야 합니다.</br></br></p> <pre><code>사용자의 달력의 해당 년,월에 해당하는 한달 짜리 달력 이벤트 객체를 반환한다.&lt;/br&gt;</code></pre>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":year",
            "description": "<p>URL에 가져올 일정의 날짜의 년도를 적습니다. (yyyy)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":month",
            "description": "<p>URL에 가져올 일정의 날짜의 월을 적습니다. (m 또는 mm)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(url) 예제",
          "content": "http://169.56.98.117/calendar/certainmonth/2019/8",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>현재 캘린더 정보의 고유 id 값, _id를 통해 PUT, DELETE 할 수 있습니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "day",
            "description": "<p>몇 일인지 나타냅니다. startTime 기준으로 일정의 시작일을 나타냅니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>일정의 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "memo",
            "description": "<p>일정의 메모, 내용</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>일정의 시작 시간을 뜻합니다.</br> yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br> [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "endTime",
            "description": "<p>일정의 종료 시간을 뜻합니다.</br> yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br> [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>일정의 장소</p>"
          },
          {
            "group": "Success 200",
            "type": "People[]",
            "optional": false,
            "field": "people",
            "description": "<p>이 일정에 함께 참여하는 사람들을 배열의 형태로 담고 있습니다.</br> 기본적으로 POST 를 통해 일정을 등록하면 자기자신이 자동으로 추가됩니다.</br> 만약 타인이 자기자신의 계정을 이 people 배열에 포함하여 일정을 등록했다면</br> 자신의 계정에서도 해당 일정이 GET 됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-email",
            "description": "<p>참여자의 이메일을 나타냅니다.</br> 일정을 등록할 때 참여자의 email 정보는 필수입니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "people-self",
            "description": "<p>참여자의 배열중에 자기자신의 정보에는 self : true 로 표시됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-organizer",
            "description": "<p>이 일정을 생성한 사람입니다. </br> 생성한 사람의 정보에만 organizer : true 가 표시됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-responseStatus",
            "description": "<p>해당 참여자가 이 일정에 참여하는지 참여하지 않는지 여부를 나타냅니다.</br> needsAction : 아직 응답 안함</br> declined : 일정 거절됨</br> accepted : 일정 수락함</br> tentative : 일정 잠정적 수</br>락 이 기능을 구현하지 않으실거라면 굳이 안건드리셔도 됩니다.</br> 만약 일정 수락과 초대를 구현하려면 responseStatus 를 PUT 하는 방식으로 만드시면 됩니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n[\n    // List<Calendar> 형태로 바로 Calendar의 배열 형태로 응답합니다.\n    // 현재 이 Calendar 객체는 8월 1일의 일정이며\n    // 이 일정을 조회하고 있는 주체는 dfjung4254@gmail.com 입니다(self:true 확인)\n    // 아직 조회한 본인은 이 일정에 대해 수락도 거절도 하지 않았습니다.\n    // 이 일정을 처음 만들고 초대한 사람은 thals_7@naver.com 입니다(organizer:true 확인)\n    {\n        \"_id\": \"32imkacocdposb9lqhndghihs7\",\n        \"day\": 1,\n        \"title\": \"엣지테스트 8월 1일\",\n        \"memo\": \"\",\n        \"startTime\": \"2019-08-01\",\n        \"endTime\": \"2019-08-02\",\n        \"location\": \"\",\n        \"people\":\n        [\n            {\n                \"email\": \"dfjung4254@gmail.com\",\n                \"self\": true,\n                \"responseStatus\": \"needsAction\"\n            },\n            {\n                \"email\": \"zohizohi@naver.com\",\n                \"responseStatus\": \"needsAction\"\n            },\n            {\n                \"email\": \"thals_7@naver.com\",\n                \"organizer\": true,\n                \"responseStatus\": \"accepted\"\n            }\n        ]\n    },\n    {\"_id\": \"5o7s20cg1urrkhbercs74jn1i3\", \"day\": 13, \"title\": \"SK 회식있음\", \"memo\": \"\",…},\n    {\"_id\": \"hasarvvng5nblt34pt6f7soo10\", \"day\": 13, \"title\": \"새로운 달력추가 테스트\", \"memo\": \"내용이 추가된다\",…},\n    {\"_id\": \"578om28da3n7mb7omnn4a497as\", \"day\": 14, \"title\": \"SK 인턴 프로젝트 스터디\", \"memo\": \"\",…},\n    {\"_id\": \"66rlqqjq460vq4noslke5kvlvs\", \"day\": 15, \"title\": \"SK 인턴 프로젝트 마무리\", \"memo\": \"\",…},\n    {\"_id\": \"5496736sul96hfnj1vu75hff76\", \"day\": 17, \"title\": \"구글\", \"memo\": \"\",…},\n    {\"_id\": \"jgak5v3ft7m7gismh8ei19sfm0\", \"day\": 24, \"title\": \"새로운 일정임 ㅋ\", \"memo\": \"\",…},\n    {\"_id\": \"3et0gc1kv1u7fafdt22kh47unc\", \"day\": 25, \"title\": \"오늘은 노는날\", \"memo\": \"\",…},\n    {\"_id\": \"40ltp06usjbq7i4k3g5ikilmph\", \"day\": 28, \"title\": \"청각장애졸업프로젝트HereHear\", \"memo\": \"\",…},\n    {\"_id\": \"0qs3g68igdd8gmnddri9hhk171\", \"day\": 29, \"title\": \"코딩테스트 공부\", \"memo\": \"\",…},\n    {\"_id\": \"49n80mkp9he93ftr9vt532g0tq\", \"day\": 29, \"title\": \"혼자 공부하기 ㅋ\", \"memo\": \"\",…},\n    {\"_id\": \"5ac3ec1rvfnsft12cjm1sa3pmu\", \"day\": 29, \"title\": \"네이버 오픈클래스 1시\", \"memo\": \"\",…},\n    {\"_id\": \"7dmtil6117eb01avsv5ev51rkd\", \"day\": 31, \"title\": \"엣지테스트 8월 31일\", \"memo\": \"\",…},\n    {\"_id\": \"363cb88pk7i3evn2tbi3esdocf\", \"day\": 31, \"title\": \"오늘은 열심히 노는날 ㅋ\", \"memo\": \"\",…}\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FAILED_GOOGLE",
            "description": "<p>Google API 를 호출하는데 실패하였습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_DATE",
            "description": "<p>URL Path 에서 요청한 날짜가 유효하지 않습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : FAILED_GOOGLE",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"FAILED_GOOGLE\",\n    \"message\": \"Failed to GET google calendar api!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : INVALID_DATE",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"name\" : \"FAILED_GOOGLE\",\n    \"message\": \"You input invalid date, check url parameter again!\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/calendar.js",
    "groupTitle": "Calendar"
  },
  {
    "type": "get",
    "url": "/calendar/next/:nextCount",
    "title": "GetNextLists",
    "name": "GetNextLists",
    "group": "Calendar",
    "description": "<p>현재 시간으로부터 다음 :nextCount 개의 일정을 가져옵니다.</br> 달력리스트는 JSONObject 형태로 리턴되는 것이 아니라</br> JSONArray 형태로 리턴되는것에 유의하셔야 합니다.</br> post 로 들어온 유저의 JWT 값을 인증하고</br> userId 값으로 DB를 조회하여 googleToken을 조회한 후</br> 구글 Calendar api 를 호출한다.</br> 다음 primary calendar의 다음 10일 일정을 받아서</br> 반환한다.</br></br></p> <ul> <li>10일 이 아닐 경우 body 에 nextCount : 12 이런식으로</br> 불러올 리스트의 개수를 parameter로 넣어서 호출한다.</br></li> </ul>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":nextCount",
            "description": "<p>URL에 가져올 일정의 최대 개수를 적습니다.(Max 2500)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(url) 예제",
          "content": "http://169.56.98.117/calendar/next/5",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>현재 캘린더 정보의 고유 id 값, _id를 통해 PUT, DELETE 할 수 있습니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "day",
            "description": "<p>몇 일인지 나타냅니다. startTime 기준으로 일정의 시작일을 나타냅니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>일정의 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "memo",
            "description": "<p>일정의 메모, 내용</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>일정의 시작 시간을 뜻합니다.</br> yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br> [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "endTime",
            "description": "<p>일정의 종료 시간을 뜻합니다.</br> yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br> [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>일정의 장소</p>"
          },
          {
            "group": "Success 200",
            "type": "People[]",
            "optional": false,
            "field": "people",
            "description": "<p>이 일정에 함께 참여하는 사람들을 배열의 형태로 담고 있습니다.</br> 기본적으로 POST 를 통해 일정을 등록하면 자기자신이 자동으로 추가됩니다.</br> 만약 타인이 자기자신의 계정을 이 people 배열에 포함하여 일정을 등록했다면</br> 자신의 계정에서도 해당 일정이 GET 됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-email",
            "description": "<p>참여자의 이메일을 나타냅니다.</br> 일정을 등록할 때 참여자의 email 정보는 필수입니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "people-self",
            "description": "<p>참여자의 배열중에 자기자신의 정보에는 self : true 로 표시됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-organizer",
            "description": "<p>이 일정을 생성한 사람입니다. </br> 생성한 사람의 정보에만 organizer : true 가 표시됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-responseStatus",
            "description": "<p>해당 참여자가 이 일정에 참여하는지 참여하지 않는지 여부를 나타냅니다.</br> needsAction : 아직 응답 안함</br> declined : 일정 거절됨</br> accepted : 일정 수락함</br> tentative : 일정 잠정적 수</br>락 이 기능을 구현하지 않으실거라면 굳이 안건드리셔도 됩니다.</br> 만약 일정 수락과 초대를 구현하려면 responseStatus 를 PUT 하는 방식으로 만드시면 됩니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n[\n    // List<Calendar> 형태로 바로 Calendar의 배열 형태로 응답합니다.\n    // 현재 이 Calendar 객체는 10월 15일의 일정이며\n    // 이 일정을 조회하고 있는 주체는 dfjung4254@gmail.com 입니다(self:true 확인)\n    // 아직 조회한 본인은 이 일정에 대해 수락도 거절도 하지 않았습니다.\n    // 이 일정을 처음 만들고 초대한 사람은 thals_7@naver.com 입니다(organizer:true 확인)\n    {\n        \"_id\": \"0sbudc844ukmn2eg8csfstnkvf\",\n        \"day\": 15,\n        \"title\": \"참여자기능테스트\",\n        \"memo\": \"충정로에서 참여자기능을 테스트한다.\",\n        \"startTime\": \"2019-10-15\",\n        \"endTime\": \"2019-10-16\",\n        \"location\": \"충정로역, 대한민국 서울특별시 중림동\",\n        \"people\":\n        [\n            {\n                \"email\": \"dfjung4254@gmail.com\",\n                \"self\": true,\n                \"responseStatus\": \"needsAction\"\n            },\n            {\n                \"email\": \"zohizohi@naver.com\",\n                \"responseStatus\": \"needsAction\"\n            },\n            {\n                \"email\": \"thals_7@naver.com\",\n                \"organizer\": true,\n                \"responseStatus\": \"accepted\"\n            }\n        ]\n    },\n    {\"_id\": \"5i5em46bmqeecm644dhnkf31t4\", \"day\": 16, \"title\": \"\", \"memo\": \"\",…},\n    {\"_id\": \"9jthsj3ueleqirjm3ita1e2ja8\", \"day\": 17, \"title\": \"초대하기 완성\", \"memo\": \"내용이 추가된다\",…},\n    {\"_id\": \"n79l2km1du62q1ml8ifbqd7bpo\", \"day\": 20, \"title\": \"최종 달력 추가?\", \"memo\": \"내용이 추가된다\",…},\n    {\"_id\": \"tnqgdoqmona5uu41vap5j81nok\", \"day\": 21, \"title\": \"최종 달력 추가1111?\", \"memo\": \"내용이 추가된다\",…}\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FAILED_GOOGLE",
            "description": "<p>Google API 를 호출하는데 실패하였습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : FAILED_GOOGLE",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"FAILED_GOOGLE\",\n    \"message\": \"Failed to GET google calendar api!\",\n    \"status\": 500\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/calendar.js",
    "groupTitle": "Calendar"
  },
  {
    "type": "post",
    "url": "/calendar",
    "title": "InsertCalendar",
    "name": "InsertCalendar",
    "group": "Calendar",
    "description": "<p>새로운 캘린더 일정을 삽입합니다.</br> 함께 넘어온 body parameter 값에 맞게 GoogleCalendar 에</br> 일정에 등록됩니다.</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>달력 일정의 타이틀</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "memo",
            "description": "<p>달력 일정의 메모</p>"
          },
          {
            "group": "Parameter",
            "type": "ISOString",
            "optional": false,
            "field": "startTime",
            "description": "<p>달력 일정의 시작시간</br> ISOString 형태로 전달이 됩니다.</br> RFC3339 표준 시간 형식을 사용하며</br> JAVA 에서는 new Date().toISOString()</br> &quot;2019-08-14T09:25:50.136Z&quot; 의 형식으로 request 하면될겁니다</br> (자바 클래스로는 테스트 안해봤음, 실험필요)</br></br> new Date() 로 원하는 날짜, 시간을 설정한 다음 그 Date 객체를</br> ISOString() 화 하여 바디에 startTime 에 넣어주시면 될겁니다.</br></p>"
          },
          {
            "group": "Parameter",
            "type": "ISOString",
            "optional": false,
            "field": "endTime",
            "description": "<p>달력 일정의 종료시간</br> ISOString 형태로 전달이 됩니다.</br> RFC3339 표준 시간 형식을 사용하며</br> JAVA 에서는 new Date().toISOString()</br> &quot;2019-08-14T09:25:50.136Z&quot; 의 형식으로 request 하면될겁니다</br> (자바 클래스로는 테스트 안해봤음, 실험필요)</br></br> new Date() 로 원하는 날짜, 시간을 설정한 다음 그 Date 객체를</br> ISOString() 화 하여 바디에 endTime 에 넣어주시면 될겁니다.</br></p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>달력 일정의 장소</p>"
          },
          {
            "group": "Parameter",
            "type": "People[]",
            "optional": false,
            "field": "people",
            "description": "<p>다른 참여자가 있을 경우 people배열에 이메일을 포함해주시면 됩니다.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "people-email",
            "description": "<p>각 people 객체에 email 값만 추가해주면 해당 참여자에게도 일정이 표시됩니다.</br> 단 이때, 타인의 이메일만 넣기만 하면 되고 자기 자신은 추가하지 않습니다.</br> 다른 사람의 email만 배열에 추가하여 요청하면 자동으로 자기자신도 people에 추가됨.</br></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(body) 예제",
          "content": "    {\n    \t\"title\": \"POST 달력 등록 테스트\",\n\t    \"memo\": \"내용이 추가된다\",\n    \t\"startTime\": \"2019-10-8T04:00:00+09:00\",\n\t    \"endTime\": \"2019-10-8T05:00:00+09:00\",\n\t    \"location\": \"장소는 우리집 ㅋ\",\n        \"people\":\n        [\n            // 자기 자신은 people 에 넣지 않습니다(자동으로 추가됨)\n            {\n                // 초대할 참가자 이메일 1\n                \"email\":\"zohizohi@naver.com\"\n            },\n            {\n                // 초대할 참가자 이메일 2\n                \"email\":\"thals_7@naver.com\" \n            }\n        ]\n    }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>현재 캘린더 정보의 고유 id 값, _id를 통해 PUT, DELETE 할 수 있습니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "day",
            "description": "<p>몇 일인지 나타냅니다. startTime 기준으로 일정의 시작일을 나타냅니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>일정의 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "memo",
            "description": "<p>일정의 메모, 내용</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>일정의 시작 시간을 뜻합니다.</br> yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br> [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "endTime",
            "description": "<p>일정의 종료 시간을 뜻합니다.</br> yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br> [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>일정의 장소</p>"
          },
          {
            "group": "Success 200",
            "type": "People[]",
            "optional": false,
            "field": "people",
            "description": "<p>이 일정에 함께 참여하는 사람들을 배열의 형태로 담고 있습니다.</br> 기본적으로 POST 를 통해 일정을 등록하면 자기자신이 자동으로 추가됩니다.</br> 만약 타인이 자기자신의 계정을 이 people 배열에 포함하여 일정을 등록했다면</br> 자신의 계정에서도 해당 일정이 GET 됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-email",
            "description": "<p>참여자의 이메일을 나타냅니다.</br> 일정을 등록할 때 참여자의 email 정보는 필수입니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "people-self",
            "description": "<p>참여자의 배열중에 자기자신의 정보에는 self : true 로 표시됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-organizer",
            "description": "<p>이 일정을 생성한 사람입니다. </br> 생성한 사람의 정보에만 organizer : true 가 표시됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-responseStatus",
            "description": "<p>해당 참여자가 이 일정에 참여하는지 참여하지 않는지 여부를 나타냅니다.</br> needsAction : 아직 응답 안함</br> declined : 일정 거절됨</br> accepted : 일정 수락함</br> tentative : 일정 잠정적 수</br>락 이 기능을 구현하지 않으실거라면 굳이 안건드리셔도 됩니다.</br> 만약 일정 수락과 초대를 구현하려면 responseStatus 를 PUT 하는 방식으로 만드시면 됩니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    // 현재 이 Calendar 객체는 8월 1일의 일정이며\n    // 이 일정을 조회하고 있는 주체는 dfjung4254@gmail.com 입니다(self:true 확인)\n    // 아직 조회한 본인이 이 일정을 만들었기 때문에 (responseStatus 는 accepted 입니다.)\n    // 이 일정을 처음 만들고 초대한 사람 역시 조회하고 있는 주체입니다(organizer:true 확인)\n    \"_id\": \"b25dtstnmhjk4rploc5gl2vvks\",\n    \"day\": 8,\n    \"title\": \"POST 달력 등록 테스트\",\n    \"memo\": \"내용이 추가된다\",\n    \"startTime\": \"2019-10-08T04:00:00+09:00\",\n    \"endTime\": \"2019-10-08T05:00:00+09:00\",\n    \"location\": \"장소는 우리집 ㅋ\",\n    \"people\":\n    [\n        {\n            \"email\": \"thals_7@naver.com\",\n            \"responseStatus\": \"needsAction\"\n        },\n        // 요청 파라미터에서 본인의 정보는 추가 하지 않았지만\n        // 자동으로 추가됩니다.\n        {\n            \"email\": \"dfjung4254@gmail.com\",\n            \"organizer\": true,\n            \"self\": true,\n            \"responseStatus\": \"accepted\"\n        },\n        {\n            \"email\": \"zohizohi@naver.com\",\n            \"responseStatus\": \"needsAction\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FAILED_GOOGLE",
            "description": "<p>Google API 를 호출하는데 실패하였습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_CALENDARBODY",
            "description": "<p>요청 body 정보가 없습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : FAILED_GOOGLE",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"FAILED_GOOGLE\",\n    \"message\": \"Failed to GET google calendar api!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : NO_CALENDARBODY",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"name\" : \"NO_CALENDARBODY\",\n    \"message\": \"You did not input calendar body, check request body again!\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/calendar.js",
    "groupTitle": "Calendar"
  },
  {
    "type": "put",
    "url": "/calendar/:_id",
    "title": "UpdateCalendar",
    "name": "UpdateCalendar",
    "group": "Calendar",
    "description": "<p>기존의 캘린더의 일정 정보를 업데이트합니다.</br> 함께 넘어온 body parameter 값에 맞게 GoogleCalendar 에</br> 일정이 변경됩니다.</br></br></p> <pre><code>_id 값은 GET 을 통해 넘어온 calendar 의 _id 값이며,&lt;/br&gt; URL 을 통해 업데이트하고자 하는 특정 calendar 일정을 지정할 수 있습니다.&lt;/br&gt;</code></pre>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>달력 일정의 타이틀</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "memo",
            "description": "<p>달력 일정의 메모</p>"
          },
          {
            "group": "Parameter",
            "type": "ISOString",
            "optional": false,
            "field": "startTime",
            "description": "<p>달력 일정의 시작시간</br> ISOString 형태로 전달이 됩니다.</br> RFC3339 표준 시간 형식을 사용하며</br> JAVA 에서는 new Date().toISOString()</br> &quot;2019-08-14T09:25:50.136Z&quot; 의 형식으로 request 하면될겁니다</br> (자바 클래스로는 테스트 안해봤음, 실험필요)</br></br> new Date() 로 원하는 날짜, 시간을 설정한 다음 그 Date 객체를</br> ISOString() 화 하여 바디에 startTime 에 넣어주시면 될겁니다.</br></p>"
          },
          {
            "group": "Parameter",
            "type": "ISOString",
            "optional": false,
            "field": "endTime",
            "description": "<p>달력 일정의 종료시간</br> ISOString 형태로 전달이 됩니다.</br> RFC3339 표준 시간 형식을 사용하며</br> JAVA 에서는 new Date().toISOString()</br> &quot;2019-08-14T09:25:50.136Z&quot; 의 형식으로 request 하면될겁니다</br> (자바 클래스로는 테스트 안해봤음, 실험필요)</br></br> new Date() 로 원하는 날짜, 시간을 설정한 다음 그 Date 객체를</br> ISOString() 화 하여 바디에 endTime 에 넣어주시면 될겁니다.</br></p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>달력 일정의 장소</p>"
          },
          {
            "group": "Parameter",
            "type": "People[]",
            "optional": false,
            "field": "people",
            "description": "<p>다른 참여자가 있을 경우 people배열에 이메일을 포함해주시면 됩니다.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "people-email",
            "description": "<p>각 people 객체에 email 값만 추가해주면 해당 참여자에게도 일정이 표시됩니다.</br> 단 이때, 타인의 이메일만 넣기만 하면 되고 자기 자신은 추가하지 않습니다.</br> 다른 사람의 email만 배열에 추가하여 요청하면 자동으로 자기자신도 people에 추가됨.</br></p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":_id",
            "description": "<p>URL 의 path 에 올려야 하는 해당 일정의 고유번호입니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(body) 예제",
          "content": "{\n    // title과 memo, Time, location 을 바꾸고,\n    // 본인(self)의 responseStatus를 \"accepted\" 로 바꾸었습니다.\n    // people 의 self:true(본인) 의 참여여부만 변경할 수 있습니다.\n    // organizer 와 self 는 변경안됨.\n    \"title\": \"PUT 달력 변경 테스트\",\n    \"memo\": \"내용이 변경된다\",\n    \"startTime\": \"2019-10-08T04:00:00+09:00\",\n    \"endTime\": \"2019-10-08T05:00:00+09:00\",\n    \"location\": \"장소는 너희집 ㅋ\",\n    \"people\":\n    [\n        {\n            \"email\": \"thals_7@naver.com\",\n            \"organizer\": true,\n            \"responseStatus\": \"accepted\"\n        },\n        {\n            \"email\": \"dfjung4254@gmail.com\",\n            \"self\": true,\n            // needsAction -> accepted\n            \"responseStatus\": \"accepted\"\n        },\n        {\n            \"email\": \"zohizohi@naver.com\",\n            \"responseStatus\": \"needsAction\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "파라미터(url) 예제",
          "content": "URL : http://169.56.98.117/calendar/b25dtstnmhjk4rploc5gl2vvks",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>현재 캘린더 정보의 고유 id 값, _id를 통해 PUT, DELETE 할 수 있습니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "day",
            "description": "<p>몇 일인지 나타냅니다. startTime 기준으로 일정의 시작일을 나타냅니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>일정의 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "memo",
            "description": "<p>일정의 메모, 내용</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "startTime",
            "description": "<p>일정의 시작 시간을 뜻합니다.</br> yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br> [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "endTime",
            "description": "<p>일정의 종료 시간을 뜻합니다.</br> yyyy-mm-dd(HH:MM:SS) 포맷으로 나타나집니다.</br> [JAVA의 Date 클래스와 Nodejs 의 Date가 호환이 되는지 테스트필요]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>일정의 장소</p>"
          },
          {
            "group": "Success 200",
            "type": "People[]",
            "optional": false,
            "field": "people",
            "description": "<p>이 일정에 함께 참여하는 사람들을 배열의 형태로 담고 있습니다.</br> 기본적으로 POST 를 통해 일정을 등록하면 자기자신이 자동으로 추가됩니다.</br> 만약 타인이 자기자신의 계정을 이 people 배열에 포함하여 일정을 등록했다면</br> 자신의 계정에서도 해당 일정이 GET 됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-email",
            "description": "<p>참여자의 이메일을 나타냅니다.</br> 일정을 등록할 때 참여자의 email 정보는 필수입니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "people-self",
            "description": "<p>참여자의 배열중에 자기자신의 정보에는 self : true 로 표시됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-organizer",
            "description": "<p>이 일정을 생성한 사람입니다. </br> 생성한 사람의 정보에만 organizer : true 가 표시됩니다.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "people-responseStatus",
            "description": "<p>해당 참여자가 이 일정에 참여하는지 참여하지 않는지 여부를 나타냅니다.</br> needsAction : 아직 응답 안함</br> declined : 일정 거절됨</br> accepted : 일정 수락함</br> tentative : 일정 잠정적 수</br>락 이 기능을 구현하지 않으실거라면 굳이 안건드리셔도 됩니다.</br> 만약 일정 수락과 초대를 구현하려면 responseStatus 를 PUT 하는 방식으로 만드시면 됩니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"b25dtstnmhjk4rploc5gl2vvks\",\n    \"day\": 8,\n    \"title\": \"PUT 달력 변경 테스트\",\n    \"memo\": \"내용이 변경된다\",\n    \"startTime\": \"2019-10-08T04:00:00+09:00\",\n    \"endTime\": \"2019-10-08T05:00:00+09:00\",\n    \"location\": \"장소는 너희집 ㅋ\",\n    \"people\":\n    [\n        {\n            \"email\": \"thals_7@naver.com\",\n            \"organizer\": true,\n            \"responseStatus\": \"accepted\"\n        },\n        {\n            \"email\": \"dfjung4254@gmail.com\",\n            \"self\": true,\n            \"responseStatus\": \"accepted\"\n        },\n        {\n            \"email\": \"zohizohi@naver.com\",\n            \"responseStatus\": \"needsAction\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FAILED_GOOGLE",
            "description": "<p>Google API 를 호출하는데 실패하였습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_CALENDARBODY",
            "description": "<p>요청 body 정보가 없습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : FAILED_GOOGLE",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"FAILED_GOOGLE\",\n    \"message\": \"Failed to GET google calendar api!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : NO_CALENDARBODY",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"name\" : \"NO_CALENDARBODY\",\n    \"message\": \"You did not input calendar body, check request body again!\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/calendar.js",
    "groupTitle": "Calendar"
  },
  {
    "type": "get",
    "url": "/news",
    "title": "GetNews",
    "name": "GetNews",
    "group": "News",
    "description": "<p>headline-news-naver 모듈을 활용하여</br> 네이버 뉴스의 헤드라인뉴스 5개를 추출 및 반환한다.</br> MODULE INFO : https://github.com/dfjung4254/headline-news-naver</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "null",
            "optional": false,
            "field": "NoHeader",
            "description": "<p>필요한 헤더값 없음(jwt X)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더(x) 예제",
          "content": "No JWT and other Header type",
          "type": "null"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "null",
            "optional": false,
            "field": "NoParameter",
            "description": "<p>요청 파라미터 없음.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(x) 예제",
          "content": "No Parameter",
          "type": "null"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "News[]",
            "optional": false,
            "field": "news_array",
            "description": "<p>JSONArray<News> 의 형태로 News 의 리스트를 가짐.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>뉴스 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "summary",
            "description": "<p>뉴스 소제목</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contents",
            "description": "<p>뉴스 본문</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "imgaeUrl",
            "description": "<p>뉴스 섬네일 이미지 URL</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"news_array\":\n        [\n            {\n                \"title\": \"총수 지분 높을수록 대기업 ‘내부 거래’ 많았다\",\n                \"summary\": \"SK 46조4000억원, 현대차 33조1000억원, 삼성 25조...\",\n                \"contents\": \"공정위 ‘대기업 내부거래 현황’199조원 중 10대 그룹이 151조원SK 46조원...\",\n                \"imageUrl\": \"https://imgnews.pstatic.net/image/025/2019/10/15/0002944698_001_20191015001220252.jpg\"\n            },\n            {\"title\": \"노벨경제학상 빈곤 퇴치 3인…바네르지·뒤플로는 부부\", \"summary\": \"2019년 노벨 경제학상은 빈곤 연구를 전문으로...\",…},\n            {\"title\": \"황교안 “송구스럽다로 넘어갈 일 아니다” 홍익표 “개혁 마무리 못하고 사퇴 아쉽다”\", \"summary\": \"황교안 자유한국당...\",…},\n            {\"title\": \"삼성SDI 2000억원 들여 ESS 화재 막는다\", \"summary\": \"삼성SDI가 또 불거진 에너지저장장치(ESS) 화재 논란에 선제적...\",…},\n            {\"title\": \"남북축구 생중계 결국 무산…“평양 상부서 홍보말라 지시”\", \"summary\": \"15일 평양에서 열리는 카타르 월드컵 2차 예선 남북...\",…}\n        ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FAILED_NEWS",
            "description": "<p>서버에서 네이버뉴스를 크롤링하는데 실패했습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : FAILED_NEWS",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"FAILED_NEWS\",\n    \"message\": \"Failed to crawl naver headline news!\",\n    \"status\": 500\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/news.js",
    "groupTitle": "News"
  },
  {
    "type": "delete",
    "url": "/todo/:id",
    "title": "DeleteTodo",
    "name": "DeleteTodo",
    "group": "Todo",
    "description": "<p>jwt 토큰과 todo 의 _id 값을 통해 현재 유저의 해당 todo 를 삭제합니다.</br> url parameter 에 넣는 _id 값은 GET 을 통해 todolist 를 호출 했을 때</br> 각 todo 객에가 지니고 있는 &quot;_id&quot; 의 value 값 입니다.</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":_id",
            "description": "<p>URL에 지울 todo 정보의 고유 아이디 값을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(url) 예제",
          "content": "URL : http://169.56.98.117/todo/5d9ed8a64d73a91bcc4526d7",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>삭제 완료 메세지</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>성공 상태 200</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Todo delete success!\",\n    \"status\": 200\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_CRUDDB",
            "description": "<p>내부 DB 작업에 실패하였습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : ERR_CRUDDB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"ERR_CRUDDB\",\n    \"message\": \"Cannot CRUD your Todo in database!\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/todo.js",
    "groupTitle": "Todo"
  },
  {
    "type": "get",
    "url": "/todo",
    "title": "GetTodoList",
    "name": "GetTodo",
    "group": "Todo",
    "description": "<p>현재 유저가 등록한 Todo 리스트를 반환합니다.</br> 반환받을 때 각 todo 의 _id 값으로 put, delete 요청을 할 수 있습니다.</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "null",
            "optional": false,
            "field": "No",
            "description": "<p>Parameter 요청 파라미터 없음.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(x) 예제",
          "content": "No Parameter",
          "type": "null"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Todo[]",
            "optional": false,
            "field": "todoLists",
            "description": "<p>JSONArray<Todo> 의 모양으로 Todo 의 리스트를 가짐</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>DB에 저장된 Todo의 고유값 - put, delete 요청할 때 사용</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Todo 의 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "selected",
            "description": "<p>Todo 체크되었는지 여부.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"todoLists\":\n        [\n            {\n                \"_id\": \"5d9ed8a64d73a91bcc4526d7\",\n                \"title\": \"MagicCalender 만들기2\",\n                \"selected\": true\n            },\n            {\"_id\": \"5d9ed8aa4d73a91bcc4526d8\", \"title\": \"MagicCalender 만들기3\", \"selected\": true},\n            {\"_id\": \"5d9efdeaec5df242401dd1a7\", \"title\": \"새로운 post modified!!\", \"selected\": false},\n            {\"_id\": \"5d9efe6b21e6cb42d3071cde\", \"title\": \"새로운 post 테스트2\", \"selected\": false},\n            {\"_id\": \"5d9f00a421e6cb42d3071cdf\", \"title\": \"Android post test\", \"selected\": false},\n            {\"_id\": \"5da309dd93968368d2266635\", \"title\": \"New Post Test good!\", \"selected\": false}\n        ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_CRUDDB",
            "description": "<p>내부 DB 작업에 실패하였습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : ERR_CRUDDB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"ERR_CRUDDB\",\n    \"message\": \"Cannot CRUD your Todo in database!\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/todo.js",
    "groupTitle": "Todo"
  },
  {
    "type": "post",
    "url": "/todo",
    "title": "InsertTodo",
    "name": "PostTodo",
    "group": "Todo",
    "description": "<p>새로운 todo 목록을 저장합니다.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Todo 제목</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "selected",
            "description": "<p>Todo 체크 여부</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(body) 예제",
          "content": "{\n    \"title\": \"MagicCalender 만들기 테스트\",\n    \"selected\": false\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>DB에 저장된 Todo의 고유값 - put, delete 요청할 때 사용</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Todo 의 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "selected",
            "description": "<p>Todo 체크되었는지 여부.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5da46cff9ea01463ba5c2eca\",\n    \"title\": \"MagicCalendar 만들기 테스트\",\n    \"selected\": false\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_CRUDDB",
            "description": "<p>내부 DB 작업에 실패하였습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : ERR_CRUDDB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"ERR_CRUDDB\",\n    \"message\": \"Cannot CRUD your Todo in database!\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/todo.js",
    "groupTitle": "Todo"
  },
  {
    "type": "put",
    "url": "/todo/:_id",
    "title": "UpdateTodo",
    "name": "PutTodo",
    "group": "Todo",
    "description": "<p>jwt 토큰과 todo 의 _id 값을 통해 현재 유저의 해당 todo 를 요청받은 body 의내용으로 업데이트합니다.</br> url parameter 에 넣는 _id 값은 GET 을 통해 todolist 를 호출 했을 때</br> 각 todo 객에가 지니고 있는 &quot;_id&quot; 의 value 값 입니다.</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>요청 바디의 Todo 제목</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "selected",
            "description": "<p>요청 바디의 Todo 체크 여부</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":_id",
            "description": "<p>URL에 고칠 todo 정보의 고유 아이디 값을 적습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(body) 예제",
          "content": "{\n    \"title\": \"MagicCalender 만들기 수정하기\",\n    \"selected\": true\n}",
          "type": "json"
        },
        {
          "title": "파라미터(url) 예제",
          "content": "URL : http://169.56.98.117/todo/5d9ed8a64d73a91bcc4526d7",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>DB에 저장된 Todo의 고유값 - put, delete 요청할 때 사용</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Todo 의 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "selected",
            "description": "<p>Todo 체크되었는지 여부.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5d9ed8a64d73a91bcc4526d7\",\n    \"title\": \"MagicCalendar 만들기 수정하기\",\n    \"selected\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ERR_CRUDDB",
            "description": "<p>내부 DB 작업에 실패하였습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_TODOBODYKEY",
            "description": "<p>Body 값에 userId 값은 들어있으면 안됩니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"NO_JWT\",\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"name\" : \"INVALID_JWT\",\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"NOUSER_DB\",\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : ERR_CRUDDB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"name\" : \"ERR_CRUDDB\",\n    \"message\": \"Cannot CRUD your Todo in database!\",\n    \"status\": 400\n}",
          "type": "json"
        },
        {
          "title": "실패 : INVALID_TODOBODYKEY",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"name\" : \"INVALID_TODOBODYKEY\",\n    \"message\": \"Invalid body property is included! : userId\",\n    \"status\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/todo.js",
    "groupTitle": "Todo"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "GetUserInfo",
    "name": "GetUser",
    "group": "User",
    "description": "<p>헤더에 JWT 를 실어 /user 로 GET 요청을 해주세요.</br> 서버는 해당 JWT를 통해 현재 구글 로그인된 계정의 개인정보를 반환합니다.</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "null",
            "optional": false,
            "field": "No",
            "description": "<p>Parameter 요청 파라미터 없음.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(x) 예제",
          "content": "No Parameter",
          "type": "null"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>유저 고유 번호 값(구글)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>유저 이메일 값</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>유저 풀네임</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>유저 구글 사진 URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "given_name",
            "description": "<p>유저 이름</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "family_name",
            "description": "<p>유저 이름(성)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "locale",
            "description": "<p>유저 지역 정보</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"userId\": \"100828347037604660700\",\n    \"email\": \"dfjung4254@gmail.com\",\n    \"name\": \"KH J\",\n    \"picture\": \"https://lh4.googleusercontent.com/-3WsHZ5SaYco/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reBRCZFXpXnux85nyxUAdlQxv6rVw/s96-c/photo.jpg\",\n    \"given_name\": \"KH\",\n    \"family_name\": \"J\",\n    \"locale\": \"ko\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/weather/:latitude/:longitude",
    "title": "GetWeatherInfo",
    "name": "GetWeather",
    "group": "Weather",
    "description": "<p>OpenWeatherMap API 를 호출하여 날씨 정보를 대신 호출하고 반환합니다.</br> 안드로이드 어플리케이션에서 위도와 경도 값, 그리고 jwt를 통해 인증 절차를 거쳐야 합니다.</br> jwt 인증을 거치는 이유는 OpenWeatherMap free티어(분당 60회)를 사용하고 있는데</br> 오픈소스로 공개할 경우 jwt 인증 없이 외부에서 무분별하게 호출이 가능하기 때문입니다.</br></p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>헤더에 JWT 토큰을 넣습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "헤더 예제",
          "content": "{\n    // retrofit2 : HashMap 에 key값은 \"jwt\", value값은 \"eyJ...\" 로 설정\n    \"jwt\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUxODRjMWU5ZDMxZjRmYmYzNDQ3NDQiLCJ1c2VySWQiOiIxMDA4MjgzNDcwMzc2MDQ2NjA3MDAiLCJpYXQiOjE1NzEwNDAxNTcsImV4cCI6MTU3MTEyNjU1NywiaXNzIjoiY29tLmpjcC5tYWdpY2FwcGxpY2F0aW9uIiwic3ViIjoidXNlckF1dGgifQ.RcjjVWBSd5LOXPqqPIV-ZXVsBKOxob7vWm7tBJi4rjM\"\n}",
          "type": "form"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "double",
            "optional": false,
            "field": "latitude",
            "description": "<p>알고자 하는 날씨의 지역 위도 정보</p>"
          },
          {
            "group": "Parameter",
            "type": "double",
            "optional": false,
            "field": "longitude",
            "description": "<p>알고자 하는 날씨의 지역 경도 정보</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "파라미터(url) 예제",
          "content": "URL : http://169.56.98.117/weather/37.564/127.001",
          "type": "path"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>해당 위도, 경도의 도시 이름</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "weather",
            "description": "<p>날씨 정보</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "weather_description",
            "description": "<p>날씨 정보 설명</p>"
          },
          {
            "group": "Success 200",
            "type": "double",
            "optional": false,
            "field": "temperature",
            "description": "<p>평균 온도(F)</p>"
          },
          {
            "group": "Success 200",
            "type": "double",
            "optional": false,
            "field": "temperature_max",
            "description": "<p>최고 온도(F)</p>"
          },
          {
            "group": "Success 200",
            "type": "double",
            "optional": false,
            "field": "temperature_min",
            "description": "<p>최저 온도(F)</p>"
          },
          {
            "group": "Success 200",
            "type": "integer",
            "optional": false,
            "field": "pressure",
            "description": "<p>기압</p>"
          },
          {
            "group": "Success 200",
            "type": "integer",
            "optional": false,
            "field": "humidity",
            "description": "<p>습도</p>"
          },
          {
            "group": "Success 200",
            "type": "double",
            "optional": false,
            "field": "wind_speed",
            "description": "<p>풍속</p>"
          },
          {
            "group": "Success 200",
            "type": "integer",
            "optional": false,
            "field": "clouds",
            "description": "<p>운량</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "성공 시 응답 :",
          "content": "HTTP/1.1 200 OK\n{\n    \"city\": \"Kwanghŭi-dong\",\n    \"weather\": \"Clouds\",\n    \"weather_description\": \"overcast clouds\",\n    \"temperature\": 297.27,\n    \"temperature_max\": 298.71,\n    \"temperature_min\": 295.93,\n    \"pressure\": 1019,\n    \"humidity\": 51,\n    \"wind_speed\": 0.45,\n    \"clouds\": 100\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_JWT",
            "description": "<p>JWT 가 헤더에 실려있지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INVALID_JWT",
            "description": "<p>JWT 가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOUSER_DB",
            "description": "<p>해당 유저의 정보가 DB에서 찾을 수 없습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NO_LONANDLAT",
            "description": "<p>위도, 경도 좌표가 유효하지 않습니다.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FAILED_OWM",
            "description": "<p>OpenWeatherMap 호출에 실패했습니다.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "실패 : NO_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Please put JWT in your request header!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : INAVLID_JWT",
          "content": "HTTP/1.1 401 Unauthorized\n{\n    \"message\": \"Your JWT is invalid!\",\n    \"status\": 401\n}",
          "type": "json"
        },
        {
          "title": "실패 : NOUSER_DB",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"message\": \"Cannot find userId in database!\",\n    \"status\": 500\n}",
          "type": "json"
        },
        {
          "title": "실패 : NO_LONANDLAT",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"message\": \"Please put latitude and longitude in your request parameter!\",\n    \"status\": 400\n}",
          "type": "json"
        },
        {
          "title": "실패 : FAILED_OWM",
          "content": "HTTP/1.1 500 Bad Request\n{\n    \"message\": \"Failed to GET openweathermap!\",\n    \"status\": 500\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/weather.js",
    "groupTitle": "Weather"
  }
] });