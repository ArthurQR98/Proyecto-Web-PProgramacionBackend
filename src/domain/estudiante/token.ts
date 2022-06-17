export class StudentTokens {
  public static readonly Repository: unique symbol =
    Symbol('STUDENT_REPOSITORY');
  public static readonly RegisterStudentUseCase: unique symbol = Symbol(
    'RegisterStudentUseCase',
  );
  public static readonly FindStudentsUseCase: unique symbol = Symbol(
    'FindStudentsUseCase',
  );
  public static readonly FindStudentByIdUseCase: unique symbol = Symbol(
    'FindStudentByIdUseCase',
  );
  public static readonly FindStudentByCodeUseCase: unique symbol = Symbol(
    'FindStudentByCodeUseCase',
  );
  public static readonly UpdateStudentUseCase: unique symbol = Symbol(
    'UpdateStudentUseCase',
  );
  public static readonly DeleteStudentUseCase: unique symbol = Symbol(
    'DeleteStudentUseCase',
  );
}
