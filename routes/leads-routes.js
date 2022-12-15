import express from 'express';
import { verifyUser } from '../Controllers/auth/verifyUserController';
import { addLead, getAllClaimedLeads, getAllUnclaimedLeads } from '../Controllers/leads-controller';

const leadsRouter = express.Router();
/* For Adding a lead/form entries -- User's authentication is not required   */
leadsRouter.post('/addLead', addLead);

/* For Checking the claimedLeads and Unclaimed Leads, Counsellor's authentication is required
  so middleware verifyUser is used. */
leadsRouter.get('/', verifyUser, getAllUnclaimedLeads);
leadsRouter.get('/getAllClaimedLeads', verifyUser, getAllClaimedLeads);

export default leadsRouter;
