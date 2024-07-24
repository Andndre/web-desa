/*
  Warnings:

  - You are about to alter the column `nama` on the `master_golongan_darah` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(5)`.

*/
-- AlterTable
ALTER TABLE `master_golongan_darah` MODIFY `nama` VARCHAR(5) NOT NULL;
