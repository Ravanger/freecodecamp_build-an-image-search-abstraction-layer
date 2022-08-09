import styles from "./Spacer.module.scss"
import { SpacerPropTypes } from "./Spacer.types"

const defaultProps: SpacerPropTypes = {
  size: "1rem",
  axis: "VERTICAL",
}

const Spacer: React.FC<SpacerPropTypes> = ({ axis, size, className }) => {
  const width = axis === "VERTICAL" ? null : size
  const height = axis === "HORIZONTAL" ? null : size

  return (
    <span
      className={`${styles.spacer} ${className || ""}`}
      style={{
        ...(width && { width: width }),
        ...(height && { height: height }),
      }}
    />
  )
}

Spacer.defaultProps = defaultProps

export default Spacer
