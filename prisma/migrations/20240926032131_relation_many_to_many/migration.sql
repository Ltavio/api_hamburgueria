/*
  Warnings:

  - You are about to drop the column `productId` on the `sales` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `sales` DROP FOREIGN KEY `sales_productId_fkey`;

-- AlterTable
ALTER TABLE `sales` DROP COLUMN `productId`;

-- CreateTable
CREATE TABLE `ProductOnSales` (
    `productId` VARCHAR(191) NOT NULL,
    `saleId` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`productId`, `saleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductOnSales` ADD CONSTRAINT `ProductOnSales_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOnSales` ADD CONSTRAINT `ProductOnSales_saleId_fkey` FOREIGN KEY (`saleId`) REFERENCES `sales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
