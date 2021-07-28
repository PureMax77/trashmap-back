-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "fileKey" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarKey" TEXT;
