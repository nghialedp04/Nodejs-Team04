import express from 'express';
import UserRouter from './userRoute';

const Routes = express.Router();

Routes.use('/users', UserRouter);

export default Routes;
