# swagger-study-demo
swagger study demo

环境准备
安装node.js，此处不做说明
swagger-ui、swagger-editor安装包，可使用此目录下安装包，自行下载最新包也可

1.swagger-ui环境搭建
  (1)创建一个空文件夹node_app 
      
      mkdir node_app 
      
      cd node_ap

  (2)初始化node，创建package.json文件
      npm init
      // 下面的看你心情填写
      name: (node_app) node_app
      version: (1.0.0)
      description:
      entry point: (index.js)
      test command:
      git repository:
      keywords:
      author:
      license: (ISC)

  (3)安装 express 
      npm install express --save

  (4)创建 index.js
      vim index.js 
      //index.js内容
      var express = require('express');
      var app = express();
      app.get('/', function (req, res) {
        res.send('Hello World!');
      });

      app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
      });

  （5)在node_app中创建空目录public
      mkdir public
      cd public

   (6)修改路由
      vim ../index.js

      //inexx.js内容
      var express = require('express');
      var app = express();
      #######在文件插入下面这句话
      app.use('/static', express.static('public')); 
      #######
      app.get('/', function (req, res) {
        res.send('Hello World!');
      });

      app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
      });   

   (7)重启node服务器
      node index.js

2.swagger-editor环境搭建
  (1)安装node.js HttpServer
     npm install -g http-server

  (2)解压swagger-editor安装包
    tar -zxvf swagger-editor-3.1.12.tar.gz
    mv swagger-editor-3.1.12 swagger-editor
    cd swagger-editor

  (3)启动Swagger-Editor项目
    http-server swagger-editor 以8080端口启动项目 
    http-server –p 8082 swagger-editor 指定端口启动项目

  (4)访问url
    http://127.0.0.1:8080/

3.使用刚搭建的swagger-editor环境搭建编辑API文档
  (1)内容如下所示
    我们可以选择使用JSON或者YAML的语言格式来编写API文档。但是个人建议使用YAML来写，原因是它更简单。一图胜千言，先看用JSON写的文档：

    {
        "swagger": "2.0",
        "info": {
            "version": "1.0.0",
            "title": "Simple API",
            "description": "A simple API to learn how to write OpenAPI Specification"
        },
        "schemes": [
            "https"
        ],
        "host": "simple.api",
        "basePath": "/openapi101",
        "paths": {
            "/persons": {
                "get": {
                    "summary": "Gets some persons",
                    "description": "Returns a list containing all persons.",
                    "responses": {
                        "200": {
                            "description": "A list of Person",
                            "schema": {
                                "type": "array",
                                "items": {
                                    "properties": {
                                        "firstName": {
                                            "type": "string"
                                        },
                                        "lastName": {
                                            "type": "string"
                                        },
                                        "username": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    再来看看同一份API文档的YAML实现：

    swagger: "2.0"

    info:
      version: 1.0.0
      title: Simple API
      description: A simple API to learn how to write OpenAPI Specification

    schemes:
      - https
    host: simple.api
    basePath: /openapi101

    paths:
      /persons:
        get:
          summary: Gets some persons
          description: Returns a list containing all persons.
          responses:
            200:
              description: A list of Person
              schema:
                type: array
                items:
                  required:
                    - username
                  properties:
                    firstName:
                      type: string
                    lastName:
                      type: string
                    username:
                      type: string
  (2)使用swagger-editor导出json文件命名为test.json,并把test.json文件放到swagger-ui下的public目录下
  (3)修改swagger-ui下index.js的url
      修改路径/public/index.js

      // Build a system
      const ui = SwaggerUIBundle({
        ///////////修改此处url为/static/test.json
        url: "/static/test.json",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout"
      })
  (4)重启node服务器
    node index.js
    访问http://localhost:3000/static/index.html




