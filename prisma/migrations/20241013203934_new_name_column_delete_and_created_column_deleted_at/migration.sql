/*
  Warnings:

  - You are about to drop the column `deleted` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `sales` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `deleted`,
    ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `updateAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `sales` DROP COLUMN `deleted`,
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;
