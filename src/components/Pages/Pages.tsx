import { PagesPropTypes } from "./Pages.types"
import styles from "./Pages.module.scss"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

const Pages: React.FC<PagesPropTypes> = ({
  page,
  prevPage,
  nextPage,
  nextPageAvailable,
}) => {
  const prevPageAvailable = page > 0

  if (!prevPageAvailable && !nextPageAvailable) return null

  return (
    <div className={styles.pageSelector}>
      {prevPageAvailable && (
        <button onClick={prevPage}>
          <FiChevronLeft />
        </button>
      )}
      <span>{`${page + 1}`}</span>
      {nextPageAvailable && (
        <button onClick={nextPage}>
          <FiChevronRight />
        </button>
      )}
    </div>
  )
}

export default Pages
