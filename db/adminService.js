const adminModel = require("../models/admin/adminModel");

const findAdminByEmail = async (email) => {
    return await adminModel.findOne({ email: email });
}
const findAdminByHandle = async (user_handle) => {
    return await adminModel.findOne({ user_handle: user_handle });
}

module.exports = {
    findAdminByEmail,
    findAdminByHandle,
}