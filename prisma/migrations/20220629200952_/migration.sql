/*
  Warnings:

  - The primary key for the `Piece` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `link` to the `Piece` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Piece` table without a default value. This is not possible if the table is not empty.
  - Added the required column `synopsis` to the `Piece` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Piece" (
    "name" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL PRIMARY KEY,
    "link" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "composer" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatdAt" DATETIME NOT NULL
);
INSERT INTO "new_Piece" ("category", "composer", "createdAt", "description", "name", "updatdAt") SELECT "category", "composer", "createdAt", "description", "name", "updatdAt" FROM "Piece";
DROP TABLE "Piece";
ALTER TABLE "new_Piece" RENAME TO "Piece";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
