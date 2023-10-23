const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  users,
  profiles,
  bank_accounts,
  bank_account_transactions,
} = require("./data");

async function main() {
  try {
    await prisma.$transaction([prisma.users.deleteMany()]);
    await prisma.$transaction([prisma.profiles.deleteMany()]);
    await prisma.$transaction([prisma.bank_accounts.deleteMany()]);
    await prisma.$transaction([prisma.bank_account_transactions.deleteMany()]);
    await prisma.$queryRaw`ALTER TABLE users AUTO_INCREMENT = 1`;
    await prisma.$queryRaw`ALTER TABLE profiles AUTO_INCREMENT = 1`;
    await prisma.$queryRaw`ALTER TABLE bank_accounts AUTO_INCREMENT = 1`;
    await prisma.$queryRaw`ALTER TABLE bank_account_transactions AUTO_INCREMENT = 1`;

    const Users = await prisma.users.createMany({
      data: users,
    });

    const Profiles = await prisma.profiles.createMany({
      data: profiles,
    });

    const BankAccounts = await prisma.bank_accounts.createMany({
      data: bank_accounts,
    });

    const BankAccountsTransactions =
      await prisma.bank_account_transactions.createMany({
        data: bank_account_transactions,
      });

    console.log({ Users, Profiles, BankAccounts, BankAccountsTransactions });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    console.log("Seeder Finished");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
