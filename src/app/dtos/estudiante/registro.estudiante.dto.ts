import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Sexo } from '@prisma/client';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre es un texto ' })
  nombres: string;

  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @IsString({ message: 'El apellido es un texto ' })
  apellidos: string;

  @IsNotEmpty({ message: 'El dni es obligatorio' })
  @IsString({ message: 'El dni es un texto ' })
  dni: string;

  @IsNotEmpty({ message: 'La dirección es obligatorio' })
  @IsString({ message: 'La dirección es un texto ' })
  direccion: string;

  @IsNotEmpty({ message: 'El sexo es obligatorio' })
  @IsString({ message: 'El sexo es un texto "M" ó "F"' })
  sexo: Sexo;

  @IsNotEmpty({ message: 'El número de celular es obligatorio' })
  @IsString({ message: 'El número de celular es un texto' })
  nroTelefono: string;

  @IsNumber()
  @IsOptional()
  edad: number;

  estado: number;
}
