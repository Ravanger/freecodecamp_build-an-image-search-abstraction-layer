import type { NextPage } from "next"
import { useState } from "react"
import Form from "../components/Form"
import Header from "../components/Header"
import ImageGrid from "../components/ImageGrid"
import Pages from "../components/Pages"
import ScrollToTopButton from "../components/ScrollToTopButton"
import Spacer from "../components/Spacer"
import Spinner from "../components/Spinner"
import Wrapper from "../components/Wrapper"
import { getImageData, ImageType } from "../util/imgur"

const Home: NextPage = () => {
  const [searchInput, setSearchInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<ImageType[]>([])
  const [currentPage, setCurrentPage] = useState(0)

  const updateImages = async (page: number) => {
    if (!searchInput || Number.isNaN(page) || page < 0) return

    setIsLoading(true)
    setImages([])
    const trimmedInput = searchInput.trim()
    setSearchInput(trimmedInput)
    try {
      const imageData = await getImageData(trimmedInput, page)
      if (!!imageData) {
        setImages(imageData)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const submitForm = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    setCurrentPage(0)
    await updateImages(0)
  }

  const prevPage = async () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1
      setCurrentPage(prevPage)
      await updateImages(prevPage)
    }
  }

  const nextPage = async () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    await updateImages(nextPage)
  }

  return (
    <Wrapper>
      <Header />
      <Form
        onSubmit={submitForm}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <Spacer size="0.5rem" />
      <Spinner loading={isLoading} />
      <Spacer size="0.5rem" />
      <Pages
        page={currentPage}
        prevPage={prevPage}
        nextPage={nextPage}
        nextPageAvailable={images.length >= 60}
      />
      <Spacer />
      <ImageGrid images={images} />
      <Spacer size="2rem" />
      <ScrollToTopButton />
    </Wrapper>
  )
}

export default Home
