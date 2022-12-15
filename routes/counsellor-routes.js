import express from 'express';
import { login } from '../Controllers/auth/loginController';
import { signup } from '../Controllers/auth/registrationController';
import { getAllCounsellor } from '../Controllers/counsellor-controller'

const counsellorRouter = express.Router();

counsellorRouter.get('/', getAllCounsellor);
counsellorRouter.post('/signup', signup);
counsellorRouter.post('/login', login);

export default counsellorRouter;

