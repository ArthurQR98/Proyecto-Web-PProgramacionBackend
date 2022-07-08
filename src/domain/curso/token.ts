export class CourseTokens {
  public static readonly Repository: unique symbol =
    Symbol('COURSE_REPOSITORY');
  public static readonly RegisterCourseUseCase: unique symbol = Symbol(
    'RegisterCourseUseCase',
  );
  public static readonly FindCoursesUseCase: unique symbol =
    Symbol('FindCoursesUseCase');
  public static readonly FindCourseByIdUseCase: unique symbol = Symbol(
    'FindCourseByIdUseCase',
  );
  public static readonly UpdateCourseUseCase: unique symbol = Symbol(
    'UpdateCourseUseCase',
  );
  public static readonly DeleteCourseUseCase: unique symbol = Symbol(
    'DeleteCourseUseCase',
  );
}
