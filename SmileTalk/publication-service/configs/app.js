'use strict'

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { dbConnection } from './db.js';
import { corsOptions } from './cors.configuration.js';
import { helmetOptions } from './helmet.configuration.js';
import { requestLimit } from './rateLimit.configuration.js';
import fieldRoutes from '../src/field.routes.js' 

const BASE_PATH = '/SmileTalk/v1';

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false, limit: '10mb'}));
    app.use(express.json({limit: '10mb'}));
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
    app.use(helmet(helmetOptions));
    app.use(requestLimit);
};

const routes = (app) => {
    app.use(`${BASE_PATH}/fields`, fieldRoutes);
    app.get(`${BASE_PATH}/health`, (req, res) => {
        res.status(200).json({
            success: true,
            message: 'Servicio saludable',
            service: 'SmileTalk Admin Server'
        })
    })

    app.use((req, res) => {
        res.status(404).json({
            success: false,
            message: 'Ruta no existente'
        })
    })
}

export const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT;
    app.set('trust proxy', 1);

    try {
        middlewares(app);
        await dbConnection();
        routes(app);
        app.listen(PORT, () => {
            console.log(`SmileTalk admin server running on port ${PORT}`);
            console.log(`Health check http://localhost:${PORT}${BASE_PATH}/health`);
        });
    } catch (error) {
        console.error(`Error al iniciar el servidor: ${error.message}`);
        process.exit(1);
    }
}