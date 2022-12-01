/*
  Warnings:

  - You are about to drop the `Donasi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Kategori` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Kegiatan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lembaga` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SosialMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lembaga_kegiatan_peserta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lembaga_members` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Donasi` DROP FOREIGN KEY `Donasi_donatur_id_fkey`;

-- DropForeignKey
ALTER TABLE `Donasi` DROP FOREIGN KEY `Donasi_lembaga_id_fkey`;

-- DropForeignKey
ALTER TABLE `Kegiatan` DROP FOREIGN KEY `Kegiatan_lembaga_id_fkey`;

-- DropForeignKey
ALTER TABLE `Lembaga` DROP FOREIGN KEY `Lembaga_owner_id_fkey`;

-- DropForeignKey
ALTER TABLE `SosialMedia` DROP FOREIGN KEY `SosialMedia_lembaga_id_fkey`;

-- DropForeignKey
ALTER TABLE `_KategoriToKegiatan` DROP FOREIGN KEY `_KategoriToKegiatan_A_fkey`;

-- DropForeignKey
ALTER TABLE `_KategoriToKegiatan` DROP FOREIGN KEY `_KategoriToKegiatan_B_fkey`;

-- DropForeignKey
ALTER TABLE `_KategoriToLembaga` DROP FOREIGN KEY `_KategoriToLembaga_A_fkey`;

-- DropForeignKey
ALTER TABLE `_KategoriToLembaga` DROP FOREIGN KEY `_KategoriToLembaga_B_fkey`;

-- DropForeignKey
ALTER TABLE `lembaga_admin` DROP FOREIGN KEY `lembaga_admin_lembaga_id_fkey`;

-- DropForeignKey
ALTER TABLE `lembaga_kegiatan_peserta` DROP FOREIGN KEY `lembaga_kegiatan_peserta_kegiatan_id_fkey`;

-- DropForeignKey
ALTER TABLE `lembaga_kegiatan_peserta` DROP FOREIGN KEY `lembaga_kegiatan_peserta_peserta_id_fkey`;

-- DropForeignKey
ALTER TABLE `lembaga_members` DROP FOREIGN KEY `lembaga_members_lembaga_id_fkey`;

-- DropForeignKey
ALTER TABLE `lembaga_members` DROP FOREIGN KEY `lembaga_members_member_id_fkey`;

-- DropTable
DROP TABLE `Donasi`;

-- DropTable
DROP TABLE `Kategori`;

-- DropTable
DROP TABLE `Kegiatan`;

-- DropTable
DROP TABLE `Lembaga`;

-- DropTable
DROP TABLE `SosialMedia`;

-- DropTable
DROP TABLE `lembaga_kegiatan_peserta`;

-- DropTable
DROP TABLE `lembaga_members`;

-- CreateTable
CREATE TABLE `lembaga` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `ringkasan` VARCHAR(191) NOT NULL,
    `telp` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `owner_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `lembaga_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lembaga_member` (
    `lembaga_id` VARCHAR(191) NOT NULL,
    `member_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`lembaga_id`, `member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kegiatan` (
    `id` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `nama` VARCHAR(191) NOT NULL,
    `banner` VARCHAR(191) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `ringkasan` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `lokasi` VARCHAR(191) NOT NULL,
    `lembaga_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `peserta_kegiatan` (
    `kegiatan_id` VARCHAR(191) NOT NULL,
    `peserta_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`kegiatan_id`, `peserta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategori` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `kategori_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sosial_media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `platform` VARCHAR(191) NOT NULL,
    `lembaga_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donasi` (
    `id` VARCHAR(191) NOT NULL,
    `donatur_id` VARCHAR(191) NOT NULL,
    `lembaga_id` VARCHAR(191) NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lembaga` ADD CONSTRAINT `lembaga_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lembaga_member` ADD CONSTRAINT `lembaga_member_lembaga_id_fkey` FOREIGN KEY (`lembaga_id`) REFERENCES `lembaga`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lembaga_member` ADD CONSTRAINT `lembaga_member_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lembaga_admin` ADD CONSTRAINT `lembaga_admin_lembaga_id_fkey` FOREIGN KEY (`lembaga_id`) REFERENCES `lembaga`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kegiatan` ADD CONSTRAINT `kegiatan_lembaga_id_fkey` FOREIGN KEY (`lembaga_id`) REFERENCES `lembaga`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peserta_kegiatan` ADD CONSTRAINT `peserta_kegiatan_kegiatan_id_fkey` FOREIGN KEY (`kegiatan_id`) REFERENCES `kegiatan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peserta_kegiatan` ADD CONSTRAINT `peserta_kegiatan_peserta_id_fkey` FOREIGN KEY (`peserta_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sosial_media` ADD CONSTRAINT `sosial_media_lembaga_id_fkey` FOREIGN KEY (`lembaga_id`) REFERENCES `lembaga`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donasi` ADD CONSTRAINT `donasi_donatur_id_fkey` FOREIGN KEY (`donatur_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donasi` ADD CONSTRAINT `donasi_lembaga_id_fkey` FOREIGN KEY (`lembaga_id`) REFERENCES `lembaga`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_KategoriToLembaga` ADD CONSTRAINT `_KategoriToLembaga_A_fkey` FOREIGN KEY (`A`) REFERENCES `kategori`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_KategoriToLembaga` ADD CONSTRAINT `_KategoriToLembaga_B_fkey` FOREIGN KEY (`B`) REFERENCES `lembaga`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_KategoriToKegiatan` ADD CONSTRAINT `_KategoriToKegiatan_A_fkey` FOREIGN KEY (`A`) REFERENCES `kategori`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_KategoriToKegiatan` ADD CONSTRAINT `_KategoriToKegiatan_B_fkey` FOREIGN KEY (`B`) REFERENCES `kegiatan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
