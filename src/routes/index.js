import express from 'express';
import UserRouter from './userRoute';
import SkillRouter from './skillRoute';
import RoadToRouter from './roadToRoute';
import OurMainRouter from './ourMainRoute';
import MenubarRouter from './menuBarRoute';
import ConcernRouter from './concernsRoute';
import AlumniRouter from './alumniRoute';


const Routes = express.Router();

Routes.use('/users', UserRouter);
Routes.use('/skills', SkillRouter);
Routes.use('/roadtodps', RoadToRouter);
Routes.use('/ourmains', OurMainRouter);
Routes.use('/menubars', MenubarRouter);
Routes.use('/concerns', ConcernRouter);
Routes.use('/alumies', AlumniRouter);




export default Routes;
