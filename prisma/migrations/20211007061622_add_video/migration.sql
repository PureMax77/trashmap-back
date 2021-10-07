-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_T_MountainToVideo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_T_MountainToVideo_AB_unique" ON "_T_MountainToVideo"("A", "B");

-- CreateIndex
CREATE INDEX "_T_MountainToVideo_B_index" ON "_T_MountainToVideo"("B");

-- AddForeignKey
ALTER TABLE "_T_MountainToVideo" ADD FOREIGN KEY ("A") REFERENCES "T_Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_T_MountainToVideo" ADD FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
