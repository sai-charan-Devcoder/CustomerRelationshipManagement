import Counsellor from "../Models/counsellor";
import Jwt from "jsonwebtoken";
import leads from "../Models/leads";
import claimlist from "../Models/claimlist";


export const claimWithCounsellerId = async (req, res, next) => {

    const { lead_id } = req.body;
    console.log("leadId");
    console.log(lead_id);

    /* code to get the logged in counsellor_id */
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = Jwt.verify(authorization, "secret");
            console.log(decoded);
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        var email = decoded.email;
        let counsellor;
        try {
            counsellor = await Counsellor.findOne({ email });
        }
        catch (err) {
            console.log(err);
        }

        var counsellorId = counsellor.counsellor_id;
    }


    try {
        var lead = await leads.find({ status: "unclaimed" }).find({ lead_id });
    }
    catch (err) {
        console.log(err);
    }

    /* checking whether the Lead is claimed by others  */
    if (!lead) {
        return res.status(400).json({ msg: "Lead Claimed by another counsellor/not available" });
    }

    /* update the lead as claimed in the LeadTable */

    let updateLead;
    try {
        updateLead = await leads.updateOne({ lead_id: lead_id }, { $set: { status: "claimed" } });
    }
    catch (err) {
        console.log(err);
    }


    console.log(lead_id + `:` + counsellorId);
    /* Add an entry in claimlist table as a mapping Entry */
    const claim = new claimlist({
        lead_id,
        counsellor_id: counsellorId,
    });


    try {
        claim.save();
    }
    catch (err) {
        console.log(err);
    }
    return res.json({ claim })


};


/* function to get all the claimed leads by logged in counsellor */
export const getClaimedLeadsByCounsellor = async (req, res, next) => {

    /* code to get the logged in counsellor_id */
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = Jwt.verify(authorization, "secret");

        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        var email = decoded.email;
        let counsellor;
        try {
            counsellor = await Counsellor.findOne({ email });
        }
        catch (err) {
            console.log(err);
        }

        var counsellorId = counsellor.counsellor_id;
    }

    /* find all the leads which is mapped in claimlist table
    and get the related leads from leads table with the lead_id mapped */

    let claimsByCounsellor;
    try {
        claimsByCounsellor = await claimlist.find({ counsellorId });

    }
    catch (err) {
        console.log(err);
    }

    if (!claimsByCounsellor) {
        return res.status(404).json({ msg: "no claims for logged in counsellor" });

    }
    var leadIds = claimsByCounsellor.map(({ lead_id }) => ({ lead_id }));


    var result = [];

    for (let i in leadIds) {
        var leadId = Number(leadIds[i].lead_id);
        let data;
        try {
            console.log(`leadId:${leadId}`);
            data = await leads.findOne({ leadId });
        }
        catch (err) {
            console.log(err);
        }
        result.push(data);
    }

    console.log(leadIds);

    return res.json({ msg: "Leads Id claimed by logged in user", result });


}