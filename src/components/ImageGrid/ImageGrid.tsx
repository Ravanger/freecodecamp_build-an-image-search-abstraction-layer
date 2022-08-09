import ImageContainer from "../ImageContainer"
import { ImageGridPropTypes } from "./ImageGrid.types"
import styles from "./ImageGrid.module.scss"

const ImageGrid: React.FC<ImageGridPropTypes> = ({ images }) => {
  return (
    <div className={styles.imageGrid}>
      {images.map((imageData) => (
        <ImageContainer imageData={imageData} key={imageData.parentPage} />
      ))}
    </div>
  )
}

export default ImageGrid
