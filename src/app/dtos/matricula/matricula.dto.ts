import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMatriculaDto {
  @IsString({ message: 'El codigo del estudiante debe ser un texto' })
  @IsNotEmpty({ message: 'El estudiante es obligatorio' })
  estudianteCode: string;

  @IsNumber({}, { each: true })
  cursosIds: number[];
}
