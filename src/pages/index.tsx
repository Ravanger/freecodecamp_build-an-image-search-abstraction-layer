import type { NextPage } from "next"
import { useState } from "react"
import Form from "../components/Form"
import Header from "../components/Header"
import ImageGrid from "../components/ImageGrid"
import Spacer from "../components/Spacer"
import Spinner from "../components/Spinner"
import Wrapper from "../components/Wrapper"
import type { ImageType } from "../util/imgur"

const Home: NextPage = () => {
  const [searchInput, setSearchInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<ImageType[]>([])

  const submitForm = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    setIsLoading(true)
    const trimmedInput = searchInput.trim()
    setSearchInput(trimmedInput)
    console.log(searchInput)

    try {
      const res = await fetch(`/api/query/${trimmedInput}?page=0`)
      if (res.status !== 200) {
        throw new Error("Error with search input")
      }
      const data = await res.json()

      if (!!data.images) {
        setImages(data.images)
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
      <Spacer />
      <Spinner loading={isLoading} />
      <Spacer />
      {Array.isArray(images) && <ImageGrid images={images} />}
    </Wrapper>
  )
}

export default Home
