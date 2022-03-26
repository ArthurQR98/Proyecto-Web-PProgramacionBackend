import { Code } from './code';
import { Nullable } from './common-types';

export class ApiResponse<TData> {
  public readonly code: number;

  public readonly message: string | object;

  public readonly timestamp: number;

  public readonly data: Nullable<TData>;

  private constructor(code: number, message: string | object, data?: TData) {
    this.code = code;
    this.message = message;
    this.data = data || null;
    this.timestamp = Date.now();
  }

  public static success<TData>(
    data?: TData,
    message?: string,
  ): ApiResponse<TData> {
    const resultCode: number = Code.SUCCESS.code;
    const resultMessage: string = message || Code.SUCCESS.message;

    return new ApiResponse(resultCode, resultMessage, data);
  }

  public static error<TData>(
    code?: number,
    message?: string | object,
    data?: TData,
  ): ApiResponse<TData> {
    const resultCode: number = code || Code.INTERNAL_ERROR.code;
    const resultMessage: string | object =
      message || Code.INTERNAL_ERROR.message;

    return new ApiResponse(resultCode, resultMessage, data);
  }

  public static errorValid<TData>(error: string | object): ApiResponse<TData> {
    const resultCode: number = error['statusCode'] || Code.INTERNAL_ERROR.code;
    const resultMessage: string | object =
      error['message'] || Code.INTERNAL_ERROR.message;
    return new ApiResponse(resultCode, resultMessage);
  }
}
