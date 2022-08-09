import { AiOutlineLoading } from "react-icons/ai"
import styles from "./Spinner.module.scss"
import { SpinnerPropTypes } from "./Spinner.types"

const Spinner: React.FC<SpinnerPropTypes> = ({ loading = true }) => {
  return (
    <div className={styles.spinner}>
      {loading && <AiOutlineLoading size="3ch" />}
    </div>
  )
}

export default Spinner
