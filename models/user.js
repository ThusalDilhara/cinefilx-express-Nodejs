const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
  
  name:{
     type:String,
     required:[true,'Name is required'],
     trim:true,
  },

  email:{
     type:String,
     required:[true,'Email is required'],
     unique:true,
     trim:true,
     lowercase:true,
     validate:[
        validator.isEmail,
        'Please provide a valid email'
     ]
  },
  password:{
     type:String,
     required:[true,'Password is required'],
     trim:true,
     minlength:[8,'Password must be at least 8 characters'],
     select:false,
  },
 
  confirmPassword:{
     type:String,
     required:[true,'Confirm password is required'],
     trim:true,
     validate:{
         validator:function(el){
            return el===this.password;
         },
         message:'Passwords are not the same'
     }
   },
  photo:String



})

//encrypt password before saving to database
// and remove confirmPassword field from the document
userSchema.pre('save', async function(next){
   if(!this.isModified('password')) return next();
   
   this.password=await bcrypt.hash(this.password,12);
   this.confirmPassword=undefined;
   next();
});


const User=mongoose.model('User',userSchema);
module.exports=User;