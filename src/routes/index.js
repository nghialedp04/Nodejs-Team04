import express from 'express';
import UserRouter from './userRoute';
import SkillRouter from './skillRoute';
import RoadToRouter from './roadToRoute';
import OurMainRouter from './ourMainRoute';
import MenubarRouter from './menuBarRoute';
import ConcernRouter from './concernsRoute';
import AlumniRouter from './alumniRoute';


const Routes = express.Router();

Routes.use('/api/users', UserRouter);
Routes.use('/api/skills', SkillRouter);
Routes.use('/api/roadtos', RoadToRouter);
Routes.use('/api/ourmains', OurMainRouter);
Routes.use('/api/menubars', MenubarRouter);
Routes.use('/api/concerns', ConcernRouter);
Routes.use('/api/alumnies', AlumniRouter);




export default Routes;
