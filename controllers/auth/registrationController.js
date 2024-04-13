import Counsellor from "../../models/counsellor";
import bcrypt from 'bcrypt';
/* signup function  */
export const signup = async (req, res, next) => {

    const { counsellor_name, email, password } = req.body;

    let existingCounsellor;
    try {
        existingCounsellor = await Counsellor.findOne({ email });
    }
    catch (err) {
        return console.log(err);
    }

    if (existingCounsellor) {
        return res.status(400).json({ message: "User Already Exists! Login with the credentials" });
    }

    let counsellor_id;
    try {
        counsellor_id = await Counsellor.find().count() + 1;
    }
    catch (err) {
        return console.log(err);
    }

    const hashedpassword = bcrypt.hashSync(password, 8);

    const counsellor = new Counsellor({
        counsellor_id,
        counsellor_name,
        email,
        password: hashedpassword
    });

    try {
        counsellor.save();
    }
    catch (err) {
        console.log(err);
    }

    return res.status(201).json({ counsellor });
}
