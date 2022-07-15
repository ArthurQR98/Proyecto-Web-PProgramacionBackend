import { CreateCourseDto } from '@app/dtos/curso/registro.curso.dto';
import { CourseTokens } from '@domain/curso/token';
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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateCourse } from '@use-case/curso/actualizar_curso';
import { CreateCourse } from '@use-case/curso/crear_curso';
import { DeleteCourse } from '@use-case/curso/eliminar_curso';
import { FindCourseById } from '@use-case/curso/obtener_cursoPorId';
import { FindCourses } from '@use-case/curso/obtener_cursos';

@Controller('course')
export class CursoController {
  constructor(
    @Inject(CourseTokens.RegisterCourseUseCase)
    private readonly registerCourse: CreateCourse,
    @Inject(CourseTokens.FindCoursesUseCase)
    private readonly findCourses: FindCourses,
    @Inject(CourseTokens.FindCourseByIdUseCase)
    private readonly findCourseById: FindCourseById,
    @Inject(CourseTokens.UpdateCourseUseCase)
    private readonly updateCourse: UpdateCourse,
    @Inject(CourseTokens.DeleteCourseUseCase)
    private readonly deleteCourse: DeleteCourse,
  ) {}

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  public async updatedCourse(
    @Param('id', ParseIntPipe) id,
    @Body() payload: CreateCourseDto,
    @Res() res,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const course = await this.updateCourse.execute({
      id,
      data: payload,
      image,
    });
    res.send({
      code: 200,
      success: true,
      message: 'Actualizado correctamente',
      course,
    });
  }

  @Delete(':id')
  public async deletedCourse(@Param('id', ParseIntPipe) id, @Res() res) {
    const course = await this.deleteCourse.execute(id);
    res.send({
      code: 200,
      success: true,
      message: 'Eliminado correctamente',
      course,
    });
  }

  @Get(':id')
  public async getCourse(@Param('id', ParseIntPipe) id, @Res() res) {
    const course = await this.findCourseById.execute(id);
    res.send({
      code: 200,
      success: true,
      course,
    });
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  public async createCourse(
    @Body() payload: CreateCourseDto,
    @Res() res,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const course = await this.registerCourse.execute(image, payload);
    res.send({
      code: 201,
      success: true,
      message: 'Registrado correctamente',
      course,
    });
  }

  @Get()
  public async students(
    @Query('programa', new DefaultValuePipe(1), ParseIntPipe) programa,
    @Query('periodo', new DefaultValuePipe(1), ParseIntPipe) periodo,
    @Query('search', new DefaultValuePipe('')) search,
    @Query('page', new DefaultValuePipe(1)) page,
  ) {
    return this.findCourses.execute({
      programa,
      periodo,
      search,
      page,
    });
  }
}
