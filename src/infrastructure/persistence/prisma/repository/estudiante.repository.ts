import { CreateStudentDto } from '@app/dtos/estudiante/registro.estudiante.dto';
import { StudentRepositoryPort } from '@domain/estudiante/port/persistence/estudiante.repository';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { Inject } from '@nestjs/common';
import * as uniqid from 'uniqid';
import { Estudiante } from '@prisma/client';
import { FindStudentPort } from '@domain/estudiante/port/use-case/obtener-estudiante';

export class StudentRepository implements StudentRepositoryPort {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async findStudents({
    status,
    skip,
    take,
  }: FindStudentPort): Promise<Estudiante[]> {
    return this.prismaService.estudiante.findMany({
      where: {
        estadoId: status,
      },
      include: {
        estado: true,
      },
      skip: take * (skip - 1),
      take,
    });
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

  async storeStudent(payload: CreateStudentDto): Promise<Estudiante> {
    const estado = await this.prismaService.estado.findUnique({
      where: {
        id: payload.estado,
      },
    });
    return this.prismaService.estudiante.create({
      data: {
        ...payload,
        codigo: uniqid.time(null, '-student'),
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
