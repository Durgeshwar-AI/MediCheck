import mongoose from "mongoose"

const teamSchema = mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  image:{
    type: String,
    required: true,
  },
  role:{
    type: String,
    required: true,
  },
  bio: {
    type: String,
    rquired: true,
  },
  eduction:{
    type: String,
    required: true,
  },
  expertise: {
    type: [String],
  },
  publication: {
    type: [String]
  }
})

const Team = mongoose.model('Team', teamSchema)

export {Team}
