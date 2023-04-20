/*
  Warnings:

  - You are about to drop the column `emain` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_emain_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emain",
ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "first_name" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
