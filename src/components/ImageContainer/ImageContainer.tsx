import Image from "next/image"
import { ImageContainerPropTypes } from "./ImageContainer.types"
import styles from "./ImageContainer.module.scss"

const ImageContainer: React.FC<ImageContainerPropTypes> = ({ imageData }) => {
  return (
    <div className={styles.imageWrapper}>
      <span>{"..."}</span>
      <a href={imageData.parentPage} target="_blank" rel="noreferrer">
        <Image
          src={imageData.thumbnail.url}
          width={imageData.thumbnail.width}
          height={imageData.thumbnail.height}
          alt={imageData.description}
          quality={100}
        />
      </a>
    </div>
  )
}

export default ImageContainer
