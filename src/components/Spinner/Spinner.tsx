import { AiOutlineLoading } from "react-icons/ai"
import styles from "./Spinner.module.scss"

const Spinner: React.FC = () => {
  return (
    <div className={styles.spinner}>
      <AiOutlineLoading size="3ch" />
    </div>
  )
}

export default Spinner
