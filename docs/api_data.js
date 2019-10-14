define({ "api": [
  {
    "type": "delete",
    "url": "/todo",
    "title": "유저의 Todo 정보를 삭제합니다.",
    "name": "DeleteTodo",
    "group": "Todo",
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
            "description": "<p>지울 todo 정보의 고유 아이디 값</p>"
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
    "title": "유저의 Todo 정보를 가져옵니다.",
    "name": "GetTodo",
    "group": "Todo",
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
          "content": "HTTP/1.1 200 OK\n{\n    \"todoLists\":\n        [\n            {\"_id\": \"5d9ed8a64d73a91bcc4526d7\", \"title\": \"MagicCalender 만들기2\", \"selected\": true},\n            {\"_id\": \"5d9ed8aa4d73a91bcc4526d8\", \"title\": \"MagicCalender 만들기3\", \"selected\": true},\n            {\"_id\": \"5d9efdeaec5df242401dd1a7\", \"title\": \"새로운 post modified!!\", \"selected\": false},\n            {\"_id\": \"5d9efe6b21e6cb42d3071cde\", \"title\": \"새로운 post 테스트2\", \"selected\": false},\n            {\"_id\": \"5d9f00a421e6cb42d3071cdf\", \"title\": \"Android post test\", \"selected\": false},\n            {\"_id\": \"5da309dd93968368d2266635\", \"title\": \"New Post Test good!\", \"selected\": false}\n        ]\n}",
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
    "title": "유저의 Todo 정보를 저장합니다.",
    "name": "PostTodo",
    "group": "Todo",
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
            "field": "INVALID_TODOBODY",
            "description": "<p>Request Body 가 유효하지 않습니다.</p>"
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
          "title": "실패 : INVALID_TODOBODY",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"name\" : \"INVALID_TODOBODY\",\n    \"message\": \"Invalid request body, please put [title] and [selected] in your request body!\",\n    \"status\": 400\n}",
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
    "url": "/todo",
    "title": "유저의 Todo 정보를 수정합니다.",
    "name": "PutTodo",
    "group": "Todo",
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
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":_id",
            "description": "<p>고칠 todo 정보의 고유 아이디 값</p>"
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
            "field": "INVALID_TODOBODY",
            "description": "<p>Request Body 가 유효하지 않습니다.</p>"
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
          "title": "실패 : INVALID_TODOBODY",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"name\" : \"INVALID_TODOBODY\",\n    \"message\": \"Invalid request body, please put [title] and [selected] in your request body!\",\n    \"status\": 400\n}",
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
    "title": "유저의 정보를 제공합니다.",
    "name": "GetUser",
    "group": "User",
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
    "title": "GetWeather",
    "name": "GetWeather",
    "group": "Weather",
    "description": "<p>OpenWeatherMap API 를 호출하여 날씨 정보를 대신 호출하고 반환합니다. 안드로이드 어플리케이션에서 위도와 경도 값, 그리고 jwt를 통해 인증 절차를 거쳐야 합니다. jwt 인증을 거치는 이유는 OpenWeatherMap free티어(분당 60회)를 사용하고 있는데 오픈소스로 공개할 경우 jwt 인증 없이 외부에서 무분별하게 호출이 가능하기 때문입니다.</p>",
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
