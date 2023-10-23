const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function resetDatabase() {
  try {
    await prisma.$transaction([prisma.users.deleteMany()]);
    await prisma.$transaction([prisma.profiles.deleteMany()]);
    await prisma.$transaction([prisma.bank_accounts.deleteMany()]);
    await prisma.$transaction([prisma.bank_account_transactions.deleteMany()]);
    await prisma.$queryRaw`ALTER TABLE users AUTO_INCREMENT = 1`;
    await prisma.$queryRaw`ALTER TABLE profiles AUTO_INCREMENT = 1`;
    await prisma.$queryRaw`ALTER TABLE bank_accounts AUTO_INCREMENT = 1`;
    await prisma.$queryRaw`ALTER TABLE bank_account_transactions AUTO_INCREMENT = 1`;
    console.log("Database reset completed.");
  } catch (error) {
    console.error("Error resetting database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase();
