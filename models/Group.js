const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true,
    },
    username:{
    type:String,
    required:true, 
   },
   role:{
    type:String,
    default:'1',
   }
  
  })

//parent schema
const GroupSchema = new mongoose.Schema({
   name:{
        type:String,
        required:true,
    },
    members:{
        type:[MemberSchema],
    },
    createdby:{
        type:String,
        immutable:true,
    }
},
{
    collection:"repair-reports"
}
)




module.exports  = mongoose.model('Group', GroupSchema)