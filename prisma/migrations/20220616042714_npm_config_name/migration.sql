-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('M', 'F');

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "creditos" INTEGER NOT NULL,
    "nHoras" INTEGER NOT NULL,
    "nDocente" TEXT NOT NULL,
    "periodoId" INTEGER NOT NULL,
    "programaId" INTEGER NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estado" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estudiante" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "sexo" "Sexo" NOT NULL,
    "nroTelefono" TEXT NOT NULL,
    "edad" INTEGER,
    "estadoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Estudiante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Matricula" (
    "id" SERIAL NOT NULL,
    "estado" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estudianteId" INTEGER NOT NULL,

    CONSTRAINT "Matricula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Periodo" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Periodo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Programa" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Programa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CursoToMatricula" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_dni_key" ON "Estudiante"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Matricula_estudianteId_key" ON "Matricula"("estudianteId");

-- CreateIndex
CREATE UNIQUE INDEX "Programa_nombre_key" ON "Programa"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "_CursoToMatricula_AB_unique" ON "_CursoToMatricula"("A", "B");

-- CreateIndex
CREATE INDEX "_CursoToMatricula_B_index" ON "_CursoToMatricula"("B");

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "Periodo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_programaId_fkey" FOREIGN KEY ("programaId") REFERENCES "Programa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "Estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matricula" ADD CONSTRAINT "Matricula_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CursoToMatricula" ADD CONSTRAINT "_CursoToMatricula_A_fkey" FOREIGN KEY ("A") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CursoToMatricula" ADD CONSTRAINT "_CursoToMatricula_B_fkey" FOREIGN KEY ("B") REFERENCES "Matricula"("id") ON DELETE CASCADE ON UPDATE CASCADE;
