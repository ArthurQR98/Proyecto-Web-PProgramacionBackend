export class StudentTokens {
  public static readonly Repository: unique symbol =
    Symbol('STUDENT_REPOSITORY');
  public static readonly RegisterStudentUseCase: unique symbol = Symbol(
    'RegisterStudentUseCase',
  );
}
