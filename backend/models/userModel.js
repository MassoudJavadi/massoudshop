import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    isAdmin:{
        type: Boolean,
        required:true,
        default:false
    }
}, {
    timestamps:true
}
)

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  }



//before we save password, we want run function
userSchema.pre('save',async function(next){
    //We don't want run this function, if only name or email is updating. because if this function runs in this special case, we will have new hash and can't access profile again.
     if(!this.isModified('password')){
        next()
     }

    //salt to hash password 
    const salt = await bcrypt.genSalt(10)
    //Initially, this.password is plain text, but we set it to hashed
    this.password = await bcrypt.hash(this.password,salt)

})

const User = mongoose.model('User', userSchema)

export default User
