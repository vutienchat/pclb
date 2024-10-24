export type HttpResponse<D = any> = {
  responseData: D | null
  responseMessage: string | null
  responseCode: string | null
}
export type HttpErrorResponse<D = any> = {
  responseData: D | null
  responseMessage: string | null
  responseCode: string | null
}

export type HttpPaginationResponse<D = any> = {
  responseData: {
    content: D[]
    empty: boolean
    first: boolean
    last: boolean
    number: number
    numberOfElements: number
    size: number
    totalElements: number
    totalPages: number
  }
  responseMessage: string | null
  responseCode: string | null
}
