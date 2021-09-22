/*
  Warnings:

  - You are about to drop the column `t_MountainId` on the `Article` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_t_MountainId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "t_MountainId";

-- CreateTable
CREATE TABLE "_ArticleToT_Mountain" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToT_Mountain_AB_unique" ON "_ArticleToT_Mountain"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToT_Mountain_B_index" ON "_ArticleToT_Mountain"("B");

-- AddForeignKey
ALTER TABLE "_ArticleToT_Mountain" ADD FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToT_Mountain" ADD FOREIGN KEY ("B") REFERENCES "T_Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;
