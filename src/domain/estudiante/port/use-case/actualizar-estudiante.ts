import { CreateStudentDto } from '@app/dtos/estudiante/registro.estudiante.dto';

export interface UpdateStudentPort {
  id: number;
  data: Partial<CreateStudentDto>;
  image: Express.Multer.File;
}
