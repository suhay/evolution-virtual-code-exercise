/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import Property from './property'

const Properties = ({ result }) => {
  if (!result) return <div/>
  if (result && !result.length) return <div/>

  return (
    <aside 
      css={css`
        flex: 0 1 400px;
        border-right: 1px solid #CCC;
        padding: 15px 0 10px;
      `}
    >
      <span>Showing {result.length} Results</span>
      {result.map((prop, i) => <Property key={i} data={prop} />)}
    </aside>
  )
}

export default Properties
