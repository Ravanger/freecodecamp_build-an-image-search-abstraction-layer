import admin from "firebase-admin"
import { getDatabase } from "firebase-admin/database"

type QueryDataType = {
  _id?: string
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

const loadFromDatabase = async (
  refIdentifier: string
): Promise<Object | null> => {
  const db = getDatabase()
  const ref = db.ref(refIdentifier)
  const data = await ref.once("value")
  return data.toJSON()
}

export const convertFirebaseType = (data: Object | null): QueryDataType[] => {
  if (!data) return []

  const keys = Object.keys(data)
  return Object.values(data).map((value: QueryDataType, index) => {
    return {
      _id: keys[index],
      searchQuery: value.searchQuery,
      timeSearched: value.timeSearched,
    }
  })
}

export const loadRecentQueriesFromDatabase = async (refIdentifier: string) => {
  const data = await loadFromDatabase(refIdentifier)
  return convertFirebaseType(data)
}

export const saveQueryToDatabase = (query?: string) => {
  if (!query || query.length <= 0) return

  const data: QueryDataType = {
    searchQuery: query,
    timeSearched: new Intl.DateTimeFormat(undefined, {
      timeStyle: "medium",
      dateStyle: "medium",
    }).format(Date.now()),
  }

  saveToDatabase("recent", data)
}
