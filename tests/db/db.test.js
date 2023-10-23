const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

describe("Prisma-Database", () => {
  it("Should establish a connection to the database", async () => {
    try {
      await prisma.$connect();
      const result = await prisma.$queryRaw`SELECT 1 as result`;
      expect(result[0].result).toEqual(1);
    } catch (error) {
      throw error;
    }
  });
});
