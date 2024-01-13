import React from 'react'

import { Grid } from '@mui/material'
import { Divider } from '@mui/material'
import { IconButton } from '@mui/material'
import { Badge } from '@mui/material'

import HeadsetIcon from '@mui/icons-material/Headset'
import AlarmIcon from '@mui/icons-material/Alarm'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'

import Imitation from './utils.imitation'
import { searchElement } from './utils.graph.common'

import { EventConfigDialog } from './View.Component.EventDialog'

function ItemRender(props) {
  const { license, id, name, children, monitor, trigger, parentId, hook } = props

  const { information } = React.useMemo(() => searchElement(license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!information) return null

  const [childrenVisible, setChildrenVisible] = React.useState(children ? Object.keys(children) : undefined)
  const [eventConfigDialog, setEventConfigDialog] = React.useState()

  const hoverStyle = (id) => {
    if (Imitation.state.elementHover === undefined) return undefined

    if (Imitation.state.elementHover === id) return { background: Imitation.state.theme.palette.primary.main, color: 'rgba(255, 255, 255, 1)', fill: 'rgba(255, 255, 255, 1)' }
  }

  const childrenLabel = (value) => {
    return information.children.find(i => i.value === value)?.label
  }

  const handleChildrenExpand = (item) => {
    setChildrenVisible(pre => pre.includes(item[0]) ? pre.filter(i => i !== item[0]) : [...pre, item[0]])
  }

  const onMouseOver = (e, id) => {
    Imitation.assignState({ elementHover: id })

    e.stopPropagation()
  }

  return <>
    <div
      style={{ height: 42, fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px', transition: '0.5s all', borderRadius: 4, paddingLeft: parentId.length * 8 + 8, ...hoverStyle(id) }}
      onMouseOver={(e) => onMouseOver(e, id)}
    >
      <div style={{ overflow: 'hidden', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{name}</div>
      <div style={{ whiteSpace: 'nowrap' }}>
        {
          monitor ?
            <Badge badgeContent={monitor.length} color='default' sx={{ '& .MuiBadge-badge': { fontWeight: 'bold' } }}>
              <IconButton size='small' onClick={() => setEventConfigDialog({ element: props, type: 'monitor' })}><HeadsetIcon fontSize='small' style={{ fill: 'inherit', transition: 'none' }} /></IconButton>
            </Badge> : null
        }
        {
          trigger ?
            <Badge badgeContent={trigger.length} color='default' sx={{ '& .MuiBadge-badge': { fontWeight: 'bold' } }}>
              <IconButton size='small' onClick={() => setEventConfigDialog({ element: props, type: 'trigger' })}><AlarmIcon fontSize='small' style={{ fill: 'inherit', transition: 'none' }} /></IconButton>
            </Badge> : null
        }
        <Badge badgeContent={hook.length} color='default' sx={{ '& .MuiBadge-badge': { fontWeight: 'bold' } }}>
          <IconButton size='small' onClick={() => setEventConfigDialog({ element: props, type: 'hook' })}><BookmarkBorderIcon fontSize='small' style={{ fill: 'inherit', transition: 'none' }} /></IconButton>
        </Badge>
      </div>
    </div >
    {
      children ? Object.entries(children).map((i, index) => {
        return <React.Fragment key={index}>
          <div
            style={{ height: 42, fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px', transition: '0.5s all', borderRadius: 4, paddingLeft: parentId.length * 8 + 16, ...hoverStyle(id + '@' + i[0]) }}
            onMouseOver={(e) => onMouseOver(e, id + '@' + i[0])}
          >
            <div style={{ overflow: 'hidden', fontWeight: 'bold', opacity: 0.5 }}>
              {
                childrenLabel(i[0])
              }
            </div>
            <div style={{ whiteSpace: 'nowrap' }}>
              {
                i[1] && i[1].length && childrenVisible.includes(i[0]) ?
                  <IconButton size='small' color={'primary'} onClick={() => handleChildrenExpand(i)}><ExpandCircleDownIcon fontSize='small' style={{ fill: 'inherit', transition: 'none', transform: 'rotate(180deg)' }} /></IconButton>
                  : null
              }
              {
                i[1] && i[1].length && !childrenVisible.includes(i[0]) ?
                  <IconButton size='small' color={'default'} onClick={() => handleChildrenExpand(i)}><ExpandCircleDownIcon fontSize='small' style={{ fill: 'inherit', transition: 'none' }} /></IconButton>
                  : null
              }
            </div>
          </div>
          {
            childrenVisible.includes(i[0]) ? i[1].map(i => <ItemRender key={i.id} {...i} parentId={[...parentId, id]} />) : null
          }
        </React.Fragment>
      }) : null
    }
    {
      eventConfigDialog ? <EventConfigDialog element={eventConfigDialog.element} type={eventConfigDialog.type} onClose={() => setEventConfigDialog(undefined)} /> : null
    }
  </>
}

function App() {
  return <Grid container spacing={2}>
    <Grid item xs={12}>Element Event</Grid>
    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      {
        Imitation.state.graphContent.map(i => <ItemRender key={i.id} {...i} parentId={[]} />)
      }
    </Grid>
  </Grid>
}

export default App