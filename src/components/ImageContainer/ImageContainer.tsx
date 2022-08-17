import Image from "next/image"
import { ImageContainerPropTypes } from "./ImageContainer.types"
import styles from "./ImageContainer.module.scss"
import { useState } from "react"
import Spinner from "../Spinner"

const ImageContainer: React.FC<ImageContainerPropTypes> = ({ imageData }) => {
  const [imageLoading, setImageLoading] = useState(true)

  return (
    <div className={styles.imageWrapper}>
      {imageLoading && (
        <div className={styles.loader}>
          <Spinner />
        </div>
      )}
      <a href={imageData.parentPage} target="_blank" rel="noreferrer">
        <div className={styles.imageDescription}>{imageData.description}</div>
        <div className={styles.imageCard}>
          <Image
            src={imageData.thumbnail.url}
            width={imageData.thumbnail.width}
            height={imageData.thumbnail.height}
            alt={imageData.description}
            quality={100}
            objectFit="cover"
            onLoadingComplete={() => {
              setImageLoading(false)
            }}
            className={styles.image}
          />
        </div>
      </a>
    </div>
  )
}

export default ImageContainer
