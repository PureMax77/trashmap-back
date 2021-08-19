/*
  Warnings:

  - You are about to drop the column `type` on the `T_Mountain` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "T_Mountain" DROP COLUMN "type",
ADD COLUMN     "dumpType" TEXT NOT NULL DEFAULT E'더미';
