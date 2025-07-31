'use strict';

import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import { connectionDB } from "./mongo.js";
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import courseRoutes from "../src/courses/course.route.js"
import gradesRoutes from "../src/grades/grades.routes.js";
import announcementRoutes from "../src/announcements/announcement.routes.js"
import { swaggerDocs, swaggerUi} from "./swagger.js"
import psychRoutes from "../src/psych/psych.routes.js";

const middlewares = (app) => {
    app.use(express.urlencoded({extended:true}));
    app.use(express.json());
    app.use(helmet());
    app.use(cors('*'));
    app.use(morgan("dev"));
};

const routes = (app) =>{
    app.use("/sieeSystem/v1/auth", authRoutes);
    app.use("/sieeSystem/v1/user", userRoutes);
    app.use("/sieeSystem/v1/course",courseRoutes)
    app.use("/sieeSystem/v1/grades", gradesRoutes);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
    app.use("/sieeSystem/v1/psych", psychRoutes);
    app.use("/sieeSystem/v1/announcements", announcementRoutes);
}

const connectionMongo = async() =>{
    try{
        await connectionDB();
    }catch(error){
        console.log(`Data Base connection is failed, please try again ${e}`);
    }
};

export const initServer = () => {
    const app = express();
    const timeInit = Date.now();
    try{
        middlewares(app);
        routes(app);
        connectionMongo();
        app.listen(process.env.PORT);
        const elapsedTime = Date.now() - timeInit;
        console.log(`Server running on port ${process.env.PORT} ${elapsedTime}ms`);
    }catch(error){
        console.log(`Server failed to start: ${error}`);
    }
};