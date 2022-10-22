export class EnrollTokens {
  public static readonly Repository: unique symbol =
    Symbol('ENROLL_REPOSITORY');
  public static readonly RegisterEnrollUseCase: unique symbol = Symbol(
    'RegisterEnrollUseCase',
  );
  public static readonly FindEnrollsUseCase: unique symbol =
    Symbol('FindEnrollsUseCase');
  public static readonly UpdateEnrollUseCase: unique symbol = Symbol(
    'UpdateEnrollUseCase',
  );
  public static readonly ReportEnrollUseCase: unique symbol = Symbol(
    'ReportEnrollUseCase',
  );
  public static readonly ReportEnrollByProgramUseCase: unique symbol = Symbol(
    'ReportEnrollByProgramUseCase',
  );
  public static readonly DeleteEnrollUseCase: unique symbol = Symbol(
    'DeleteEnrollUseCase',
  );
}
