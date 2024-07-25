-- CreateTable
CREATE TABLE `master_penduduk_hubungan` (
    `id` INTEGER NOT NULL,
    `nama` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `master_penduduk_status_kawin` (
    `id` INTEGER NOT NULL,
    `nama` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `master_status` (
    `id` INTEGER NOT NULL,
    `nama` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `master_penduduk_status_dasar` (
    `id` INTEGER NOT NULL,
    `nama` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `master_cacat` (
    `id` INTEGER NOT NULL,
    `nama` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `master_sakit_menahun` (
    `id` INTEGER NOT NULL,
    `nama` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `master_suku` (
    `id` INTEGER NOT NULL,
    `nama` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `penduduk` (
    `nik` VARCHAR(16) NOT NULL,
    `kk_id` VARCHAR(16) NOT NULL,
    `nama` VARCHAR(50) NOT NULL,
    `tempat_lahir` VARCHAR(191) NULL,
    `tanggal_lahir` DATETIME(3) NULL,
    `jenis_kelamin` ENUM('Pria', 'Wanita') NOT NULL,
    `agama_id` INTEGER NOT NULL,
    `alamat` VARCHAR(191) NULL,
    `nomor_akta_lahir` VARCHAR(191) NULL,
    `foto_akta_lahir` VARCHAR(191) NULL,
    `telepon` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `pekerjaan_id` INTEGER NULL,
    `pendidikan_id` INTEGER NULL,
    `golongan_darah_id` INTEGER NULL,
    `cacat_id` INTEGER NULL,
    `status_kawin_id` INTEGER NULL,
    `hubungan_id` INTEGER NULL,
    `status_id` INTEGER NULL,
    `status_dasar_id` INTEGER NULL,
    `sakit_menahun_id` INTEGER NULL,
    `suku_id` INTEGER NULL,

    PRIMARY KEY (`nik`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `penduduk_kartu_keluarga` (
    `nomor_kk` VARCHAR(16) NOT NULL,
    `nik_kepala_keluarga` VARCHAR(16) NOT NULL,

    PRIMARY KEY (`nomor_kk`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `penduduk` ADD CONSTRAINT `penduduk_agama_id_fkey` FOREIGN KEY (`agama_id`) REFERENCES `master_agama`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penduduk` ADD CONSTRAINT `penduduk_pekerjaan_id_fkey` FOREIGN KEY (`pekerjaan_id`) REFERENCES `master_pekerjaan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penduduk` ADD CONSTRAINT `penduduk_pendidikan_id_fkey` FOREIGN KEY (`pendidikan_id`) REFERENCES `master_pendidikan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penduduk` ADD CONSTRAINT `penduduk_golongan_darah_id_fkey` FOREIGN KEY (`golongan_darah_id`) REFERENCES `master_golongan_darah`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penduduk` ADD CONSTRAINT `penduduk_status_kawin_id_fkey` FOREIGN KEY (`status_kawin_id`) REFERENCES `master_penduduk_status_kawin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penduduk` ADD CONSTRAINT `penduduk_hubungan_id_fkey` FOREIGN KEY (`hubungan_id`) REFERENCES `master_penduduk_hubungan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penduduk` ADD CONSTRAINT `penduduk_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `master_status`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penduduk` ADD CONSTRAINT `penduduk_status_dasar_id_fkey` FOREIGN KEY (`status_dasar_id`) REFERENCES `master_penduduk_status_dasar`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penduduk` ADD CONSTRAINT `penduduk_cacat_id_fkey` FOREIGN KEY (`cacat_id`) REFERENCES `master_cacat`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penduduk` ADD CONSTRAINT `penduduk_sakit_menahun_id_fkey` FOREIGN KEY (`sakit_menahun_id`) REFERENCES `master_sakit_menahun`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penduduk` ADD CONSTRAINT `penduduk_suku_id_fkey` FOREIGN KEY (`suku_id`) REFERENCES `master_suku`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penduduk` ADD CONSTRAINT `penduduk_kk_id_fkey` FOREIGN KEY (`kk_id`) REFERENCES `penduduk_kartu_keluarga`(`nomor_kk`) ON DELETE RESTRICT ON UPDATE CASCADE;
