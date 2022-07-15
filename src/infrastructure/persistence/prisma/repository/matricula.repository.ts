import { CreateMatriculaDto } from '@app/dtos/matricula/matricula.dto';
import { EnrollRepositoryPort } from '@domain/matricula/port/persistence/matricula.repository';
import { UpdateEnrollPort } from '@domain/matricula/port/use-case/actualizar.matricula';
import { FindEnrollPort } from '@domain/matricula/port/use-case/obtener.matricula';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { Inject } from '@nestjs/common';
import { Matricula, Prisma } from '@prisma/client';
import { createPaginator, PaginatedResult } from 'prisma-pagination';

export class EnrollRepository implements EnrollRepositoryPort {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  private paginate = createPaginator({ perPage: 9 });

  async findEnroll({
    page,
  }: FindEnrollPort): Promise<PaginatedResult<Matricula>> {
    return this.paginate<Matricula, Prisma.MatriculaFindManyArgs>(
      this.prismaService.matricula,
      {
        include: {
          estudiante: true,
        },
      },
      { page },
    );
  }

  async findEnrollById(id: number): Promise<Matricula> {
    return this.prismaService.matricula.findUnique({
      where: { id },
      include: {
        estudiante: true,
        cursos: {
          include: {
            periodo: true,
            programa: true,
          },
        },
      },
    });
  }

  storeEnroll({
    estudianteId,
    cursosIds,
  }: CreateMatriculaDto): Promise<Matricula> {
    const courses = cursosIds.map((course) => ({
      id: course,
    }));
    return this.prismaService.matricula.create({
      data: {
        estudianteId,
        cursos: {
          connect: courses,
        },
      },
      include: {
        estudiante: true,
        cursos: {
          include: {
            periodo: true,
            programa: true,
          },
        },
      },
    });
  }

  updateEnroll({ id, data }: UpdateEnrollPort): Promise<Matricula> {
    const courses = data.cursosIds.map((course) => ({
      id: course,
    }));
    return this.prismaService.matricula.update({
      where: { id },
      data: { cursos: { set: courses } },
      include: {
        cursos: true,
      },
    });
  }

  deleteEnroll(id: number): Promise<Matricula> {
    return this.prismaService.matricula.delete({
      where: { id },
      include: {
        estudiante: {
          select: {
            nombres: true,
            apellidos: true,
          },
        },
      },
    });
  }
}
