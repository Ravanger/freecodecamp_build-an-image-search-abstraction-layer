export type PagesPropTypes = {
  page: number
  prevPage: () => void
  nextPage: () => void
  prevPageAvailable: boolean
  nextPageAvailable: boolean
}
