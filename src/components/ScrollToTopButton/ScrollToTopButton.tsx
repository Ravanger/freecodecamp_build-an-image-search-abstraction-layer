import styles from "./ScrollToTopButton.module.scss"
import { FiChevronUp } from "react-icons/fi"
import { useEffect, useState } from "react"
import classNames from "classnames"

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    document.addEventListener("scroll", toggleVisibility)
    return () => {
      document.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  return (
    <button
      className={classNames(styles.scrollToTop, isVisible && styles.showButton)}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }}>
      <FiChevronUp size="3ch" />
    </button>
  )
}

export default ScrollToTopButton
