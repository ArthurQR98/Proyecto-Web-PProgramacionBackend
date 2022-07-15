export type ModelData = {
  estudiante: Estudiante;
  fecha: Date;
  cursos: Curso[];
};

type Estudiante = {
  nombres: string;
  apellidos: string;
};

type Curso = {
  nombre: string;
  creditos: number;
  nHoras: number;
  nDocente: string;
  periodoId: number;
  programaId: number;
  programa: Programa;
};

type Programa = {
  nombre: string;
};
