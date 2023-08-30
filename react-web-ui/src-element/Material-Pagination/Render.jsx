import React from 'react'
import { Pagination } from '@mui/material'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  React.useEffect(() => {
    if (monitor && monitor.setPage) {
      const remove = monitor.setPage(data => {
        property.page = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (monitor && monitor.setCount) {
      const remove = monitor.setCount(data => {
        property.count = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onChange = (e, v) => {
    property.page = v
    update()
    if (trigger && trigger.onChange) trigger.onChange(property.page, e)
  }

  if (env === 'dev') {
    return <Pagination
      {...devParams}
      count={Number(property.count)}
      page={Number(property.page)}
      size={property.size}
      color={property.color}
      shape={property.shape}
      variant={property.variant}
    />
  }

  if (env === 'prod') {
    return <Pagination
      {...devParams}
      count={Number(property.count)}
      page={Number(property.page)}
      onChange={onChange}
      size={property.size}
      color={property.color}
      shape={property.shape}
      variant={property.variant}
    />
  }
}

export default Render