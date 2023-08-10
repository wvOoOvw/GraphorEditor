import React from 'react'

import { Grid } from '@mui/material'
import { Divider } from '@mui/material'
import { IconButton } from '@mui/material'
import { Dialog } from '@mui/material'
import { DialogContent } from '@mui/material'
import { Badge } from '@mui/material'

import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'
import HeadsetIcon from '@mui/icons-material/Headset'
import AlarmIcon from '@mui/icons-material/Alarm'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

import Imitation from './utils.imitation'
import { graphElementSearch } from './utils.graph.common'

import { ListenConfig, DispatchConfig, HookConfig } from './View.NavigationTabs.ElementConfig'

function EventModal(props) {
  const { content, onClose } = props

  return <Dialog onClose={onClose} open={true} sx={{ '& .MuiDialog-paper': { width: 520, maxWidth: 'none' } }}>
    <DialogContent>
      <HookConfig currentGraphContent={content} defaultExpanded={true} />
      <ListenConfig currentGraphContent={content} defaultExpanded={true} />
      <DispatchConfig currentGraphContent={content} defaultExpanded={true} />
    </DialogContent>
  </Dialog>
}

function ItemRender(props) {
  const { license, only, name, children, listen, dispatch, parentOnly, hook } = props

  const { information } = React.useMemo(() => graphElementSearch(license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!information) return null

  const childrenLabel = (value) => information.children.find(i => i.value === value)?.label

  const [hover, setHover] = React.useState(false)
  const handleMouseover = () => {
    setHover(true)
    Imitation.assignState({ navigationTabsElementValue: only })
  }
  const handleMouseout = () => {
    setHover(false)
    Imitation.assignState({ navigationTabsElementValue: undefined })
  }
  const hoverStyle = hover ? { boxShadow: '0 0 8px #e0efff', backgroundColor: '#e0efff' } : {}

  const [childrenVisible, setChildrenVisible] = React.useState(children ? Object.keys(children) : undefined)
  const handleChildrenExpand = (item) => {
    setChildrenVisible(pre => pre.includes(item[0]) ? pre.filter(i => i !== item[0]) : [...pre, item[0]])
  }

  const [eventModal, setEventModal] = React.useState(false)

  const hookNumber = React.useMemo(() => {
    var r = 0
    if (hook.useBeforeRenderHook) r = r + 1
    return r
  })

  return <>
    <div
      style={{ height: 42, fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px', paddingLeft: parentOnly.length * 8 + 8, ...hoverStyle }}
      onMouseOver={handleMouseover}
      onMouseOut={handleMouseout}
    >
      <div style={{ overflow: 'hidden', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{name}</div>
      <div style={{ whiteSpace: 'nowrap' }}>
        {
          listen ?
            <Badge badgeContent={listen.length} color='default' sx={{ '& .MuiBadge-badge': { fontWeight: 'bold' } }}>
              <IconButton size='small' onClick={() => setEventModal(props)}><HeadsetIcon fontSize='small' /></IconButton>
            </Badge> : null
        }
        {
          dispatch ?
            <Badge badgeContent={dispatch.length} color='default' sx={{ '& .MuiBadge-badge': { fontWeight: 'bold' } }}>
              <IconButton size='small' onClick={() => setEventModal(props)}><AlarmIcon fontSize='small' /></IconButton>
            </Badge> : null
        }
        <Badge badgeContent={hookNumber} color='default' sx={{ '& .MuiBadge-badge': { fontWeight: 'bold' } }}>
          <IconButton size='small' onClick={() => setEventModal(props)}><BookmarkBorderIcon fontSize='small' /></IconButton>
        </Badge>
      </div>
    </div >
    {
      children ? Object.entries(children).map((i, index) => {
        return <React.Fragment key={index}>
          <div
            style={{ height: 42, fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px', paddingLeft: parentOnly.length * 8 + 16 }}
          >
            <div style={{ overflow: 'hidden', fontWeight: 'bold', color: 'gray' }}>
              {
                childrenLabel(i[0])
              }
            </div>
            <div style={{ whiteSpace: 'nowrap' }}>
              {
                i[1] && i[1].length ?
                  <IconButton color={childrenVisible.includes(i[0]) ? 'primary' : 'default'} onClick={() => handleChildrenExpand(i)}><ExpandCircleDownIcon /></IconButton>
                  : null
              }
            </div>
          </div>
          {
            childrenVisible.includes(i[0]) ? i[1].map(i => <ItemRender key={i.only} {...i} parentOnly={[...parentOnly, only]} />) : null
          }
        </React.Fragment>
      }) : null
    }
    {
      eventModal ? <EventModal content={eventModal} onClose={() => setEventModal(undefined)} /> : null
    }
  </>
}

function App() {
  return <Grid container spacing={2}>
    <Grid item xs={12} style={{ fontWeight: 'bold' }}>元素事件</Grid>
    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      {
        Imitation.state.graphContent.map(i => <ItemRender key={i.only} {...i} parentOnly={[]} />)
      }
    </Grid>
  </Grid>
}

export default App