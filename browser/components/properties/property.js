/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const Property = ({ data }) => {
  const { units, name, street, sales_status, construction_status, developer, floors } = data
  const makeClass = /[^a-z0-9]/gi;
  if (!name) return <div />

  let available = 0;

  const { minCost, maxCost } = (units || []).reduce((acc, value) => {
    const price = parseFloat((value.price || '0').replace('$', ''))
    if (acc.minCost === 0) {
      acc.minCost = price
    } else if (acc.minCost > price) {
      acc.minCost = price
    }

    if (acc.maxCost === 0) {
      acc.maxCost = price
    } else if (acc.maxCost < price) {
      acc.maxCost = price
    }

    if (value.available) {
      available++
    }

    return acc
  }, { minCost: 0, maxCost: 0 })

  return (
    <section
      css={css`
        padding: 20px 5px;
        border-bottom: 1px solid #CCC;
        :hover {
          background: rgb(239 242 255);
        }
        transition: all 0.2s ease;
      `}
    >
      <div
        css={css`
          position: relative;
        `}
      >
        <span
          css={css`
            background: #000;
            color: #bc9650;
            position: absolute;
            width: 100px;
            text-align: center;
            padding: 2px 0;
          `}
        >{available === 0 ? 1 : available} Available</span>
        <img src="https://placekitten.com/400/304" />
      </div>
      <h3
        css={css`
          margin: 6px 0;
          font-size: 25px;
          font-weight: bold;
        `}
      >{name}</h3>
      <div
        css={css`
          color: #d3b47d;
          font-weight: bold;
          padding: 3px 0;
        `}
      >{street} &bull; {developer}</div>
      <div
        css={css`
          padding: 4px 0;
          font-weight: bold;
          margin-bottom: 10px;
        `}
      >{minCost > 0 ? `$${minCost.toFixed(2)} - $${maxCost.toFixed(2)} | ` : ``}{`${units.length > 1 ? `${units.length} Units` : `1 Unit`} `} | {floors} Stories</div>
      <div className="tags"><span className={sales_status.toLowerCase().replace(makeClass, '-')}>{sales_status}</span> <span className={construction_status.toLowerCase().replace(makeClass, '-')}>{construction_status}</span></div>
    </section>
  )
}

export default Property