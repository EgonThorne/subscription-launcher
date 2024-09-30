/*
  Warnings:

  - You are about to drop the column `isServiceActive` on the `UserPlan` table. All the data in the column will be lost.
  - You are about to drop the column `lastResetDate` on the `UserPlan` table. All the data in the column will be lost.
  - You are about to drop the column `lastUsageDate` on the `UserPlan` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionDate` on the `UserPlan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserPlan" DROP COLUMN "isServiceActive",
DROP COLUMN "lastResetDate",
DROP COLUMN "lastUsageDate",
DROP COLUMN "subscriptionDate",
ADD COLUMN     "serviceStatus" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "subDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
