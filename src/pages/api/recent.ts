import type { NextApiRequest, NextApiResponse } from "next"
import { loadRecentQueriesFromDatabase } from "../../util/firebase"

type ResponseDataType = {}

const query = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataType | {}>
) => {
  switch (req.method) {
    case "GET":
      const data = await loadRecentQueriesFromDatabase("recent")
      return res.status(200).json(data)
    default:
      return res.status(405).json({})
  }
}

export default query
