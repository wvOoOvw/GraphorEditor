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

import { MonitorConfig, TriggerConfig, HookConfig } from './View.NavigationTabs.ElementConfig'

function EventDialog(props) {
  const { content, onClose } = props

  return <Dialog onClose={onClose} open={true} sx={{ '& .MuiDialog-paper': { width: 520, maxWidth: 'none' } }} className='font'>
    <DialogContent>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <HookConfig currentGraphElement={content} />
        </Grid>
        <Grid item xs={12}>
          <MonitorConfig currentGraphElement={content} />
        </Grid>
        <Grid item xs={12}>
          <TriggerConfig currentGraphElement={content} />
        </Grid>
      </Grid>
    </DialogContent>
  </Dialog>
}

function ItemRender(props) {
  const { license, id, name, children, monitor, trigger, parentId, hook } = props

  const { information } = React.useMemo(() => graphElementSearch(license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!information) return null

  const [childrenVisible, setChildrenVisible] = React.useState(children ? Object.keys(children) : undefined)
  const [eventDialog, setEventDialog] = React.useState(false)

  const hoverStyle = Imitation.state.elementHover === id ? { boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px' } : {}

  const childrenLabel = (value) => {
    return information.children.find(i => i.value === value)?.label
  }

  const handleMouseEnter = () => {
    Imitation.assignState({ elementHover: id })
  }

  const handleMouseLeave = () => {
    Imitation.assignState({ elementHover: undefined })
  }

  const handleChildrenExpand = (item) => {
    setChildrenVisible(pre => pre.includes(item[0]) ? pre.filter(i => i !== item[0]) : [...pre, item[0]])
  }

  const hookNumber = () => {
    var r = 0
    if (hook.useBeforeRenderHook) r = r + 1
    return r
  }

  return <>
    <div
      style={{ height: 42, fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px', transition: '0.5s all', paddingLeft: parentId.length * 8 + 8, ...hoverStyle }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ overflow: 'hidden', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{name}</div>
      <div style={{ whiteSpace: 'nowrap' }}>
        {
          monitor ?
            <Badge badgeContent={monitor.length} color='default' sx={{ '& .MuiBadge-badge': { fontWeight: 'bold' } }}>
              <IconButton size='small' onClick={() => setEventDialog(props)}><HeadsetIcon fontSize='small' /></IconButton>
            </Badge> : null
        }
        {
          trigger ?
            <Badge badgeContent={trigger.length} color='default' sx={{ '& .MuiBadge-badge': { fontWeight: 'bold' } }}>
              <IconButton size='small' onClick={() => setEventDialog(props)}><AlarmIcon fontSize='small' /></IconButton>
            </Badge> : null
        }
        <Badge badgeContent={hookNumber()} color='default' sx={{ '& .MuiBadge-badge': { fontWeight: 'bold' } }}>
          <IconButton size='small' onClick={() => setEventDialog(props)}><BookmarkBorderIcon fontSize='small' /></IconButton>
        </Badge>
      </div>
    </div >
    {
      children ? Object.entries(children).map((i, index) => {
        return <React.Fragment key={index}>
          <div
            style={{ height: 42, fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px', paddingLeft: parentId.length * 8 + 16 }}
          >
            <div style={{ overflow: 'hidden', fontWeight: 'bold', color: 'gray' }}>
              {
                childrenLabel(i[0])
              }
            </div>
            <div style={{ whiteSpace: 'nowrap' }}>
              {
                i[1] && i[1].length && childrenVisible.includes(i[0]) ?
                  <IconButton size='small' color={'primary'} onClick={() => handleChildrenExpand(i)}><ExpandCircleDownIcon fontSize='small' /></IconButton>
                  : null
              }
              {
                i[1] && i[1].length && !childrenVisible.includes(i[0]) ?
                  <IconButton size='small' color={'default'} onClick={() => handleChildrenExpand(i)}><ExpandCircleDownIcon fontSize='small' /></IconButton>
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
      eventDialog ? <EventDialog content={eventDialog} onClose={() => setEventDialog(undefined)} /> : null
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

export default Imitation.withBindRender(App, state => [state.elementHover])