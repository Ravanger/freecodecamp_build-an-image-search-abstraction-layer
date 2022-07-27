import { FiSearch } from "react-icons/fi"
import styles from "./Form.module.scss"
import type { FormPropTypes } from "./Form.types"

const Form: React.FC<FormPropTypes> = ({
  onSubmit,
  searchInput,
  setSearchInput,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className={styles.search}>
        <input
          type="text"
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value)
          }}
        />
        <button onClick={onSubmit}>
          <FiSearch />
        </button>
      </div>
    </form>
  )
}

export default Form
