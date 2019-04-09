import { ConnectionOptions } from "typeorm";
import * as path from 'path';

export const dbConfig: ConnectionOptions = {
    "type": "mysql",
    "host": "127.0.0.1",
    "port": 3306,
    "username": "root",
    "password": "test123",
    "database": "test",
    "entities": [
        path.resolve(__dirname , "../models/*.js"),
        path.resolve(__dirname , "../models/*.ts")
    ],
    "synchronize": true,
    "logging": false
}