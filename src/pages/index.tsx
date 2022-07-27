import type { NextPage } from "next"
import { useState } from "react"
import Form from "../components/Form"
import Header from "../components/Header"
import Spinner from "../components/Spinner"
import Wrapper from "../components/Wrapper"

const Home: NextPage = () => {
  const [searchInput, setSearchInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const submitForm = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch(`/api/query/${searchInput}?page=0`)
      if (res.status !== 200) {
        throw new Error("Error with search input")
      }
      const data = await res.json()
      if (!!data.images) {
        console.log(data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Wrapper>
      <Header />
      <Form
        onSubmit={submitForm}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      {isLoading && <Spinner />}
    </Wrapper>
  )
}

export default Home
