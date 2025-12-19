const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const UnverifiedUser = require("../models/UnverifiedUserModel");
const { verifyUser } = require("../middleware/authMiddleware");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const moment = require("moment");
const Article = require("../models/Articles");
const adminModel = require("../models/admin/adminModel");
const BlacklistedToken = require('../models/blackListedToken');
const expressAsyncHandler = require("express-async-handler");
require("dotenv").config();

const { createUser,
  createUnverifiedUser,
  findUnverifiedUserByEmail,
  findUnverifiedUserByHandle,
  findUnverifiedUserById,
  findUserByEmail,
  findUserByHandle,
  findUserById,
  checkExistingUser,
  getMyProfile,
  getPublicProfile
} = require('../../db/userService');

const { findAdminByEmail, findAdminByHandle } = require('../../db/adminService');


module.exports.register = expressAsyncHandler(
  async (req, res) => {
    try {
      const {
        user_name,
        user_handle,
        email,
        isDoctor,
        Profile_image,
        password,
        qualification,
        specialization,
        Years_of_experience,
        contact_detail,
      } = req.body;

      if (!user_name || !user_handle || !email || !password) {
        return res
          .status(400)
          .json({ error: "Please provide all required fields" });
      }


      const [existingUser, existingAdmin] =
        await Promise.all([
          await checkExistingUser({
            email: email,
            user_handle: user_handle
          }),
          await findAdminByEmail(email)
        ]);

      if (existingUser || existingAdmin) {
        return res.status(400).json({ error: "Email or user handle already in use" });
      }

      // Generate a verification token

      const jwt_secret = process.env.JWT_SECRET;

      const verificationToken = await createUnverifiedUser({
        user_name,
        user_handle,
        email,
        isDoctor,
        Profile_image,
        password,
        qualification,
        specialization,
        Years_of_experience,
        contact_detail,
        jwt_secret
      });

      if (verificationToken == null) {
        return res.status(400).json({ error: "Error creating  user" });
      } else {
        res.status(201).json({
          message: "Registration successful. Please verify your email.",
          token: verificationToken,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: error.message });
    }
  }
)

module.exports.checkUserHandle = expressAsyncHandler(

  async (req, res) => {
    const userHandle = req.body.userHandle;

    if (!userHandle) {
      return res.status(400).json({ error: "User handle is required" });
    }

    try {

      const [user, unverifiedUser, admin] = await Promise.all([
        findUserByHandle(userHandle),
        findUnverifiedUserByHandle(userHandle),
        findAdminByHandle(userHandle)
      ])


      if (user || unverifiedUser || admin) {
        return res.status(200).json({ status: true, message: "User handle already exists" });
      }

      return res.status(200).json({ status: false, message: 'User handle is available.' });

    } catch (err) {
      console.error("Error checking user handle:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
)

module.exports.getprofile = expressAsyncHandler(
  async (req, res) => {
    try {
      const user = await getMyProfile(req.userId)
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      if (!user.isVerified) {
        return res
          .status(403)
          .json({ error: "Email not verified. Please check your email." });
      }
      res.json({ status: true, profile: user });
    } catch (error) {
      console.error("Error getting user profile:", error);
      res.status(500).json({ error: error.message });
    }
  }
)

module.exports.getUserProfile = expressAsyncHandler(
  async (req, res) => {
    try {
      const userId = req.query.id;
      const userHandle = req.query.handle;

      if (!userHandle && !userId) {
        return res.status(400).json({ error: "User handle or id is required." });
      }

      let user = await getPublicProfile(userId, userHandle);


      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.isBlockUser || user.isBannedUser) {
        return res.status(403).json({ error: "User is blocked or banned" });
      }

      res.json({ status: true, profile: user });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  }
)


