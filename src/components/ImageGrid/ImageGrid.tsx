import ImageContainer from "../ImageContainer"
import { ImageGridPropTypes } from "./ImageGrid.types"

const ImageGrid: React.FC<ImageGridPropTypes> = ({ images }) => {
  return (
    <div>
      {images.map((imageData) => (
        <ImageContainer imageData={imageData} key={imageData.parentPage} />
      ))}
    </div>
  )
}

export default ImageGrid
