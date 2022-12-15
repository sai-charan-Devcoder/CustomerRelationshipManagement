import Counsellor from "../Models/counsellor";

/* code to get all the counsellor details */
export const getAllCounsellor = async (req, res, next) => {
   let counsellors;

   try {
      counsellors = await Counsellor.find();
   }
   catch (err) {
      return console.log(err);
   }

   if (!counsellors) {
      return res.status(404).json({ "msg": "No Counsellors" });
   }
   return res.status(200).json({ counsellors });
}




