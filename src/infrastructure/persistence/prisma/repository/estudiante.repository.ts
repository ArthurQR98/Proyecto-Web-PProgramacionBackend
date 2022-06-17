import { CreateStudentDto } from '@app/dtos/estudiante/registro.estudiante.dto';
import { StudentRepositoryPort } from '@domain/estudiante/port/persistence/estudiante.repository';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { Inject } from '@nestjs/common';
import * as uniqid from 'uniqid';

export class StudentRepository implements StudentRepositoryPort {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}
  async findStudents() {
    throw new Error('Method not implemented.');
  }
  async findStudentById(id: number) {
    throw new Error('Method not implemented.');
  }
  async storeStudent(payload: CreateStudentDto) {
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
  async updateStudent(payload: Partial<CreateStudentDto>) {
    throw new Error('Method not implemented.');
  }
  async deleteStudent(id: number) {
    throw new Error('Method not implemented.');
  }
}
