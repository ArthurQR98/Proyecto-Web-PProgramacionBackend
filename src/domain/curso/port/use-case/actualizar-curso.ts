import { CreateCourseDto } from '@app/dtos/curso/registro.curso.dto';

export interface UpdateCoursePort {
  id: number;
  data: Partial<CreateCourseDto>;
  image: Express.Multer.File;
}
