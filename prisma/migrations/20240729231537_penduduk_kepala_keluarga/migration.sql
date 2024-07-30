/*
  Warnings:

  - A unique constraint covering the columns `[nik_kepala_keluarga]` on the table `penduduk_kartu_keluarga` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `penduduk_kartu_keluarga` MODIFY `nik_kepala_keluarga` VARCHAR(16) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `penduduk_kartu_keluarga_nik_kepala_keluarga_key` ON `penduduk_kartu_keluarga`(`nik_kepala_keluarga`);

-- AddForeignKey
ALTER TABLE `penduduk_kartu_keluarga` ADD CONSTRAINT `penduduk_kartu_keluarga_nik_kepala_keluarga_fkey` FOREIGN KEY (`nik_kepala_keluarga`) REFERENCES `penduduk`(`nik`) ON DELETE CASCADE ON UPDATE CASCADE;
