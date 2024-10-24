import type { AxiosResponseHeaders } from 'axios'
import URI from './URI'

class FileFns {
  public bytesToSize(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 B'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  public name(file: File) {
    return file.name
  }

  public createDownloadURL(url: string, fileName: string) {
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileName)
    link.style.visibility = 'hidden'

    document.body.appendChild(link)

    link.click()
    link.remove()

    window.URL.revokeObjectURL(url)
  }

  public downloadBlobFile(data: Blob, headers: AxiosResponseHeaders) {
    const disposition = headers['content-disposition']
    const type = headers['content-type']

    const filename = URI.Decode(disposition.split(`filename*=UTF-8''`)[1])

    if (!filename) {
      return
    }

    const fileNameFormatted = filename.replace(/['"]/g, '').trim()

    const blob = new Blob([data], { type })

    const url = window.URL.createObjectURL(blob)

    this.createDownloadURL(url, fileNameFormatted)
  }
}

export default new FileFns()
