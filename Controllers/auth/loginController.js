
import JwtService from "../../services/JwtService";
import bcrypt from "bcrypt";
import counsellor from "../../Models/counsellor";

/* Login function for Counsellor */
export const login = async (req, res, next) => {

    const { email, password } = req.body;

    let existingCounsellor;

    try {
        existingCounsellor = await counsellor.findOne({ email })
    }
    catch (err) {
        return console.log(err);
    }

    if (!existingCounsellor) {
        return res.status(404).json({ message: "No user found" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingCounsellor.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ msg: "Incorrect Password" });
    }
    try {
        const access_token = JwtService.sign({ _id: existingCounsellor._id, email: existingCounsellor.email });
        res.status(200).json({
            msg: "successfully loggedin",
            token: access_token
        });
    }
    catch (err) {
        throw new Error("Internal server error");
    }


}
