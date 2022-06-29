-- CreateTable
CREATE TABLE "piece" (
    "category" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "composer" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatdAt" DATETIME NOT NULL
);
