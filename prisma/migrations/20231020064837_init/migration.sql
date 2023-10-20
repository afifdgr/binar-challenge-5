/*
  Warnings:

  - You are about to alter the column `bank_account_number` on the `bank_accounts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `bank_accounts` MODIFY `bank_account_number` INTEGER NOT NULL;
