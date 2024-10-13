-- AlterTable
ALTER TABLE `products` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `sales` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;
