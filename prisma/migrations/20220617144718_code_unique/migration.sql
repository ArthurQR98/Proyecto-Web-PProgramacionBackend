/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Estudiante` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_codigo_key" ON "Estudiante"("codigo");
