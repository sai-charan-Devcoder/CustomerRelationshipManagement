import express from 'express';
import { verifyUser } from '../Controllers/auth/verifyUserController';
import { claimWithCounsellerId, getClaimedLeadsByCounsellor } from '../Controllers/claimListController';
const claimListRouter = express.Router();

claimListRouter.post('/claimWithCounsellorId', verifyUser, claimWithCounsellerId);
claimListRouter.get('/getClaimedLeadsByCounsellor', verifyUser, getClaimedLeadsByCounsellor);

export default claimListRouter;