import { type AxiosError } from "axios"

export type AxiosCommonResponse<T> = {
  data: T
  message: string
  code: number
}

export type AxiosCommonError = AxiosError<{
  code: number
  message: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}>
