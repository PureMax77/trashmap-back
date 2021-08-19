/*
  Warnings:

  - Made the column `image` on table `T_Mountain` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "T_Mountain" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DEFAULT E'https://trashmap-fold.s3.ap-northeast-2.amazonaws.com/TMountain-img/defaultMountain.jpg';
