import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StudentTokens } from '@domain/estudiante/token';
import { CreateStudent } from '@use-case/estudiante/crear_estudiante';
import { CreateStudentDto } from '@app/dtos/estudiante/registro.estudiante.dto';
import { FindStudents } from '@use-case/estudiante/obtener_estudiante';
import { UpdateStudent } from '@use-case/estudiante/actualizar_estudiante';
import { DeleteStudent } from '@use-case/estudiante/eliminar_estudiante';
import { FindStudentById } from '../../use-case/estudiante/obtener_estudiantePorId';

@Controller('student')
export class EstudianteController {
  constructor(
    @Inject(StudentTokens.RegisterStudentUseCase)
    private readonly registerStudent: CreateStudent,
    @Inject(StudentTokens.FindStudentsUseCase)
    private readonly findStudents: FindStudents,
    @Inject(StudentTokens.FindStudentByIdUseCase)
    private readonly findStudentById: FindStudentById,
    @Inject(StudentTokens.UpdateStudentUseCase)
    private readonly updateStudent: UpdateStudent,
    @Inject(StudentTokens.DeleteStudentUseCase)
    private readonly deleteStudent: DeleteStudent,
  ) {}

  @Put(':id')
  public async updatedStudent(
    @Param('id', ParseIntPipe) id,
    @Body() payload: CreateStudentDto,
    @Res() res,
  ) {
    const students = await this.updateStudent.execute({ id, data: payload });
    res.send({
      code: 200,
      success: true,
      students,
    });
  }

  @Delete(':id')
  public async deletedStudent(@Param('id', ParseIntPipe) id, @Res() res) {
    const students = await this.deleteStudent.execute(id);
    res.send({
      code: 200,
      success: true,
      students,
    });
  }

  @Get(':id')
  public async getStudent(@Param('id', ParseIntPipe) id, @Res() res) {
    const students = await this.findStudentById.execute(id);
    res.send({
      code: 200,
      success: true,
      students,
    });
  }

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

  @Get()
  public async students(
    @Query('status', new DefaultValuePipe(1), ParseIntPipe) status,
    @Query('skip', new DefaultValuePipe(1), ParseIntPipe) skip,
    @Query('take', new DefaultValuePipe(20), ParseIntPipe) take,
    @Res() res,
  ) {
    const students = await this.findStudents.execute({
      status,
      skip,
      take,
    });
    res.send({
      code: 200,
      success: true,
      students,
    });
  }
}
