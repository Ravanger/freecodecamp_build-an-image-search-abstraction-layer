import { InputPropTypes } from "./Input.types"

const Input: React.FC<InputPropTypes> = ({ labelText }) => {
  return (
    <label>
      {labelText && <span>{labelText}</span>}
      <input></input>
    </label>
  )
}

export default Input
