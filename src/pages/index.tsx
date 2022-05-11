import type { NextPage } from "next"
import Header from "../components/Header"
import Input from "../components/Input"
import Wrapper from "../components/Wrapper"

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Header />
      {/* <Input labelText="LabelText" /> */}
    </Wrapper>
  )
}

export default Home
