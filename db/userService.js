const User = require("../models/UserModel");
const UnverifiedUser = require("../models/UnverifiedUserModel");
const bcrypt = require("bcrypt");


const createUser = async ({
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
}) => {
    const newUser = new User({
        user_name: user_name,
        user_handle: user_handle,
        email: email,
        password: password,
        isDoctor: isDoctor,
        specialization: specialization,
        qualification: qualification,
        Years_of_experience: Years_of_experience,
        contact_detail: contact_detail,
        Profile_image: Profile_image,
        isVerified: true
    });

    await newUser.save();

    if (newUser) {
        return newUser;
    }
    return null;
}

const createUnverifiedUser = async ({
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
    verificationToken
}) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a verification token
    const verificationToken = jwt.sign({ email }, jwt_secret, {
        expiresIn: "1h",
    });
    console.log("Verification token : ", verificationToken);
    const newUser = new UnverifiedUser({
        user_name: user_name,
        user_handle: user_handle,
        email: email,
        password: hashedPassword,
        isDoctor: isDoctor,
        specialization: specialization,
        qualification: qualification,
        Years_of_experience: Years_of_experience,
        contact_detail: contact_detail,
        Profile_image: Profile_image,
        verificationToken
    });

    await newUser.save();

    if (newUser) {
        return newUser;
    }
    return null;
}

const findUnverifiedUserByEmail = async (email) => {

    if (!email) return null;
    const user = await UnverifiedUser.findOne({ email: email });

    return user;
}

const findUnverifiedUserByHandle = async (user_handle) => {

    if (!user) return null;
    const user = await UnverifiedUser.findOne({ user_handle: user_handle });
    return null;
}

const findUnverifiedUserById = async (_id) => {

    const user = await UnverifiedUser.findById(_id);

    return user;
}

const findUserByEmail = async (email) => {

    if (!email) return null;
    const user = await User.findOne({ email: email });

    return user;
}

const findUserByHandle = async (user_handle) => {

    if (!user) return null;
    const user = await User.findOne({ user_handle: user_handle });
    return null;
}

const findUserById = async (_id) => {

    const user = await User.findById(_id);

    return user;
}

const checkExistingUser = async ({ email, user_handle }) => {

    const exitingEmail = await findUserByEmail(email);
    const existingUnverifiedEmail = await findUnverifiedUserByEmail(email);
    const existingUserHandle = await findUserByHandle(user_handle);
    const existingUnverifiedByHandle = await findUnverifiedUserByHandle(user_handle);

    return exitingEmail || existingUserHandle || existingUnverifiedEmail || existingUnverifiedByHandle;
}

// Left
// 1. Update User
// 2. Delete User
// 3. Delete Unverified User



