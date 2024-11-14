import mongoose from "mongoose";

const travelSchema = mongoose.Schema(
  {

  image:{
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
},{
    timestamps:true // will show a created at  and updated at
});

const Travel = mongoose.model('Travel', travelSchema);

export default Travel;