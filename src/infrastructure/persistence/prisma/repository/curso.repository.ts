import { CreateCourseDto } from '@app/dtos/curso/registro.curso.dto';
import { CourseRepositoryPort } from '@domain/curso/port/persistence/curso.repository';
import { FindCoursePort } from '@domain/curso/port/use-case/obtener-curso';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { Inject } from '@nestjs/common';
import { Curso, Prisma } from '@prisma/client';
import { createPaginator, PaginatedResult } from 'prisma-pagination';

export class CourseRepository implements CourseRepositoryPort {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  private paginate = createPaginator({ perPage: 9 });

  async findCourses({
    periodo,
    programa,
    page,
    search,
  }: FindCoursePort): Promise<PaginatedResult<Curso>> {
    const prog = await this.prismaService.programa.findUnique({
      where: { id: programa },
    });
    const peri = await this.prismaService.periodo.findUnique({
      where: { id: periodo },
    });
    return this.paginate<Curso, Prisma.CursoFindManyArgs>(
      this.prismaService.curso,
      {
        where: {
          nombre: {
            contains: search,
            mode: 'insensitive', //filtering is case-sensitive.
          },
          programa: prog,
          periodo: peri,
        },
        include: {
          periodo: true,
          programa: true,
        },
      },
      { page },
    );
  }

  async findCourseById(id: number): Promise<Curso> {
    return this.prismaService.curso.findUnique({
      where: {
        id,
      },
      include: {
        programa: true,
        periodo: true,
      },
    });
  }

  async storeCourse(payload): Promise<Curso> {
    const prog = await this.prismaService.programa.findUnique({
      where: { id: payload.programa },
    });
    const peri = await this.prismaService.periodo.findUnique({
      where: { id: payload.periodo },
    });
    return this.prismaService.curso.create({
      data: {
        ...payload,
        programa: {
          connect: {
            id: prog.id,
          },
        },
        periodo: {
          connect: {
            id: peri.id,
          },
        },
      },
      include: {
        programa: true,
        periodo: true,
      },
    });
  }

  async updateCourse(
    id: number,
    payload: Partial<CreateCourseDto>,
  ): Promise<Curso> {
    let programa;
    let periodo;
    if (payload.periodo) {
      periodo = await this.prismaService.periodo.findUnique({
        where: {
          id: payload.periodo,
        },
      });
    }
    if (payload.programa) {
      programa = await this.prismaService.programa.findUnique({
        where: {
          id: payload.programa,
        },
      });
    }
    return this.prismaService.curso.update({
      where: {
        id,
      },
      data: {
        ...payload,
        periodo: {
          connect: {
            id: periodo.id,
          },
        },
        programa: {
          connect: {
            id: programa.id,
          },
        },
      },
    });
  }

  async deleteCourse(id: number): Promise<Partial<Curso>> {
    return this.prismaService.curso.delete({
      where: { id },
      select: { nombre: true },
    });
  }
}
