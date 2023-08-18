import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableContainer, TableRow, Button, Checkbox, Pagination, Paper, Box } from '@mui/material'

const paginationFilter = (index, paginationSize, paginationPage) => {
  return (index >= paginationSize * (paginationPage - 1)) && (index < paginationSize * paginationPage)
}

function Render(props) {
  const { event, style, property, monitor, trigger, env, update } = props

  const onClick = (e, v) => {
    if (trigger && trigger.onClick) trigger.onClick(v, e)
  }

  const onSelect = (e, item) => {
    if (env === 'dev') return

    property.selectChecked = property.selectChecked.includes(item) ? property.selectChecked.filter(i => i !== item) : [...property.selectChecked, item]
    update()
    if (trigger && trigger.onSelect) trigger.onSelect(property.selectChecked, e)
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
    if (env === 'dev') return

    if (property.usePagination) {
      var body = property.body.filter((i, index) => paginationFilter(index, property.paginationSize, property.paginationPage))
    } else {
      var body = property.body
    }

    if (body.filter(i => property.selectChecked.includes(i)).length === body.length) {
      property.selectChecked = []
      update()
      if (trigger && trigger.onSelect) trigger.onSelect(property.selectChecked, e)
    } else {
      property.selectChecked = body
      update()
      if (trigger && trigger.onSelect) trigger.onSelect(property.selectChecked, e)
    }
  }

  const onPaginationChange = (e, value) => {
    if (env === 'dev') return

    property.selectChecked = []
    property.paginationPage = value
    update()
    if (trigger && trigger.onPaginationChange) trigger.onPaginationChange(property.paginationPage, e)
  }

  React.useEffect(() => {
    if (monitor && monitor.setBody) {
      const remove = monitor.setBody(data => {
        property.body = data
        update()
      })
      return () => { remove() }
    }
  }, [])
  
  React.useEffect(() => {
    if (monitor && monitor.setHead) {
      const remove = monitor.setHead(data => {
        property.head = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (monitor && monitor.setPaginationSize) {
      const remove = monitor.setPaginationSize(data => {
        property.paginationSize = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (monitor && monitor.setPaginationPage) {
      const remove = monitor.setPaginationPage(data => {
        property.paginationPage = data
        update()
      })
      return () => { remove() }
    }
  }, [])
  
  React.useEffect(() => {
    if (monitor && monitor.setSelectClear) {
      const remove = monitor.setSelectClear(data => {
        property.selectChecked = []
        update()
      })
      return () => { remove() }
    }
  }, [])

  return <Box {...event} component={property.componentPaper ? Paper : null}>
    <TableContainer style={{ height: (property.usePagination && property.paginationComponent) ? `calc(100% - 50px)` : '100%', ...style }}>
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