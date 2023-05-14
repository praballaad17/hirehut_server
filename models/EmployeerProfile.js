const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  city: String,
  pincode: String,
  state: String,
  address: String,
});

const EmployeerProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  branches: {
    type: [Schema.Types.ObjectId],
    ref: "Branch",
  },
});

const EmployeerProfile = mongoose.model(
  "EmployeerProfile",
  EmployeerProfileSchema
);
const Branch = mongoose.model("Branch", BranchSchema);

module.exports = { EmployeerProfile, Branch };
