import React from 'react'

import { Grid } from '@mui/material'
import { Divider } from '@mui/material'
import { IconButton } from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'

import Imitation from './utils.imitation'
import { deepSearch, hash, deleteArrayItem } from './utils.common'
import { graphElementSearch } from './utils.graph.common'

function ItemRender(props) {
  const { license, only, name, children, outer, parentOnly, drag } = props

  const { information } = React.useMemo(() => graphElementSearch(license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!information) return null

  const childrenLabel = (value) => information.children.find(i => i.value === value)?.label

  const handleChangeVisible = (e) => {
    const [currentGraphContent, parentGraphContent] = deepSearch(Imitation.state.graphContent, 'only', only)
    if (!currentGraphContent.outer) return
    currentGraphContent.outer.visible = e
    Imitation.assignState({ graphContent: Imitation.state.graphContent, graphContentUpdate: hash() })
  }
  const handleEdit = () => {
    Imitation.assignState({ navigationTabsValue: 'ElementConfig', navigationTabsElementConfigValue: only })
  }
  const handleDelete = () => {
    const [currentGraphContent, parentGraphContent] = deepSearch(Imitation.state.graphContent, 'only', only)
    deleteArrayItem(parentGraphContent, currentGraphContent)
    Imitation.assignState({ graphContent: Imitation.state.graphContent, graphContentUpdate: hash() })
  }

  const handleMouseover = () => {
    Imitation.assignState({ elementHover: only })
  }
  const handleMouseout = () => {
    Imitation.assignState({ elementHover: undefined })
  }
  const hoverStyle = Imitation.state.elementHover === only ? { boxShadow: '0 0 8px #e0efff', backgroundColor: '#e0efff' } : {}

  const handleDragStart = () => drag.setDragStart(only)
  const handleDragEnter = (move) => {
    if (!parentOnly.includes(drag.dragStart) && only !== drag.dragStart) {
      drag.setDragMove(move)
    } else {
      drag.setDragMove(undefined)
    }
  }
  const handleDragEnd = () => {
    if (drag.dragStart && drag.dragMove && drag.dragStart !== drag.dragMove) {
      if (drag.dragMove.includes('@')) {
        const [only, childrenKey] = drag.dragMove.split('@')
        const [currentGraphContent, parentGraphContent] = deepSearch(Imitation.state.graphContent, 'only', drag.dragStart)
        const [currentGraphContent_, parentGraphContent_] = deepSearch(Imitation.state.graphContent, 'only', only)
        deleteArrayItem(parentGraphContent, currentGraphContent)
        currentGraphContent_.children[childrenKey].push(currentGraphContent)

      } else {
        const [currentGraphContent, parentGraphContent] = deepSearch(Imitation.state.graphContent, 'only', drag.dragStart)
        const [currentGraphContent_, parentGraphContent_] = deepSearch(Imitation.state.graphContent, 'only', drag.dragMove)
        deleteArrayItem(parentGraphContent, currentGraphContent)
        const index = parentGraphContent_.indexOf(currentGraphContent_)
        parentGraphContent_.splice(index + 1, 0, currentGraphContent)
      }
    }
    Imitation.assignState({ graphContent: Imitation.state.graphContent, graphContentUpdate: hash() })
    drag.setDragStart(undefined)
    drag.setDragMove(undefined)
  }

  const dragStyle = (move) => {
    return drag.dragMove !== drag.dragStart && drag.dragMove === move ? { boxShadow: '0 0 8px #e6bdff', backgroundColor: '#e6bdff' } : {}
  }

  const [childrenVisible, setChildrenVisible] = React.useState(children ? Object.keys(children) : undefined)
  const handleChildrenExpand = (item) => {
    setChildrenVisible(pre => pre.includes(item[0]) ? pre.filter(i => i !== item[0]) : [...pre, item[0]])
  }

  const [eventModal, setEventModal] = React.useState(false)

  return <>
    <div
      style={{ height: 42, fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px', paddingLeft: parentOnly.length * 8 + 8, ...hoverStyle, ...dragStyle(only) }}
      onMouseOver={handleMouseover}
      onMouseOut={handleMouseout}
      draggable
      onDragStart={() => handleDragStart()}
      onDragEnd={() => handleDragEnd()}
      onDragEnter={() => handleDragEnter(only)}
    >
      <div style={{ overflow: 'hidden', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{name}</div>
      <div style={{ whiteSpace: 'nowrap' }}>
        {
          outer.visible !== undefined ?
            outer.visible ?
              <IconButton size='small' onClick={() => handleChangeVisible(false)}><VisibilityIcon fontSize='small' /></IconButton>
              :
              <IconButton size='small' onClick={() => handleChangeVisible(true)}><VisibilityOffIcon fontSize='small' /></IconButton>
            : null
        }
        <IconButton size='small' onClick={handleDelete}><DeleteIcon fontSize='small' /></IconButton>
        <IconButton size='small' onClick={handleEdit}><EditIcon fontSize='small' /></IconButton>
      </div>
    </div>
    {
      children ? Object.entries(children).map((i, index) => {
        return <React.Fragment key={index}>
          <div
            style={{ height: 42, fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px', paddingLeft: parentOnly.length * 8 + 16, ...dragStyle(only + '@' + i[0]) }}
            onDragEnter={() => handleDragEnter(only + '@' + i[0])}
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
            childrenVisible.includes(i[0]) ? i[1].map(i => <ItemRender key={i.only} {...i} parentOnly={[...parentOnly, only]} drag={drag} />) : null
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
  const [dragStart, setDragStart] = React.useState()
  const [dragMove, setDragMove] = React.useState()

  const drag = { dragStart, dragMove, setDragMove }
  drag.setDragStart = (v) => {
    setDragStart(v)
    Imitation.assignState({ elementHover: undefined })
  }

  return <Grid container spacing={2}>
    <Grid item xs={12} style={{ fontWeight: 'bold' }}>元素预览</Grid>
    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      {
        Imitation.state.graphContent.map(i => <ItemRender key={i.only} {...i} parentOnly={[]} drag={drag} />)
      }
    </Grid>
  </Grid>
}

export default Imitation.withBindRender(App, state => [state.elementHover])