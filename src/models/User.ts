import mongoose, { Schema, Document } from "mongoose"
import bcrypt from "bcrypt"

// Make a blueprint for "User" (for TypeScript)
export interface UserInterface extends Document {
  name: string,
  username: string,
  email: string,
  password: string,
  comparePassword(candidate: string):Promise<boolean>
}

// Make a schematic for "User" (for mongoose)
const UserSchema: Schema = new Schema ({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (s: string) => {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(s)
      },
      message: (props: {val: string}) => {
        return `${props.val} is not a valid email address`
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (s: string) => {
        return /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(s)
      },
      message: () => {
        return "Your password must be 8 characters long, containing at least 1 capital letter and at least 1 special character"
      }
    }
  }
})

// Hash password when saving
UserSchema.pre<UserInterface>("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }
  try {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

// Add methods to justify password
UserSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password)
}

export default mongoose.model<UserInterface>("User", UserSchema)