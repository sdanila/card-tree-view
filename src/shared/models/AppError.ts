export class AppError extends Error { }

export interface ICommonError {
  message: string
  code: string
  field: string
}
