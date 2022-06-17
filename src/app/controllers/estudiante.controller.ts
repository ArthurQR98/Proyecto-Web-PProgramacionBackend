import {
  Body,
  Controller,
  Inject,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StudentTokens } from '@domain/estudiante/token';
import { CreateStudent } from '@use-case/estudiante/crear_estudiante';
import { CreateStudentDto } from '@app/dtos/estudiante/registro.estudiante.dto';

@Controller('student')
export class EstudianteController {
  constructor(
    @Inject(StudentTokens.RegisterStudentUseCase)
    private readonly registerStudent: CreateStudent,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  public async createStudent(@Body() payload: CreateStudentDto, @Res() res) {
    const student = await this.registerStudent.execute(payload);
    res.send({
      code: 201,
      success: true,
      message: 'Registrado correctamente',
      student,
    });
  }
}
