import type { NextApiRequest, NextApiResponse } from "next"
import type { ImageType } from "../../../util/imgur"
import { convertImgurType, queryImage } from "../../../util/imgur"

type ResponseDataType = {
  images: ImageType[]
}

const query = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataType | {}>
) => {
  switch (req.method) {
    case "GET":
      const query = Array.isArray(req.query.query)
        ? req.query.query[0]
        : req.query.query
      const page = Array.isArray(req.query.page)
        ? req.query.page[0]
        : req.query.page

      const data = await queryImage(query, page)
      if (!data) return res.status(500).json({ error: "Failed to get images" })
      const images = data.map((imgurItem) => convertImgurType(imgurItem))
      return res.status(200).json({ images })
    default:
      return res.status(405).json({})
  }
}

export default query
