const API_URL = "https://api.imgur.com/3/gallery/search/top"

const headers = new Headers()
headers.append(
  "Authorization",
  `Client-ID ${process.env.IMGUR_CLIENT_ID || ""}`
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

export const queryImage = async (query: string, page?: string) => {
  if (!query) {
    return null
  }

  const requestOptions: RequestInit = {
    method: "GET",
    headers,
    redirect: "follow",
  }

  const pageNumber = page && !Number.isNaN(Number(page)) ? page : "0"

  try {
    const url = `${API_URL}${page ? `/${parseInt(pageNumber)}` : ""}?q=${query}`
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

  let activeImageLink = activeImage.animated
    ? activeImage.mp4 || ""
    : activeImage.link
  activeImageLink = activeImageLink.replace(/^http:\/\//i, "https://")

  const isWider = activeImage.width > activeImage.height
  const thumbnailFactor = isWider
    ? activeImage.width / 160
    : activeImage.height / 160

  return {
    type: activeImage.type || "image/",
    width: activeImage.width || 0,
    height: activeImage.height || 0,
    size: activeImage.size || 0,
    url: activeImageLink,
    thumbnail: {
      url: `${activeImageLink.replace(/(\.[^.]+)$/i, "t.jpg")}`,
      width: isWider ? 160 : Math.round(activeImage.width / thumbnailFactor),
      height: isWider ? Math.round(activeImage.height / thumbnailFactor) : 160,
    },
    description: imgurItem.title || "",
    parentPage: activeImageLink.replace("i.", "").replace(/\.[^/.]+$/, ""),
  }
}
