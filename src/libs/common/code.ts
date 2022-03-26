export type CodeDescription = {
  code: number;
  message: string;
};

export class Code {
  public static SUCCESS: CodeDescription = {
    code: 200,
    message: 'Solicitud exitosa',
  };

  public static BAD_REQUEST_ERROR: CodeDescription = {
    code: 400,
    message: 'Solicitud incorrecta',
  };

  public static UNAUTHORIZED_ERROR: CodeDescription = {
    code: 401,
    message: 'No estas autorizado',
  };

  public static WRONG_CREDENTIALS_ERROR: CodeDescription = {
    code: 402,
    message: 'Credenciales incorrectas',
  };

  public static ACCESS_DENIED_ERROR: CodeDescription = {
    code: 403,
    message: 'Acceso denegado',
  };

  public static NOT_FOUND_ERROR: CodeDescription = {
    code: 404,
    message: 'Entidad no encontrada',
  };

  public static INTERNAL_ERROR: CodeDescription = {
    code: 500,
    message: 'Error interno',
  };

  public static ENTITY_NOT_FOUND_ERROR: CodeDescription = {
    code: 1000,
    message: 'Entidad no encontrada',
  };

  public static ENTITY_VALIDATION_ERROR: CodeDescription = {
    code: 1001,
    message: 'Error de validacion de entidad',
  };

  public static USE_CASE_PORT_VALIDATION_ERROR: CodeDescription = {
    code: 1002,
    message: 'Error de validacion de puerto de caso de uso',
  };

  public static VALUE_OBJECT_VALIDATION_ERROR: CodeDescription = {
    code: 1003,
    message: 'Value object validation error.',
  };

  public static ENTITY_ALREADY_EXISTS_ERROR: CodeDescription = {
    code: 400,
    message: 'Entidad ya existe',
  };

  public static FAILED_CONNECT_DATA_SOURCE: CodeDescription = {
    code: 1005,
    message: 'No se puede conectar a la fuente de datos',
  };
}
