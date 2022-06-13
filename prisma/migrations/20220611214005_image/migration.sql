-- AlterTable
ALTER TABLE `Item` ADD COLUMN `imageAlt` VARCHAR(191) NOT NULL DEFAULT 'This is a product',
    ADD COLUMN `imageSrc` VARCHAR(191) NOT NULL DEFAULT './../images/firework.jpg';
