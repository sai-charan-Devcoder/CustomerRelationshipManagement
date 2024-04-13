import express from 'express';
import { verifyUser } from '../controllers/auth/verifyUserController';
import { addLead, getAllClaimedLeads, getAllUnclaimedLeads } from '../controllers/leads-controller';

const leadsRouter = express.Router();
/* For Adding a lead/form entries -- User's authentication is not required   */
leadsRouter.post('/addLead', addLead);

/* For Checking the claimedLeads and Unclaimed Leads, Counsellor's authentication is required
  so middleware verifyUser is used. */
leadsRouter.get('/getAllUnclaimedLeads', verifyUser, getAllUnclaimedLeads);
leadsRouter.get('/getAllClaimedLeads', verifyUser, getAllClaimedLeads);

export default leadsRouter;
