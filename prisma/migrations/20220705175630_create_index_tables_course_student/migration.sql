-- CreateIndex
CREATE INDEX "Curso_nombre_idx" ON "Curso"("nombre");

-- CreateIndex
CREATE INDEX "Estudiante_nombres_apellidos_idx" ON "Estudiante"("nombres", "apellidos");
