/*
  Warnings:

  - Added the required column `periodicityType` to the `medications` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PeriodicityType" AS ENUM ('INTERVAL', 'FIXED_TIMES');

-- AlterTable
ALTER TABLE "medications" ADD COLUMN     "periodicityType" "PeriodicityType" NOT NULL;
