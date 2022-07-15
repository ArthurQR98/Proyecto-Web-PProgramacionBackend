import { CreateMatriculaDto } from '@app/dtos/matricula/matricula.dto';

export interface UpdateEnrollPort {
  id: number;
  data: Partial<CreateMatriculaDto>;
}
