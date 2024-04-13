import express from 'express';
import { login } from '../controllers/auth/loginController';
import { signup } from '../controllers/auth/registrationController';
import { getAllCounsellor } from '../controllers/counsellor-controller'

const counsellorRouter = express.Router();

counsellorRouter.get('/', getAllCounsellor);
counsellorRouter.post('/signup', signup);
counsellorRouter.post('/login', login);

export default counsellorRouter;

