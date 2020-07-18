/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'

const propertyNameSearch = gql`
  query Property($filter: [Filter]) {
    Property(filter: $filter, limit: 50) {
      name
      street
      units {
        price
        available
      }
      sales_status
      construction_status
      developer
      floors
    }
  }
`

const SearchBar = ({ setResult }) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const { loading, error, data } = useQuery(propertyNameSearch, {
    variables: { filter: [{ key: 'name', term: search }] },
  })

  useEffect(() => {
    setResult(data?.Property || [])
  }, [data])

  const onChange = (event, value) => {
    setResult([value])
  }

  return (
    <div
      css={css`
        box-shadow: 1px 3px 6px #00000073;
        padding: 10px;
        display: flex;
        justify-content: flex-end;
      `}
    >
      <Autocomplete
        id="asynchronous-demo"
        style={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        clearOnBlur={false}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        options={data?.Property || []}
        loading={loading}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Property"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            onChange={e => setSearch(e.target.value)}
          />
        )}
      />
    </div>
  )
}

export default SearchBar
