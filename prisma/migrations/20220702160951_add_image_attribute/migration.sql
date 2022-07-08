/*
  Warnings:

  - Added the required column `key_image` to the `Curso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url_image` to the `Curso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key_image` to the `Estudiante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url_image` to the `Estudiante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Curso" ADD COLUMN     "key_image" TEXT NOT NULL,
ADD COLUMN     "url_image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Estudiante" ADD COLUMN     "key_image" TEXT NOT NULL,
ADD COLUMN     "url_image" TEXT NOT NULL;
