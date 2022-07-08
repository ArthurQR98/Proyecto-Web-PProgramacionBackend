-- AlterTable
ALTER TABLE "Curso" ALTER COLUMN "key_image" DROP NOT NULL,
ALTER COLUMN "url_image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Estudiante" ALTER COLUMN "key_image" DROP NOT NULL,
ALTER COLUMN "url_image" DROP NOT NULL;
