import { CreateStudentDto } from '@app/dtos/estudiante/registro.estudiante.dto';
import { StudentRepositoryPort } from '@domain/estudiante/port/persistence/estudiante.repository';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { Inject } from '@nestjs/common';
import * as uniqid from 'uniqid';
import { Estudiante, Prisma } from '@prisma/client';
import { FindStudentPort } from '@domain/estudiante/port/use-case/obtener-estudiante';
import { createPaginator, PaginatedResult } from 'prisma-pagination';

export class StudentRepository implements StudentRepositoryPort {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  private paginate = createPaginator({ perPage: 9 });

  async findStudents({
    status,
    search,
    page,
  }: FindStudentPort): Promise<PaginatedResult<Estudiante>> {
    return this.paginate<Estudiante, Prisma.EstudianteFindManyArgs>(
      this.prismaService.estudiante,
      {
        where: {
          OR: [
            {
              nombres: {
                contains: search,
                mode: 'insensitive', //filtering is case-sensitive.
              },
            },
            {
              apellidos: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              codigo: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
          estadoId: status,
        },
        include: {
          estado: true,
        },
      },
      { page },
    );
  }

  async findStudentById(id: number): Promise<Estudiante> {
    return this.prismaService.estudiante.findUnique({
      where: {
        id,
      },
      include: {
        estado: true,
      },
    });
  }

  async findStudentByCode(code: string): Promise<Estudiante> {
    return this.prismaService.estudiante.findUnique({
      where: {
        codigo: code,
      },
      include: {
        estado: true,
      },
    });
  }

  async storeStudent(payload): Promise<Estudiante> {
    const estado = await this.prismaService.estado.findUnique({
      where: {
        id: payload.estado,
      },
    });
    return this.prismaService.estudiante.create({
      data: {
        ...payload,
        codigo: uniqid.time(null, '-st'),
        estado: {
          connect: {
            id: estado.id,
          },
        },
      },
    });
  }

  async updateStudent(
    id: number,
    payload: Partial<CreateStudentDto>,
  ): Promise<Estudiante> {
    let estado;
    if (payload.estado) {
      estado = await this.prismaService.estado.findUnique({
        where: {
          id: payload.estado,
        },
      });
    }
    return this.prismaService.estudiante.update({
      where: {
        id,
      },
      data: {
        ...payload,
        estado: {
          connect: {
            id: estado.id,
          },
        },
      },
    });
  }

  async deleteStudent(id: number): Promise<Partial<Estudiante>> {
    return this.prismaService.estudiante.delete({
      where: { id },
      select: { nombres: true, apellidos: true, codigo: true },
    });
  }
}
