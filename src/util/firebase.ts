import admin from "firebase-admin"
const { getDatabase } = require("firebase-admin/database")

type QueryDataType = {
  searchQuery: string
  timeSearched: string
}

if (!admin.apps.length)
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)
    ),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  })

const saveToDatabase = (refIdentifier: string, data: {}) => {
  const db = getDatabase()
  const ref = db.ref(refIdentifier)
  ref.push(data)
}

export const saveQueryToDatabase = (query: string) => {
  const data: QueryDataType = {
    searchQuery: query,
    timeSearched: new Intl.DateTimeFormat(undefined, {
      timeStyle: "medium",
      dateStyle: "medium",
    }).format(Date.now()),
  }

  saveToDatabase("recent", data)
}
