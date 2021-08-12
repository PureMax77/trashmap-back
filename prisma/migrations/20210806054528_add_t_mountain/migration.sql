-- CreateTable
CREATE TABLE "T_Mountain" (
    "id" SERIAL NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longtitude" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "amount" INTEGER,
    "image" TEXT,
    "finish" BOOLEAN NOT NULL DEFAULT false,
    "cleanCost" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);
