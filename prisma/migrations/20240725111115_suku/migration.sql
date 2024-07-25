/*
  Warnings:

  - Added the required column `deskripsi` to the `master_suku` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `master_suku` ADD COLUMN `deskripsi` TEXT NOT NULL;
