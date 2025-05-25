/*
  Warnings:

  - You are about to drop the column `notification_token` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "notification_token",
ADD COLUMN     "notificationToken" TEXT NOT NULL DEFAULT '';
