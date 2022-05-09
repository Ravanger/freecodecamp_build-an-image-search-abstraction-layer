import type { NextApiRequest, NextApiResponse } from "next"
import type { ImageType } from "../../../util/imgur"
import { convertImgurType, queryImage } from "../../../util/imgur"

type ResponseDataType = {
  images: ImageType[]
}

// TODO: Thumbnails

const query = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataType | {}>
) => {
  switch (req.method) {
    case "GET":
      const data = await queryImage(req.query.query)
      if (!data) return res.status(500).json({ error: "Failed to get images" })
      const images = data.map((imgurItem) => convertImgurType(imgurItem))
      return res.status(200).json(images)
    default:
      return res.status(405).json({})
  }
}

export default query
