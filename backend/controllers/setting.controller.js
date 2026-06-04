
const Settings = require("../models/setting.model");
const Admin = require("../models/admin.model");
// GET SETTINGS (single document)
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE SETTINGS
exports.updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findByIdAndUpdate(
        settings._id,
        req.body,
        { new: true }
      );
    }

    // Admin credentials update
    const admin = await Admin.findOne();

    if (admin) {
      if (req.body.email) {
        admin.email = req.body.email;
      }

      if (req.body.password) {
        admin.password = req.body.password;
      }

      await admin.save(); // pre("save") password hash kar dega
    }

    res.json({
      message: "Settings & Admin Updated Successfully",
      settings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};