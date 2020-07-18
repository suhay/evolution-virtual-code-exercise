/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState } from 'react'
import { ApolloProvider } from '@apollo/client'

import SearchBar from './searchbar'
import Properties from './properties'
import Map from './map'
import client from '../graphql/client'

const App = () => {
  const [result, setResult] = useState([])

  return (
    <ApolloProvider client={client}>
      <header
        css={css`
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 99;
          background: #FFF;
        `}
      >
        <SearchBar setResult={setResult} />
      </header>
      <main
        css={css`
          display: flex;
        `}
      >
        <Properties result={result} />
        <Map />
      </main>
    </ApolloProvider>
  )
}

export default App
