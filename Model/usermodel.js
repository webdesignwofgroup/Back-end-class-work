import mongoose from "mongoose";
const cohortFourSchema = new mongoose.Schema (
    {
        name:{type:String, required:true},
        UserName:{type:String, required:true, unique:true },
        email:{type:String, required:true, Unique:true },
        phoneNumber:{type:String, required:true, Unique:true },
        password:{type:String, required:true, Unique:true },
        country:{type:String, required:false},
        State:{type:String, required:false},
        address:{type:String, required:false},
    },
    {timestamps:true}
)

const cohorstFour = mongoose.model('CohortFour', cohortFourSchema )
export default cohorstFour