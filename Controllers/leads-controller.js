import Leads from "../Models/leads";


//get all leads
export const getAllUnclaimedLeads = async (req, res, next) => {
    let leads;

    try {
        leads = await Leads.find({ status: "unclaimed" });
    }
    catch (err) {
        return console.log(err);
    }

    if (!leads) {
        return res.status(404).json({ "msg": "No leads" });
    }
    return res.status(200).json({ leads });
}



//get all claimed leads
export const getAllClaimedLeads = async (req, res, next) => {

    let leads;

    try {
        leads = await Leads.find({ status: "claimed" });
    }
    catch (err) {
        return console.log(err);
    }

    if (!leads) {
        return res.status(404).json({ "msg": "No claimed leads" });
    }
    return res.status(200).json({ leads });
}


//adding a lead (filled form details)
export const addLead = async (req, res, next) => {

    const { customer_name, email, course_interested, query, status } = req.body;


    let lead_id;

    try {
        lead_id = await Leads.find().count() + 1;
        console.log(lead_id);
    } catch (err) {
        console.log(err);
    }


    var statusValue;

    if (status === undefined) {
        statusValue = "unclaimed";
    } else {
        statusValue = status;
    }


    const lead = new Leads({
        lead_id,
        customer_name,
        email,
        course_interested,
        query,
        status: statusValue
    });

    try {
        lead.save();
    }
    catch (err) {
        console.log(err);
    }

    return res.status(201).json({ lead });
}



