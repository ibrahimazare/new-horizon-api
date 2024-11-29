"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
const user_schema_1 = require("../schema/user.schema");
dotenv.config();
const { DB_HOST, DB_USERNAME, DB_DATABASE, DB_URL, DB_PASSWORD, NODE_ENV } = process.env;
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: DB_HOST,
    port: 3306,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: [user_schema_1.User],
    synchronize: true,
});
// const { DataSource } = require('typeorm');
// const dotenv = require('dotenv');
// // const { User } = require('../model/user.schema');
// const { User } = require('../model/user.schema');
// dotenv.config();
// const {DB_HOST, DB_USERNAME,DB_PASSWORD, DB_DATABASE, DB_URL, NODE_ENV } = process.env;
// // Define the AppDatasource as a constant
// const AppDatasource = new DataSource({
//     type: 'mysql',
//     host: DB_HOST,
//     port: 3306,
//     username: DB_USERNAME,
//     password:DB_PASSWORD,
//     database: DB_DATABASE,
//     entities: {User},
//     migrations: [`${__dirname}/../migration/*.js`],
//     synchronize: NODE_ENV === 'production' ? false : true,
// });
// module.exports = {AppDatasource};
