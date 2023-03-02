const staffDB = require("../models/staffData");

exports.getStaffPage = (req, res) => {
  res.send("Staff Page");
};

exports.getStaffLoginPage = (req, res) => {
  res.render("staff/login", {
    error: req.flash("error"),
  });
};

exports.postStaffLoginPage = async (req, res) => {
  const { staffname, staffpass } = req.body;
  try {
    const staff = await staffDB.findOne({ StaffName: staffname });
    if (!staff) {
      return res.status(401).send("Invalid user or username");
    }

    const passstaff = await staffDB.findOne({ Password: staffpass });
    if (!passstaff) {
      req.flash("error", "Invalid Password");
      return res.redirect("/staff/login");
    }
    if (!staff.verified) {
      return res.redirect("/staff/login");
    }

    res.redirect("/staff/staffDash");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
exports.getStaffDashboard = (req, res) => {
  res.render("staff/staffDash");
};

exports.getStaffSignupPage = (req, res) => {
  res.render("staff/signup");
};

exports.postStaffSignupPage = async (req, res) => {
  try {
    const staff = new staffDB({
      StaffName: req.body.ssignname,
      Password: req.body.ssignpass,
      StaffEmail: req.body.ssignmail,
      verified: false,
    });
    await staff.save();
    res.redirect("/staff/login");
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error");
  }
};
