import  jwt from "jsonwebtoken";
import CohortFour from "../Model/usermodel.js"
import bcrypt from 'bcryptjs'


// Register User
export const createstudents = async (req, res) => {
    const {
        name, UserName, email, phoneNumber, password, country, State, address
    } = req.body

     if (!password) {
        return res.status(400).json({ message: "Password is required." });
    }
    try {

       const exist = await CohortFour.findOne({email});
        if (exist) return res.status(400).json({message:"Email Already Exist"})
    

 


    const userNames = await CohortFour.findOne({UserName})
    if (userNames) return res.status(400).json({message:"User Name Already Exist"})

    
    const phoneNumbers = await CohortFour.findOne({phoneNumber})
    if (phoneNumbers) return res.status(400).json({message:"Phone Number Already Exist"})

// Hash Password
     const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

    const students = await CohortFour.create({
        name,
        UserName, 
        email, 
        phoneNumber, 
        password:hashPassword, 
        country, 
        State, 
        address
    })
    return res.status(201).json({
        message:"registeration Successful", students
    })
 }  catch (error) {
    console.error(error)
    res.status(500).json({message:"Server Error", error})
 }
    }

    // GET ALL USERS
export const getAllStudents = async(req, res) => {
    try { 
        let student = await CohortFour.find().select
        ('-password')
        res.status(200).json(student)
    } catch (error) {
        res.status(500).json({message:"server Error",
        error})
    }
}

// LOGIN
export const loginUser = async (req, res) =>{
// create payload
const {email, password} = req.body
try {
    // check user exist
const user = await CohortFour.findOne({email})
if(!user) return res.status(404).json({message: "Email Dose Not Exist"})
    // compare password
const isMatch = await bcrypt.compare(password, user.password)
if(!isMatch) return res.status(400).json
({message:"Incorrect Password"})

const token = jwt.sign({id:user._id}, process.env.SECRET_KEY, {expiresIn: '1hr'}   
)
res.status(200).json({message:"login Successful",
token,
user:{
    id:user._id,
    name:user.name,
    email:user.email,
    phoneNumber:user.phoneNumber
}
})

} catch (error) {
    res.status(500).json({message:error.message})
}
}

// GET USER BY ID
export const getUserById = async (req, res) =>{
const userId = req.params.id
try {
    const user = await CohortFour.findById(userId).select
    ('-password')
    if(!user) return res.status(404).json({message:"User Not Found"})
        res.status(200).json(user)
} catch (error) {
    res.status(500).json({message:error.message})
}
}

// Usuer Updadate 
export const updateUser = async (req, res) => {
    let userId = req.params.id
    const {name,UserName, email, phoneNumber, password, country, State} 
    = req.body
try {
    let user = await CohortFour.findByIdAndUpdate(userId)
    if(!user) return res.status(404).json({message:"user Not Found"})

        // Update Only Provided Fields
        user.name = name || user.name
        user.UserName= UserName|| user.UserName
        user.email = email || user.email
        user.phoneNumber = phoneNumber || user.phoneNumber
        user.password = password || user.password
        user.country = country || user.country
        user.State = State || user.State
        await user.save()
    res.status(200).json({

        message:"User Successfully Updated",
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            phoneNumber:user.phoneNumber,
            country:user.country,
            State:user.State
        }
    })
} catch (error) {
    res.status(500).json({message:error.message})

}
}

// Delete user

export const deleteUser = async (req, res) =>{
    const userId = req.params.id
    try {
    const user = await CohortFour.findById(userId)
    if (!user) return res.status(404).json({message:"user dosent exist"})
        await user.deleteOne()
    res.status(200).json({message:"user deleted successfully"})
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
}