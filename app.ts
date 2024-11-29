import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path'
import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from './src/database/config.database';
const app = express();
import authRouter from './src/route/auth.route'
import { swaggerDefinition } from './src/swagger';


app.use(express.json())
app.use('/api', authRouter);

// Swagger Setup
const routeFolderPath = path.join(__dirname, '..', 'src', 'route');
const options = {
  swaggerDefinition,
  apis: [path.join(routeFolderPath, '*.ts')],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


AppDataSource.initialize()
  .then(async () => {
    app.listen(3113,() => {});
    console.log('Data Source has been initialized!');
  })
  .catch((error) => console.log(error));