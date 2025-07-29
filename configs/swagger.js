import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "SIEE",
            version: "1.0.0",
            description: "",
            contact:{
                name: "LocalHost",
                email: "localHost@kinal.org.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3005/sieeSystem/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/courses/course.route.js",
        "./src/grades/grades.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}