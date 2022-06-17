import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Sexo } from '@prisma/client';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser un texto' })
  nombres: string;

  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @IsString({ message: 'El apellido debe ser un texto' })
  apellidos: string;

  @IsNotEmpty({ message: 'El dni es obligatorio' })
  @IsString({ message: 'El dni debe ser un texto' })
  dni: string;

  @IsNotEmpty({ message: 'La dirección es obligatorio' })
  @IsString({ message: 'La dirección debe ser un texto' })
  direccion: string;

  @IsNotEmpty({ message: 'El sexo es obligatorio' })
  @IsString({ message: 'El sexo es un texto "M" ó "F"' })
  sexo: Sexo;

  @IsNotEmpty({ message: 'El número de celular es obligatorio' })
  @IsString({ message: 'El número de celular es un texto' })
  nroTelefono: string;

  @IsNumber({}, { message: 'La edad debe ser un número' })
  @IsOptional()
  edad: number;

  estado: number;
}
