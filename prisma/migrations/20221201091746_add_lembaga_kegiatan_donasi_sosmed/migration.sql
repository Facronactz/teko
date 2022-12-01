/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `Lembaga` (
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

    UNIQUE INDEX `Lembaga_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lembaga_members` (
    `lembaga_id` VARCHAR(191) NOT NULL,
    `member_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`lembaga_id`, `member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lembaga_admin` (
    `lembaga_id` VARCHAR(191) NOT NULL,
    `admin_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`lembaga_id`, `admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kegiatan` (
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
CREATE TABLE `lembaga_kegiatan_peserta` (
    `kegiatan_id` VARCHAR(191) NOT NULL,
    `peserta_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`kegiatan_id`, `peserta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kategori` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Kategori_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SosialMedia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `platform` VARCHAR(191) NOT NULL,
    `lembaga_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Donasi` (
    `id` VARCHAR(191) NOT NULL,
    `donatur_id` VARCHAR(191) NOT NULL,
    `lembaga_id` VARCHAR(191) NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_KategoriToLembaga` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_KategoriToLembaga_AB_unique`(`A`, `B`),
    INDEX `_KategoriToLembaga_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_KategoriToKegiatan` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_KategoriToKegiatan_AB_unique`(`A`, `B`),
    INDEX `_KategoriToKegiatan_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_username_key` ON `users`(`username`);

-- AddForeignKey
ALTER TABLE `Lembaga` ADD CONSTRAINT `Lembaga_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lembaga_members` ADD CONSTRAINT `lembaga_members_lembaga_id_fkey` FOREIGN KEY (`lembaga_id`) REFERENCES `Lembaga`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lembaga_members` ADD CONSTRAINT `lembaga_members_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lembaga_admin` ADD CONSTRAINT `lembaga_admin_lembaga_id_fkey` FOREIGN KEY (`lembaga_id`) REFERENCES `Lembaga`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lembaga_admin` ADD CONSTRAINT `lembaga_admin_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kegiatan` ADD CONSTRAINT `Kegiatan_lembaga_id_fkey` FOREIGN KEY (`lembaga_id`) REFERENCES `Lembaga`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lembaga_kegiatan_peserta` ADD CONSTRAINT `lembaga_kegiatan_peserta_kegiatan_id_fkey` FOREIGN KEY (`kegiatan_id`) REFERENCES `Kegiatan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lembaga_kegiatan_peserta` ADD CONSTRAINT `lembaga_kegiatan_peserta_peserta_id_fkey` FOREIGN KEY (`peserta_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SosialMedia` ADD CONSTRAINT `SosialMedia_lembaga_id_fkey` FOREIGN KEY (`lembaga_id`) REFERENCES `Lembaga`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donasi` ADD CONSTRAINT `Donasi_donatur_id_fkey` FOREIGN KEY (`donatur_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donasi` ADD CONSTRAINT `Donasi_lembaga_id_fkey` FOREIGN KEY (`lembaga_id`) REFERENCES `Lembaga`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_KategoriToLembaga` ADD CONSTRAINT `_KategoriToLembaga_A_fkey` FOREIGN KEY (`A`) REFERENCES `Kategori`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_KategoriToLembaga` ADD CONSTRAINT `_KategoriToLembaga_B_fkey` FOREIGN KEY (`B`) REFERENCES `Lembaga`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_KategoriToKegiatan` ADD CONSTRAINT `_KategoriToKegiatan_A_fkey` FOREIGN KEY (`A`) REFERENCES `Kategori`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_KategoriToKegiatan` ADD CONSTRAINT `_KategoriToKegiatan_B_fkey` FOREIGN KEY (`B`) REFERENCES `Kegiatan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
