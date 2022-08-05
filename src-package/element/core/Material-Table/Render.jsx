const paginationFilter = (index, paginationSize, paginationPage) => {
  return (index >= paginationSize * (paginationPage - 1)) && (index < paginationSize * paginationPage)
}

function Render(props) {
  const React = window.React
  const { Table, TableBody, TableCell, TableHead, TableContainer, TableRow, Button, Checkbox, Pagination, Paper, Box } = window.MaterialUI

  const { compound, inner, listen, dispatch, pure, update } = props

  React.useEffect(() => {
    if (listen && listen.setBody) {
      const remove = listen.setBody(data => {
        inner.body = data
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (listen && listen.setHead) {
      const remove = listen.setHead(data => {
        inner.head = data
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (listen && listen.setPaginationSize) {
      const remove = listen.setPaginationSize(data => {
        inner.paginationSize = data
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (listen && listen.setPaginationPage) {
      const remove = listen.setPaginationPage(data => {
        inner.paginationPage = data
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (listen && listen.setSelectClear) {
      const remove = listen.setSelectClear(data => {
        inner.selectChecked = []
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
    inner.selectChecked = inner.selectChecked.includes(item) ? inner.selectChecked.filter(i => i !== item) : [...inner.selectChecked, item]
    update()
    if (dispatch && dispatch.onSelect) dispatch.onSelect(inner.selectChecked, e)
  }

  const selectMultipleChecked = () => {
    if (inner.usePagination) {
      var body = inner.body.filter((i, index) => paginationFilter(index, inner.paginationSize, inner.paginationPage))
    } else {
      var body = inner.body
    }
    return body.filter(i => inner.selectChecked.includes(i)).length === body.length
  }

  const onSelectMultiple = (e) => {
    if (!pure) return

    if (inner.usePagination) {
      var body = inner.body.filter((i, index) => paginationFilter(index, inner.paginationSize, inner.paginationPage))
    } else {
      var body = inner.body
    }

    if (body.filter(i => inner.selectChecked.includes(i)).length === body.length) {
      inner.selectChecked = []
      update()
      if (dispatch && dispatch.onSelect) dispatch.onSelect(inner.selectChecked, e)
    } else {
      inner.selectChecked = body
      update()
      if (dispatch && dispatch.onSelect) dispatch.onSelect(inner.selectChecked, e)
    }
  }

  const onPaginationChange = (e, value) => {
    if (!pure) return
    inner.selectChecked = []
    inner.paginationPage = value
    update()
    if (dispatch && dispatch.onPaginationChange) dispatch.onPaginationChange(inner.paginationPage, e)
  }

  return <Box {...compound} component={inner.componentPaper ? Paper : null}>
    <TableContainer style={{ height: (inner.usePagination && inner.paginationComponent) ? `calc(100% - 50px)` : '100%' }}>
      <Table size={inner.size} stickyHeader={inner.stickyHeader}>
        <TableHead>
          <TableRow>
            {
              inner.useSelect && inner.selectMultiple ?
                <TableCell>
                  <Checkbox checked={selectMultipleChecked()} onChange={onSelectMultiple} />
                </TableCell> : null
            }
            {
              inner.head.map((i, index) => <TableCell key={index}>{i.label}</TableCell>)
            }
            {
              inner.useAction ? <TableCell>{inner.actionTitle}</TableCell> : null
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            inner.body.map((i, index) => {
              if (inner.usePagination && !paginationFilter(index, inner.paginationSize, inner.paginationPage)) return null
              return <TableRow key={index}>
                {
                  inner.useSelect ?
                    <TableCell>
                      <Checkbox checked={inner.selectChecked.includes(i)} onChange={(e) => onSelect(e, i)} />
                    </TableCell> : null
                }
                {
                  inner.head.map((i_, index) => {
                    return <TableCell key={index}>{i[i_.value]}</TableCell>
                  })
                }
                {
                  inner.useAction ?
                    <TableCell>
                      <Button variant={inner.actionVariant} color={inner.actionColor} onClick={(e) => onClick(e, i)}>{inner.actionText}</Button>
                    </TableCell> : null
                }
              </TableRow>
            })
          }
        </TableBody>
      </Table>
    </TableContainer>

    {
      inner.usePagination && inner.paginationComponent ?
        <div style={{ display: 'flex', justifyContent: inner.paginationJustifyContent, alignItems: 'center', height: 50 }}>
          <Pagination count={Math.ceil(inner.body.length / Number(inner.paginationSize))} page={Number(inner.paginationPage)} onChange={onPaginationChange} size={inner.size} />
        </div> : null
    }
  </Box>
}

export default Render