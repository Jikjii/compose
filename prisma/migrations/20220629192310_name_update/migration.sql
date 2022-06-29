/*
  Warnings:

  - You are about to drop the `piece` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "piece";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Piece" (
    "category" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "composer" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatdAt" DATETIME NOT NULL
);
