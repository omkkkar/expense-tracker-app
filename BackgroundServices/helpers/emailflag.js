const fs = require("fs");
const path = require("path");

const flagFilePath = path.resolve(__dirname, "emailFlag.json");

const getEmailFlag = () => {
  if (fs.existsSync(flagFilePath)) {
    const data = fs.readFileSync(flagFilePath);
    return JSON.parse(data).emailSent;
  }
  return false;
};

const setEmailFlag = (status) => {
  fs.writeFileSync(flagFilePath, JSON.stringify({ emailSent: status }));
};

module.exports = { getEmailFlag, setEmailFlag };