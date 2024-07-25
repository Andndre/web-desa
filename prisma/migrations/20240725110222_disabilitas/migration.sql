/*
  Warnings:

  - You are about to drop the `master_cacat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `penduduk` DROP FOREIGN KEY `penduduk_cacat_id_fkey`;

-- DropTable
DROP TABLE `master_cacat`;

-- CreateTable
CREATE TABLE `master_disabilitas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `penduduk` ADD CONSTRAINT `penduduk_cacat_id_fkey` FOREIGN KEY (`cacat_id`) REFERENCES `master_disabilitas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
