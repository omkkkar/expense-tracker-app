const dotenv = require("dotenv");
const sendMail = require("../helpers/SendMail");
const Expense = require("../models/Expense");
const { getEmailFlag, setEmailFlag } = require("../helpers/emailflag");
dotenv.config();

const expenseEmail = async () => {
  const expenses = await Expense.find({});
  const totalExpense = expenses.reduce(
    (acc, expense) => acc + expense.value,
    0
  );

  const emailSent = getEmailFlag();


  if (totalExpense > 10000 && !emailSent ) {
    let messageoption = {
      from: process.env.EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "Warning",
      text: `Your total expense is more than ₹10000. Please review your expenses.`
    };

    await sendMail(messageoption);


    setEmailFlag(true);
  } else if (totalExpense <= 10000 && emailSent) {
    setEmailFlag(false);
  }
};


module.exports = {
  expenseEmail,
};
