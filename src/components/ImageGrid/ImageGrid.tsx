import ImageContainer from "../ImageContainer"
import { ImageGridPropTypes } from "./ImageGrid.types"
import styles from "./ImageGrid.module.scss"

const ImageGrid: React.FC<ImageGridPropTypes> = ({ images }) => {
  if (!Array.isArray(images)) return null

  return (
    <div className={styles.imageGrid}>
      {images.map((imageData, index) => (
        <ImageContainer
          imageData={imageData}
          key={`${imageData.parentPage}${index}`}
        />
      ))}
    </div>
  )
}

export default ImageGrid
