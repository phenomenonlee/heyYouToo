const bcrypt = require("bcrypt");

const hashed = async () => {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash("12345678", salt);
    console.log(hashpassword);

    const validPassword = await bcrypt.compare("12345678", hashpassword);
    console.log(validPassword);
    return;
};

hashed();
