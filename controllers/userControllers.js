const User = require("../models/user");
const fs = require("fs");
const JobseekerProfile = require("../models/jobseekerProfile");
const { EmployeerProfile } = require("../models/EmployeerProfile");

module.exports.getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ _id: userId })
      .select("-password")
      .populate("profileId");

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

module.exports.updateProfile = async (req, res) => {
  const { name, role, website, location, employeecount, description, pitch } =
    req.body;

  // const profileUrl = `${process.env.DOMAINURL}/api/profile/${req.file.filename}`;
  // const profile = await JobseekerProfile.findOne({ userId: req.params.userId });

  // console.log(req.file);
  // const profileRef = ref(storage, req.file.filename);
  // uploadBytes(profileRef, file).then((snapshot) => {
  //   console.log("Uploaded a blob or file!");
  // });

  // if (profile) {
  const updatedprofile = await EmployeerProfile.findOneAndUpdate(
    { userId: req.params.userId },
    {
      $set: {
        name,
        role,
        website,
        location,
        employeecount,
        description,
        pitch,
      },
    }
  );
  console.log(updatedprofile);
  // } else {
  //   const newprofile = new JobseekerProfile({
  //     userId: req.params.userId,
  //     profileUrl,
  //   });
  //   await newprofile.save();
  // }

  res.json({
    success: 1,
    updatedprofile,
  });
};

module.exports.getProfile = async (req, res) => {
  let profile;
  try {
    if (req.params.isEmployeer) {
      profile = await EmployeerProfile.findOne({
        userId: req.params.userId,
      });
    } else {
      profile = await JobseekerProfile.findOne({
        userId: req.params.userId,
      });
    }

    res.status(200).send(profile);
  } catch (error) {
    res.status(500).send(error);
  }
};
