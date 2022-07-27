export type FormPropTypes = {
  onSubmit: (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>
  searchInput: string
  setSearchInput: React.Dispatch<React.SetStateAction<string>>
}
