import express from 'express';
import { verifyUser } from '../controllers/auth/verifyUserController';
import { claimWithCounsellerId, getClaimedLeadsByCounsellor } from '../controllers/claimListController';
const claimListRouter = express.Router();

claimListRouter.post('/claimWithCounsellorId', verifyUser, claimWithCounsellerId);
claimListRouter.get('/getClaimedLeadsByCounsellor', verifyUser, getClaimedLeadsByCounsellor);

export default claimListRouter;