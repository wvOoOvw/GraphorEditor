import React from 'react'

import { Grid } from '@mui/material'
import { Divider } from '@mui/material'
import { IconButton } from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddIcon from '@mui/icons-material/Add'

import Imitation from './utils.imitation'
import { deepSearch, hash, deleteArrayItem } from './utils.common'
import { graphElementSearch } from './utils.graph.common'

function ItemRender(props) {
  const { license, id, name, children, style, parentId, drag } = props

  const { information } = React.useMemo(() => graphElementSearch(license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!information) return null

  const [childrenVisible, setChildrenVisible] = React.useState(children ? Object.keys(children) : undefined)
  const [eventModal, setEventModal] = React.useState(false)

  const hoverStyle = Imitation.state.elementHover === id ? { boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px' } : {}

  const dragStyle = (move) => {
    return drag.dragMove !== drag.dragStart && drag.dragMove === move ? { boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px' } : {}
  }

  const childrenLabel = (value) => {
    return information.children.find(i => i.value === value)?.label
  }

  const handleChangeVisible = (e) => {
    const [currentGraphContent, parentGraphContent] = deepSearch(Imitation.state.graphContent, 'id', id)
    if (!currentGraphContent.style) return
    currentGraphContent.style.visible = e
    Imitation.assignState({ graphContent: Imitation.state.graphContent, graphContentUpdate: hash() })
  }

  const handleEdit = () => {
    Imitation.assignState({ navigationTabsValue: 'ElementConfig', navigationTabsElementValue: id })
  }

  const handleDelete = () => {
    const [currentGraphContent, parentGraphContent] = deepSearch(Imitation.state.graphContent, 'id', id)
    deleteArrayItem(parentGraphContent, currentGraphContent)
    Imitation.assignState({ graphContent: Imitation.state.graphContent, graphContentUpdate: hash() })
  }

  const handleAdd = (current) => {
    Imitation.assignState({ navigationTabsValue: 'ElementShop', navigationTabsElementValue: id + '@' + current })
  }

  const handleMouseEnter = () => {
    Imitation.assignState({ elementHover: id })
  }

  const handleMouseLeave = () => {
    Imitation.assignState({ elementHover: undefined })
  }

  const handleDragStart = () => {
    drag.setDragStart(id)
  }

  const handleDragEnter = (move) => {
    if (!parentId.includes(drag.dragStart) && id !== drag.dragStart) {
      drag.setDragMove(move)
    } else {
      drag.setDragMove(undefined)
    }
  }

  const handleDragEnd = () => {
    if (drag.dragStart && drag.dragMove && drag.dragStart !== drag.dragMove) {
      if (drag.dragMove.includes('@')) {
        const [id, childrenKey] = drag.dragMove.split('@')
        const [currentGraphContent, parentGraphContent] = deepSearch(Imitation.state.graphContent, 'id', drag.dragStart)
        const [currentGraphContent_, parentGraphContent_] = deepSearch(Imitation.state.graphContent, 'id', id)
        deleteArrayItem(parentGraphContent, currentGraphContent)
        currentGraphContent_.children[childrenKey].push(currentGraphContent)

      } else {
        const [currentGraphContent, parentGraphContent] = deepSearch(Imitation.state.graphContent, 'id', drag.dragStart)
        const [currentGraphContent_, parentGraphContent_] = deepSearch(Imitation.state.graphContent, 'id', drag.dragMove)
        deleteArrayItem(parentGraphContent, currentGraphContent)
        const index = parentGraphContent_.indexOf(currentGraphContent_)
        parentGraphContent_.splice(index + 1, 0, currentGraphContent)
      }
    }
    Imitation.assignState({ graphContent: Imitation.state.graphContent, graphContentUpdate: hash() })
    drag.setDragStart(undefined)
    drag.setDragMove(undefined)
  }

  const handleChildrenExpand = (item) => {
    setChildrenVisible(pre => pre.includes(item[0]) ? pre.filter(i => i !== item[0]) : [...pre, item[0]])
  }

  return <>
    <div
      draggable
      style={{ height: 42, fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px', transition: '0.5s all', paddingLeft: parentId.length * 8 + 8, ...hoverStyle, ...dragStyle(id) }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDragStart={() => handleDragStart()}
      onDragEnd={() => handleDragEnd()}
      onDragEnter={() => handleDragEnter(id)}
    >
      <div style={{ overflow: 'hidden', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{name}</div>
      <div style={{ whiteSpace: 'nowrap' }}>
        {
          style.visible !== undefined ?
            style.visible ?
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
            style={{ height: 42, fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px', paddingLeft: parentId.length * 8 + 16, ...dragStyle(id + '@' + i[0]) }}
            onDragEnter={() => handleDragEnter(id + '@' + i[0])}
          >
            <div style={{ overflow: 'hidden', fontWeight: 'bold', color: 'gray' }}>
              {
                childrenLabel(i[0])
              }
            </div>
            <div style={{ whiteSpace: 'nowrap' }}>
              <IconButton size='small' onClick={() => handleAdd(i[0])}><AddCircleRoundedIcon fontSize='small' /></IconButton>
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
            childrenVisible.includes(i[0]) ? i[1].map(i => <ItemRender key={i.id} {...i} parentId={[...parentId, id]} drag={drag} />) : null
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
    <Grid item xs={12}>Element Overview</Grid>
    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      {
        Imitation.state.graphContent.map(i => <ItemRender key={i.id} {...i} parentId={[]} drag={drag} />)
      }
    </Grid>
  </Grid>
}

export default Imitation.withBindRender(App, state => [state.elementHover])