// export interface EnrollsData {
//   data: Datum[];
// }

// export interface Datum {
//   id: number;
//   estado: string;
//   fecha: string;
//   estudianteId: number;
//   estudiante: Estudiante;
//   cursos: Curso[];
// }

// export interface Curso {
//   id: number;
//   nombre: string;
//   creditos: number;
//   nHoras: number;
//   nDocente: string;
//   url_image: string;
//   key_image: string;
//   periodoId: number;
//   programaId: number;
// }

// export interface Estudiante {
//   id: number;
//   codigo: string;
//   nombres: string;
//   apellidos: string;
//   dni: string;
//   direccion: string;
//   sexo: string;
//   nroTelefono: string;
//   edad: number;
//   url_image: string;
//   key_image: string;
//   estadoId: number;
//   createdAt: string;
//   updatedAt: string;
// }

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
