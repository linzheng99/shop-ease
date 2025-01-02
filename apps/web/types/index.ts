import { type AxiosError } from "axios"

export type AxiosCommonError = AxiosError<{
  code: number
  message: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}>
