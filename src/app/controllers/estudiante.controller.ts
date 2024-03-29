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
  UploadedFile,
  UseInterceptors,
  // UsePipes,
  // ValidationPipe,
} from '@nestjs/common';
import { StudentTokens } from '@domain/estudiante/token';
import { CreateStudent } from '@use-case/estudiante/crear_estudiante';
import { CreateStudentDto } from '@app/dtos/estudiante/registro.estudiante.dto';
import { FindStudents } from '@use-case/estudiante/obtener_estudiante';
import { UpdateStudent } from '@use-case/estudiante/actualizar_estudiante';
import { DeleteStudent } from '@use-case/estudiante/eliminar_estudiante';
import { FileInterceptor } from '@nestjs/platform-express';
import { FindStudentByCode } from '@use-case/estudiante/obtener_estudiantePorCode';

@Controller('student')
export class EstudianteController {
  constructor(
    @Inject(StudentTokens.RegisterStudentUseCase)
    private readonly registerStudent: CreateStudent,
    @Inject(StudentTokens.FindStudentsUseCase)
    private readonly findStudents: FindStudents,
    @Inject(StudentTokens.FindStudentByCodeUseCase)
    private readonly findStudentByCode: FindStudentByCode,
    @Inject(StudentTokens.UpdateStudentUseCase)
    private readonly updateStudent: UpdateStudent,
    @Inject(StudentTokens.DeleteStudentUseCase)
    private readonly deleteStudent: DeleteStudent,
  ) {}

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  public async updatedStudent(
    @Param('id', ParseIntPipe) id,
    @Body() payload: CreateStudentDto,
    @Res() res,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const students = await this.updateStudent.execute({
      id,
      data: payload,
      image,
    });
    res.send({
      code: 200,
      success: true,
      message: 'Actualizado correctamente',
      students,
    });
  }

  @Delete(':id')
  public async deletedStudent(@Param('id', ParseIntPipe) id, @Res() res) {
    const students = await this.deleteStudent.execute(id);
    res.send({
      code: 200,
      success: true,
      message: 'Eliminado correctamente',
      students,
    });
  }

  @Get(':code')
  public async getStudent(@Param('code') id, @Res() res) {
    const student = await this.findStudentByCode.execute(id);
    res.send({
      code: 200,
      success: true,
      student,
    });
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  public async createStudent(
    @Body() payload: CreateStudentDto,
    @Res() res,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const student = await this.registerStudent.execute(image, payload);
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
    @Query('search', new DefaultValuePipe('')) search,
    @Query('page', new DefaultValuePipe(1)) page,
  ) {
    return this.findStudents.execute({
      status,
      search,
      page,
    });
  }
}
