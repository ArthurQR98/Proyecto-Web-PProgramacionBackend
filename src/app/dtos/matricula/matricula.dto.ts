import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMatriculaDto {
  @IsNumber({}, { message: 'El id del estudiante debe ser un número' })
  @IsNotEmpty({ message: 'El estudiante es obligatorio' })
  estudianteId: number;

  @IsNumber({}, { each: true })
  cursosIds: number[];
}
