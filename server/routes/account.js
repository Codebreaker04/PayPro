const express = require("express");
const middleware = require("../middleware");
const { Account, User } = require("../db");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/balance", middleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  if (!account) {
    return res.status(404).json({ msg: "Account not found" });
  }

  const user = await User.findOne({ _id: req.userId });

  res.json({
    firstname: user.firstName,
    balance: account.balance,
  });
});

router.post("/transfer", middleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  const fromId = req.userId;
  const { toId, amount } = req.body;

  const userAccount = await Account.findOne({ userId: fromId }).session(
    session,
  );

  if (!userAccount || userAccount.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      msg: "Balance insufficient",
    });
  }
  const toAccount = await Account.findOne({ userId: toId }).session(session);
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      msg: "Invalid account",
    });
  }

  await Account.updateOne(
    { userId: fromId },
    { $inc: { balance: -amount } },
  ).session(session);
  await Account.updateOne(
    { userId: toId },
    { $inc: { balance: +amount } },
  ).session(session);

  await session.commitTransaction();
  res.json({
    msg: "Transfer successfully",
  });
  await session.endSession();
});
module.exports = router;
