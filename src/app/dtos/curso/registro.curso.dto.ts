import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser un texto' })
  nombre: string;

  @IsNotEmpty({ message: 'El número de creditos es obligatorio' })
  @IsNumber({}, { message: 'Los creditos deben ser un número' })
  creditos: number;

  @IsNotEmpty({ message: 'El número de horas es obligatorio' })
  @IsNumber({}, { message: 'El número de horas debe ser un número' })
  nHoras: number;

  @IsNotEmpty({ message: 'El nombre del docente es requerido' })
  @IsString({ message: 'El nombre del docente debe ser un texto' })
  nDocente: string;

  @IsNotEmpty({ message: 'El periodo es requerido' })
  @IsNumber({}, { message: 'El periodo debe ser un número' })
  periodo: number;

  @IsNotEmpty({ message: 'El programa es requerido' })
  @IsNumber({}, { message: 'El programa debe ser un número' })
  programa: number;
}
