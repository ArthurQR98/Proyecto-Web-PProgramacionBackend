import { EnrollTokens } from '@domain/matricula/token';
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
import { CreateEnroll } from '@use-case/matricula/crear_matricula';
import { CreateMatriculaDto } from '@app/dtos/matricula/matricula.dto';
import { FindEnroll } from '@use-case/matricula/obtener_matriculas';
import { UpdateEnroll } from '@use-case/matricula/actualizar.matricula';
import { DeleteEnroll } from '@use-case/matricula/eliminar.matricula';
import { GenerateReportEnroll } from '@use-case/matricula/generar.reporte';
import { GenerateReportByProgram } from '@use-case/matricula/generar.reporte.programa';

@Controller('enroll')
export class MatriculaController {
  constructor(
    @Inject(EnrollTokens.RegisterEnrollUseCase)
    private readonly registerEnroll: CreateEnroll,
    @Inject(EnrollTokens.FindEnrollsUseCase)
    private readonly findEnrolls: FindEnroll,
    @Inject(EnrollTokens.UpdateEnrollUseCase)
    private readonly updatedEnroll: UpdateEnroll,
    @Inject(EnrollTokens.DeleteEnrollUseCase)
    private readonly removeEnroll: DeleteEnroll,
    @Inject(EnrollTokens.ReportEnrollUseCase)
    private readonly reportEnroll: GenerateReportEnroll,
    @Inject(EnrollTokens.ReportEnrollByProgramUseCase)
    private readonly reportByProgram: GenerateReportByProgram,
  ) {}

  @Delete(':id')
  public async deleteEnroll(@Param('id', ParseIntPipe) id, @Res() res) {
    const enroll = await this.removeEnroll.execute(id);
    res.send({
      code: 200,
      success: true,
      message: 'Eliminado correctamente',
      enroll,
    });
  }

  @Put(':id')
  public async updateEnroll(
    @Body() payload: CreateMatriculaDto,
    @Param('id', ParseIntPipe) id,
    @Res() res,
  ) {
    const enroll = await this.updatedEnroll.execute({ id, data: payload });
    res.send({
      code: 200,
      success: true,
      message: 'Actualizado correctamente',
      enroll,
    });
  }

  @Post('report/:id')
  public async generateReportEnroll(@Param('id', ParseIntPipe) id, @Res() res) {
    return this.reportEnroll.execute(id, res);
  }

  @Post('report/program/:programId')
  public async generateReportByProgram(
    @Param('programId', ParseIntPipe) id,
    @Res() res,
  ) {
    return this.reportByProgram.execute(id, res);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async createEnroll(@Body() payload: CreateMatriculaDto, @Res() res) {
    const enroll = await this.registerEnroll.execute(payload);
    res.send({
      code: 201,
      success: true,
      message: 'Registrado correctamente',
      enroll,
    });
  }

  @Get()
  public async getEnrolls(@Query('page', new DefaultValuePipe(1)) page) {
    return await this.findEnrolls.execute({ page });
  }
}
