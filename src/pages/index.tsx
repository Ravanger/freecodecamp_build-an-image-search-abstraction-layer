import type { NextPage } from "next"
import { useEffect, useState, useCallback } from "react"
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
  const updateImages = useCallback(async () => {
    if (!searchInput || Number.isNaN(currentPage) || currentPage < 0) return

    setImages([])
    const trimmedInput = searchInput.trim()
    setSearchInput(trimmedInput)
    try {
      const imageData = await getImageData(trimmedInput, currentPage)
      if (!!imageData) {
        setImages(imageData)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, searchInput])

  useEffect(() => {
    if (!isLoading) return
    updateImages()
  }, [isLoading, updateImages])

  const submitForm = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    setCurrentPage(0)
    setIsLoading(true)
  }

  const prevPage = async () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1
      setCurrentPage(prevPage)
      setIsLoading(true)
    }
  }

  const nextPage = async () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    setIsLoading(true)
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
