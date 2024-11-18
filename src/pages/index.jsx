import React from "react"
import PageWrapper from "../components/PageWrapper"
import Pieces from "../components/Pieces"

import "../styles/index.scss"

const IndexPage = ({ location }) => {
  return (
    <PageWrapper>
      <Pieces location={location} />
    </PageWrapper>
  )
}

export default IndexPage
