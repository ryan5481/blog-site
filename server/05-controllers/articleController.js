
const Article = require ("../02-models/articleSchema")
const dotenv = require("dotenv");
const fs = require("fs");
const {promisify} = require('util')
const unlinkAsync = promisify(fs.unlink)
dotenv.config();


const CreateArticle = async(req, res) => {
    try{

        const reqInclFile = {
            ...req.body,
            heroImage: req.file.filename
          };

        const data = await Article.create(reqInclFile)
        if(data){
            res.status(200).json({
                msg: "Article published."
            })
        }else{
            res.status(403).json({
                msg: "Failed to publish article."
            })
        }
    }catch(error){
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    } 
}

// const UploadBoardMemberCtznship = async(req, res) => {
//     try{
//         if (req.file) {
//             const reqInclFile = {
//                 ...req.body,
//                 citizenshipFileName: req.file.filename,
//               };
    
//             const data = await BoardMemberProfile.create(reqInclFile)
//             if(data){
//                 res.status(200).json({
//                     msg: "Board member profile created successfully."
//                 })
//             }else{
//                 res.status(403).json({
//                     msg: "Board member profile registration failed."
//                 })
//             }
//         }
//     }catch(error){
//         console.error("Authentication error:", error);
//         return res.status(500).json({ msg: "Internal server error." });
//     }
// }

const GetArticles = async (req, res) => {
    try {
        const data = await Article.find();

        if (data) {
            res.status(200).json({
                data
            });
        } else {
            res.json({ msg: "Error" });
        }
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

// const EditBoardMemberProfile = async (req, res) => {
//     try {
//         console.log(req.file);

//         const id = req.params.id;
//         const updatedFields = req.body

//         if (!updatedFields || Object.keys(updatedFields).length === 0) {
//             return res.status(400).json({ msg: "No valid update data provided." });
//         }

//         const updated = await BoardMemberProfile.findByIdAndUpdate(
//             id,
//             { $set: updatedFields },
//             { new: true } // Return the updated contact document
//         );

//         if (updated) {
//             return res.status(200).json({
//                 msg: "Updated successfully.",
//                 updated 
//             });
//         } else {
//             return res.status(404).json({
//                 msg: "Data not found." 
//             });
//         }
//     } catch (err) {
//         console.error("Error: " + err);
//         return res.status(500).json({
//             msg: "Internal server error." 
//         });
//     }
// };

// const DeleteBoardMemberProfile = async(req, res) => {
//     try {
//         const id = req.params.id;

//         const data = await BoardMemberProfile.findByIdAndDelete(id);
//         const fileName = data.profileImageName;
          
//         // Construct the path to the file
//         const imagePath = `../client/src/uploads/boardMemberImage/${fileName}`;
    
//         // Delete the pdf file from the file system
//         await unlinkAsync(imagePath);
//         if (!data) {
//             return res.status(404).json({ message: 'Board member profile data not found' });
//         }

//         res.status(200).json({ message: 'Board member profile deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting board member profile:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

exports.CreateArticle = CreateArticle
exports.GetArticles = GetArticles
// exports.GetBoardMemberProfiles = GetBoardMemberProfiles
// exports.EditBoardMemberProfile = EditBoardMemberProfile
// exports.DeleteBoardMemberProfile = DeleteBoardMemberProfile
