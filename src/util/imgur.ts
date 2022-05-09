const API_URL = "https://api.imgur.com/3/gallery/search/top"

const myHeaders = new Headers()
myHeaders.append(
  "Authorization",
  `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID || ""}`
)

export type ImageType = {
  type: string
  width: number
  height: number
  size: number
  url: string
  thumbnail?: {
    url: string
    width: number
    height: number
  }
  description: string
  parentPage: string
}

export const queryImage = async (query: string | string[], page?: number) => {
  if (!query) return null

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }

  try {
    const url = `${API_URL}${page ? `/${page}` : ""}?q=${query}`
    const res = await fetch(url, requestOptions)
    const data: ImgurRestApi.Response<ImgurRestApi.GalleryItem[]> =
      await res.json()
    if (!data.success) {
      const error: ImgurRestApi.Error = data.data
      console.error(error.error)
      return null
    }
    return data.data as ImgurRestApi.GalleryItem[]
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else console.error(error)
    return null
  }
}

export const convertImgurType = (
  imgurItem: ImgurRestApi.GalleryItem
): ImageType => {
  let activeImage: ImgurRestApi.Image | ImgurRestApi.GalleryImage

  if (imgurItem.is_album) {
    activeImage = (imgurItem as ImgurRestApi.GalleryAlbum).images[0]
  } else activeImage = imgurItem as ImgurRestApi.GalleryImage
  return {
    type: activeImage.type || "image/",
    width: activeImage.width || 0,
    height: activeImage.height || 0,
    size: activeImage.size || 0,
    url: activeImage.link || "",
    // thumbnail: {
    //   url: string
    //   width: number
    //   height: number
    // }
    description: imgurItem.title || "",
    parentPage: imgurItem.link.replace(/\.[^/.]+$/, "") || "",
  }
}
