import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../schema/user.schema';

dotenv.config();

const { DB_HOST, DB_USERNAME, DB_DATABASE, DB_URL, DB_PASSWORD, NODE_ENV } =
  process.env;

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: 3306,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [User],
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