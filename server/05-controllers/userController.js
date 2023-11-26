
const User = require("../02-models/userSchema")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
// const speakeasy = require('speakeasy');
dotenv.config();

// const otpEmailHost = process.env.OTP_SENDING_EMAIL_HOST
// const otpEmailPort = process.env.OTP_SENDING_EMAIL_PORT
// const otpEmailAddress = process.env.OTP_SENDING_EMAIL
// const otpEmailPassword = process.env.OTP_SENDING_EMAIL_PASSWORD


const Signup = async (req, res) => {
    try {
        const encryptedPassword = await bcrypt.hash(req.body.password, 10)

        req.body.password = encryptedPassword
        // req.body.backup2FaCode = Math.floor(100000 + Math.random() * 900000)

        const data = await User.create(req.body)
        if (data) {
            res.status(200).json({
                msg: "User created successfully."
            })
        } else {
            res.status(403).json({
                msg: "User registration failed."
            })
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

// SEND OTP BY EMAIL
// const SendDistAdminOtp = async (req, res) => {
//     try {
//         const { email } = req.body;

//         // Find the user by email (in your real app, fetch from database)
//         const user = await DistAdminUser.findOne({ email })

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         const otp = Math.floor(100000 + Math.random() * 900000)


//         // Send OTP via email
//         if (email) {
//             // console.log(email)
//             // let testAccount = await nodemailer.createTestAccount()
//             const transporter = nodemailer.createTransport({
//                 host: otpEmailHost,
//                 port: otpEmailPort,
//                 auth: {
//                     user: otpEmailAddress,
//                     pass: otpEmailPassword
//                 }
//             });
//             let info = await transporter.sendMail({
//                 from: 'NNDSWO Headquarters', // sender address
//                 to: email, // list of receivers
//                 subject: 'NNDSWO Login OTP', // Subject line
//                 text: 'Verify your login to district admin account', // plain text body
//                 html: `<h>Verify your login to NNDSWO district admin account.</h><br><h>Your one time password to verify login code is <h><h1  style="color:#5A0047;">${otp}</h1><br><h>The code is valid for 5 minutes.  <h> `
//             })

//             console.log("Message sent: %s", info.messageId);
//         } else {
//             return res.status(401).json({ msg: "The email address doesn't exist" });
//         }
//         console.log(otp)
//         const hashedOTP = await bcrypt.hash(otp.toString(), 10)
//         //OTP VALID DURATION
//         const otpExpiresAt = Date.now() + 300000
//         const updated = await DistAdminUser.updateMany(
//             { email: email },
//             { $set: { otp: hashedOTP, otpExpiresAt: otpExpiresAt } }
//         )
//         if (updated) {
//             return res.status(200).json({ msg: "Encrypted OTP saved to the DB and expiry set." });
//         } else {
//             return res.status(401).json({ msg: "Failed to save OTP to the DB and set expiry." });
//         }

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Failed to send OTP' });
//     }

// }

// // Controller to verify OTP
// const verifyDistAdminOtp = async (req, res) => {
//     const email = req.body.email
//     const reqOtp = req.body.otp
//     try {
//         if (!email || !reqOtp) {
//             return res.status(400).json({ message: 'Invalid request. Empty values.' });
//         }
//         // Find the user by email (in your real app, fetch from database)
//         const data = await DistAdminUser.findOne({ email });

//         if (data) {
//             const hashedOtp = data.otp;
//             const expiresAt = data.otpExpiresAt
//             if (expiresAt < Date.now()) {
//                 res.status(401).json({
//                     code: "expired_otp",
//                     msg: "The OTP code has expired."
//                 })
//             } else {
//                 const isValidOtp = await bcrypt.compare(reqOtp, hashedOtp)
//                 if (!isValidOtp) {
//                     res.status(401).json({
//                         code: "invalid_otp",
//                         msg: "The OTP code is invalid."
//                     })
//                 } else {
//                     res.status(200).json({
//                         msg: "The OTP code his verified successfully.",
//                         fullName: data.fullName,
//                         email: data.email,
//                         profileImageName: data.profileImageName,
//                         district: data.district,
//                         id: data._id
//                     })
//                 }
//             }
//         } else {
//             res.status(400).json({
//                 msg: "No data found."
//             })
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             msg: "Failed to verify OTP."
//         })
//     }
// }


const Login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email: email })

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return (res.status(401).json({ msg: "Invalid email or password." }))
        } else {
            res.status(200).json({
                msg: "Logged in successfully.",
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profileImageName: user?.profileImageName,
                id: user._id
            })
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

// const ChangeDistAdminUserProfile = async (req, res) => {
//     try {
//         // Remove the "password" field from req.body if it exists
//         if (req.body.hasOwnProperty('password')) {
//             delete req.body.password;
//         }

//         const updated = await DistAdminUser.findByIdAndUpdate(req.body._id, req.body);

//         if (updated) {
//             res.status(200).json({
//                 msg: "Profile updated!",
//                 fullName: req.body.fullName,
//                 profileImageName: profile.profileImageName,
//                 email: req.body.email,
//                 id: updated._id
//             });
//         } else {
//             res.json({ msg: "Error" });
//         }
//     } catch (error) {
//         console.error("Authentication error:", error);
//         return res.status(500).json({ msg: "Internal server error." });
//     }
// }


// const ChangeDistAdminUserPassword = async (req, res) => {
//     // try {
//     //     const { oldPassword, newPassword, _id } = req.body

//     //     const user = await DistAdminUser.findById(_id)

//     //     if (!user) {
//     //         return res.status(404).json({ msg: "Super admin user not found." })
//     //     }

//     //     const isMatch = bcrypt.compare(oldPassword, user.password)

//     //     if (!isMatch) {
//     //         return res.status(401).json({ msg: "Old password is incorrect." })
//     //     }

//     //     const hashedNewPassword = await bcrypt.hash(newPassword, 10)
//     //     user.password = hashedNewPassword
//     //     await user.save()

//     //     return res.status(200).json({ msg: "Password updated successfully." })

//     // } catch (error) {
//     //     console.error("Authentication error:", error);
//     //     return res.status(500).json({ msg: "Internal server error." });
//     // }
// }

// const GetDistAdminUserProfile = async (req, res) => {
//     try {

//         const profile = await DistAdminUser.findById(req.body._id)

//         if (profile) {
//             res.status(200).json({
//                 fullName: profile.fullName,
//                 email: profile.email,
//                 profileImageName: profile.profileImageName
//             })
//         } else {
//             res.json({ msg: "Error" })
//         }

//     } catch (error) {
//         console.error("Authentication error:", error);
//         return res.status(500).json({ msg: "Internal server error." });
//     }
// }

// const GetDistAdminUsersList = async (req, res) => {
//     try {

//         //filter
//         const queryObj = { ...req.query }
//         const excludeFields = ["page", "sort", "skip", "limit", "fields"]
//         excludeFields.forEach(el => delete queryObj[el])

//         //sort
//         const sortBy = req.query.sort
//         // console.log(queryObj, req.query.sort)

//         //pagination
//         const page = req.query.page
//         const limit = req.query.limit
//         const skip = (page - 1) * limit
//         console.log(page, limit, skip)

//         const profiles = await DistAdminUser.find(queryObj).sort(sortBy).skip(skip).limit(limit)

//         if (profiles) {
//             const data = profiles.map(profile => ({
//                 _id: profile._id,
//                 fullName: profile.fullName,
//                 phoneNumber: profile.phoneNumber,
//                 email: profile.email,
//                 backup2FaCode: profile.backup2FaCode,
//                 profileImageName: profile.profileImageName,
//                 district: profile.district,
//                 createdAt: profile.createdAt,
//                 updatedAt: profile.updatedAt,
//             }))
//             res.status(200).json({ data })
//         } else {
//             res.json({ msg: "DistAdminUser profiles not found." })
//         }

//     } catch (error) {
//         console.error("Authentication error:", error);
//         return res.status(500).json({ msg: "Internal server error." });
//     }
// }

// const DeleteDistAdmin = async (req, res) => {
//     try {
//         const id = req.params.id;

//         const deletedDistAdmin = await DistAdminUser.findByIdAndDelete(id);

//         if (!deletedDistAdmin) {
//             return res.status(404).json({ message: 'Distrist admin data not found' });
//         }

//         res.status(200).json({ message: 'Distrist admin deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting distrist admin:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

// const CheckBackUp2FaCode = async (req, res) => {
//     try {
//         const id = req.params.id;

//         const data = await DistAdminUser.findById(id);
//         console.log(data.backup2FaCode, req.body.backup2FaCodeForCheck)
//         if (!data) {
//             // User not found
//             return res.status(404).json({ message: 'User not found.' });
//         }

//         if (!data.backup2FaCode) {
//             // Backup 2FA code not set for the user
//             return res.status(401).json({ message: 'Backup 2FA code not set.' });
//         }

//         if (data.backup2FaCode === req.body.backup2FaCodeForCheck) {
//             res.status(200).json({ message: 'Backup 2FA code matches.' });
//         } else {
//             res.status(401).json({ message: 'Invalid backup 2FA code.' });
//         }

//     } catch (error) {
//         console.error('Error checking 2FA backup code:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };




exports.Signup = Signup
exports.Login = Login
// exports.DistAdminLogin = DistAdminLogin
// exports.ChangeDistAdminUserProfile = ChangeDistAdminUserProfile
// exports.ChangeDistAdminUserPassword = ChangeDistAdminUserPassword
// exports.GetDistAdminUserProfile = GetDistAdminUserProfile
// exports.GetDistAdminUsersList = GetDistAdminUsersList
// exports.DeleteDistAdmin = DeleteDistAdmin
// exports.CheckBackUp2FaCode = CheckBackUp2FaCode
// exports.SendDistAdminOtp = SendDistAdminOtp
// exports.verifyDistAdminOtp = verifyDistAdminOtp
