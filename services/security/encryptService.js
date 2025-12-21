const bcrypt = require('bcrypt');

const generateHashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

const isSamePassword = async (userPassword, newPassword) => {
    return await bcrypt.compare(userPassword, newPassword);
}

module.exports = {
    generateHashPassword,
    isSamePassword
}