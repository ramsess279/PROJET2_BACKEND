/*
  Warnings:

  - You are about to drop the column `couleurTexte` on the `Entreprise` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nom]` on the table `Entreprise` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Entreprise` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Entreprise` DROP COLUMN `couleurTexte`;

-- AlterTable
ALTER TABLE `Paiement` ADD COLUMN `nombreHeure` INTEGER NULL,
    ADD COLUMN `nombreJour` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Entreprise_nom_key` ON `Entreprise`(`nom`);

-- CreateIndex
CREATE UNIQUE INDEX `Entreprise_email_key` ON `Entreprise`(`email`);
