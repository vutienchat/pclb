export interface INew {
  id: number
  title: string
  altTitle: string
  imageTagUrl: string
  imagePostUrl: string
  postDate: string
  detailUrl: string
  createdAt: string
}

export interface INewDetail {
  altTitle: string
  contentHtml: string
  createdAt: string
  deleted: false
  detailUrl: string
  id: number
  imagePostUrl: string
  imageTagUrl: string
  postDate: string
  title: string
  updatedAt: string
}
