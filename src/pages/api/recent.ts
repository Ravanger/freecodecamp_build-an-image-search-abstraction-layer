import type { NextApiRequest, NextApiResponse } from "next"

type ResponseDataType = {}

const query = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataType | {}>
) => {
  switch (req.method) {
    case "GET":
      return res.status(200).json({ okay: "okay" })
    default:
      return res.status(405).json({})
  }
}

export default query
