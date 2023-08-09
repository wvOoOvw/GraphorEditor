const paginationFilter = (index, paginationSize, paginationPage) => {
  return (index >= paginationSize * (paginationPage - 1)) && (index < paginationSize * paginationPage)
}

function Render(props) {
  const React = window.React
  const { Table, TableBody, TableCell, TableHead, TableContainer, TableRow, Button, Checkbox, Pagination, Paper, Box } = window.MaterialUI

  const { compound, property, listen, dispatch, pure, update } = props

  React.useEffect(() => {
    if (listen && listen.setBody) {
      const remove = listen.setBody(data => {
        property.body = data
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (listen && listen.setHead) {
      const remove = listen.setHead(data => {
        property.head = data
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (listen && listen.setPaginationSize) {
      const remove = listen.setPaginationSize(data => {
        property.paginationSize = data
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (listen && listen.setPaginationPage) {
      const remove = listen.setPaginationPage(data => {
        property.paginationPage = data
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (listen && listen.setSelectClear) {
      const remove = listen.setSelectClear(data => {
        property.selectChecked = []
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onClick = (e, v) => {
    if (dispatch && dispatch.onClick) dispatch.onClick(v, e)
  }

  const onSelect = (e, item) => {
    if (!pure) return
    property.selectChecked = property.selectChecked.includes(item) ? property.selectChecked.filter(i => i !== item) : [...property.selectChecked, item]
    update()
    if (dispatch && dispatch.onSelect) dispatch.onSelect(property.selectChecked, e)
  }

  const selectMultipleChecked = () => {
    if (property.usePagination) {
      var body = property.body.filter((i, index) => paginationFilter(index, property.paginationSize, property.paginationPage))
    } else {
      var body = property.body
    }
    return body.filter(i => property.selectChecked.includes(i)).length === body.length
  }

  const onSelectMultiple = (e) => {
    if (!pure) return

    if (property.usePagination) {
      var body = property.body.filter((i, index) => paginationFilter(index, property.paginationSize, property.paginationPage))
    } else {
      var body = property.body
    }

    if (body.filter(i => property.selectChecked.includes(i)).length === body.length) {
      property.selectChecked = []
      update()
      if (dispatch && dispatch.onSelect) dispatch.onSelect(property.selectChecked, e)
    } else {
      property.selectChecked = body
      update()
      if (dispatch && dispatch.onSelect) dispatch.onSelect(property.selectChecked, e)
    }
  }

  const onPaginationChange = (e, value) => {
    if (!pure) return
    property.selectChecked = []
    property.paginationPage = value
    update()
    if (dispatch && dispatch.onPaginationChange) dispatch.onPaginationChange(property.paginationPage, e)
  }

  return <Box {...compound} component={property.componentPaper ? Paper : null}>
    <TableContainer style={{ height: (property.usePagination && property.paginationComponent) ? `calc(100% - 50px)` : '100%' }}>
      <Table size={property.size} stickyHeader={property.stickyHeader}>
        <TableHead>
          <TableRow>
            {
              property.useSelect && property.selectMultiple ?
                <TableCell>
                  <Checkbox checked={selectMultipleChecked()} onChange={onSelectMultiple} />
                </TableCell> : null
            }
            {
              property.head.map((i, index) => <TableCell key={index}>{i.label}</TableCell>)
            }
            {
              property.useAction ? <TableCell>{property.actionTitle}</TableCell> : null
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            property.body.map((i, index) => {
              if (property.usePagination && !paginationFilter(index, property.paginationSize, property.paginationPage)) return null
              return <TableRow key={index}>
                {
                  property.useSelect ?
                    <TableCell>
                      <Checkbox checked={property.selectChecked.includes(i)} onChange={(e) => onSelect(e, i)} />
                    </TableCell> : null
                }
                {
                  property.head.map((i_, index) => {
                    return <TableCell key={index}>{i[i_.value]}</TableCell>
                  })
                }
                {
                  property.useAction ?
                    <TableCell>
                      <Button variant={property.actionVariant} color={property.actionColor} onClick={(e) => onClick(e, i)}>{property.actionText}</Button>
                    </TableCell> : null
                }
              </TableRow>
            })
          }
        </TableBody>
      </Table>
    </TableContainer>

    {
      property.usePagination && property.paginationComponent ?
        <div style={{ display: 'flex', justifyContent: property.paginationJustifyContent, alignItems: 'center', height: 50 }}>
          <Pagination count={Math.ceil(property.body.length / Number(property.paginationSize))} page={Number(property.paginationPage)} onChange={onPaginationChange} size={property.size} />
        </div> : null
    }
  </Box>
}

export default Render