/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';

@WebSocketGateway({ namespace: 'dashboard' })
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async handleConnection(client: Socket) {
    const accounting = await this.prismaService.curso.count({
      where: { programaId: 1 },
    });
    const nursing = await this.prismaService.curso.count({
      where: { programaId: 2 },
    });
    const students = await this.prismaService.estudiante.count({
      where: { estadoId: 1 },
    });
    const graduated = await this.prismaService.estudiante.count({
      where: { estadoId: 2 },
    });

    const enrolls = await this.prismaService.matricula.findMany({});

    const notEnrolls = await this.prismaService.estudiante.findMany({
      where: {
        estadoId: 1,
        id: { notIn: enrolls.map((enroll) => enroll.estudianteId) },
      },
    });

    this.server.emit('courses-by-program', {
      contabilidad: accounting,
      enfermeria: nursing,
    });
    this.server.emit('all-students', {
      estudiantes: students,
      graduados: graduated,
    });
    this.server.emit('enrolls', {
      matriculados: enrolls.length,
      sinMatricula: notEnrolls.length,
    });
  }

  @SubscribeMessage('new-course')
  async newCurso() {
    const accounting = await this.prismaService.curso.count({
      where: { programaId: 1 },
    });
    const nursing = await this.prismaService.curso.count({
      where: { programaId: 2 },
    });
    this.server.emit('courses-by-program', {
      contabilidad: accounting,
      enfermeria: nursing,
    });
  }

  @SubscribeMessage('delete-course')
  async deleteCurso() {
    const accounting = await this.prismaService.curso.count({
      where: { programaId: 1 },
    });
    const nursing = await this.prismaService.curso.count({
      where: { programaId: 2 },
    });
    this.server.emit('courses-by-program', {
      contabilidad: accounting,
      enfermeria: nursing,
    });
  }

  @SubscribeMessage('new-student')
  async newStudent() {
    const students = await this.prismaService.estudiante.count({
      where: { estadoId: 1 },
    });
    const graduated = await this.prismaService.estudiante.count({
      where: { estadoId: 2 },
    });
    this.server.emit('all-students', {
      estudiantes: students,
      graduados: graduated,
    });
  }

  @SubscribeMessage('delete-student')
  async deleteStudent() {
    const students = await this.prismaService.estudiante.count({
      where: { estadoId: 1 },
    });
    const graduated = await this.prismaService.estudiante.count({
      where: { estadoId: 2 },
    });
    this.server.emit('all-students', {
      estudiantes: students,
      graduados: graduated,
    });
  }

  @SubscribeMessage('new-enroll')
  async newEnroll() {
    const enrolls = await this.prismaService.matricula.findMany({});

    const notEnrolls = await this.prismaService.estudiante.findMany({
      where: {
        estadoId: 1,
        id: { notIn: enrolls.map((enroll) => enroll.estudianteId) },
      },
    });
    this.server.emit('enrolls', {
      matriculados: enrolls.length,
      sinMatricula: notEnrolls.length,
    });
  }

  @SubscribeMessage('delete-enroll')
  async deleteEnroll() {
    const enrolls = await this.prismaService.matricula.findMany({});

    const notEnrolls = await this.prismaService.estudiante.findMany({
      where: {
        estadoId: 1,
        id: { notIn: enrolls.map((enroll) => enroll.estudianteId) },
      },
    });
    this.server.emit('enrolls', {
      matriculados: enrolls.length,
      sinMatricula: notEnrolls.length,
    });
  }
}
