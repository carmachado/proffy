import express from 'express';
import db from './database/connection';
import convertHoursToMinutes from './utils/convertHourToMinutes';
import LessonsController from './controllers/LessonsController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const lessonsControllers = new LessonsController();
const connectionControllers = new ConnectionsController();

routes.post('/lessons', lessonsControllers.create);
routes.get('/lessons', lessonsControllers.index);

routes.post('/connections', connectionControllers.create);
routes.get('/connections', connectionControllers.index);


export default routes;