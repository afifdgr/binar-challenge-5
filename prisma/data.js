const bcrypt = require("bcrypt");

const users = [
  {
    name: "User 1",
    email: "user1@mail.com",
    password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10)),
  },
  {
    name: "User 2",
    email: "user2@mail.com",
    password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10)),
  },
  {
    name: "User 3",
    email: "user3@mail.com",
    password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10)),
  },
];

const profiles = [
  {
    identity_type: "Type 1",
    identity_number: 1001,
    address: "Address 1",
    user_id: 1,
  },
  {
    identity_type: "Type 2",
    identity_number: 1002,
    address: "Address 2",
    user_id: 2,
  },
  {
    identity_type: "Type 3",
    identity_number: 1003,
    address: "Address 3",
    user_id: 3,
  },
];

const bank_accounts = [
  {
    bank_name: "Bank User 1",
    bank_account_number: 1001,
    balance: 500000,
    user_id: 1,
  },
  {
    bank_name: "Bank User 1_2",
    bank_account_number: 1002,
    balance: 500000,
    user_id: 1,
  },
  {
    bank_name: "Bank User 1_3",
    bank_account_number: 1003,
    balance: 500000,
    user_id: 1,
  },
  {
    bank_name: "Bank User 2",
    bank_account_number: 2001,
    balance: 500000,
    user_id: 2,
  },
  {
    bank_name: "Bank User 2-1",
    bank_account_number: 2002,
    balance: 500000,
    user_id: 2,
  },
  {
    bank_name: "Bank User 3",
    bank_account_number: 3001,
    balance: 500000,
    user_id: 3,
  },
];

const bank_account_transactions = [
  {
    source_account_id: 1,
    destination_account_id: 2,
    amount: 5000,
  },
  {
    source_account_id: 2,
    destination_account_id: 1,
    amount: 7000,
  },
  {
    source_account_id: 2,
    destination_account_id: 3,
    amount: 1500,
  },
  {
    source_account_id: 3,
    destination_account_id: 2,
    amount: 3000,
  },
  {
    source_account_id: 3,
    destination_account_id: 1,
    amount: 2000,
  },
  {
    source_account_id: 1,
    destination_account_id: 3,
    amount: 4000,
  },
];

module.exports = {
  users,
  profiles,
  bank_accounts,
  bank_account_transactions,
};
