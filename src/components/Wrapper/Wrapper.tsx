import styles from "./Wrapper.module.scss"
import type { WrapperPropTypes } from "./Wrapper.types"

const Wrapper: React.FC<WrapperPropTypes> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>
}

export default Wrapper
