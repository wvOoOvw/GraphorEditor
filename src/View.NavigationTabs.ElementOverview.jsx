import React from 'react'

import { Grid } from '@mui/material'
import { Divider } from '@mui/material'
import { IconButton } from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'

import Imitation from './utils.imitation'
import { getElementAndParentById, hash, deleteArrayItem, updateTriggerLink, getElementsAll } from './utils.common'
import { searchElement } from './utils.graph.common'
import { scrollListener } from './utils.common.scrollListener'

function ItemRender(props) {
  const { license, id, name, use, children, style, parentId, drag } = props

  const { information } = React.useMemo(() => searchElement(license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!information) return null

  const mouseDownRef = React.useRef()

  const [childrenVisible, setChildrenVisible] = React.useState(children ? Object.keys(children) : undefined)

  const hoverStyle = (id) => {
    if (Imitation.state.elementHover === undefined) return undefined

    if (Imitation.state.elementHover === id) return { background: Imitation.state.theme.palette.primary.main, color: 'rgba(255, 255, 255, 1)', fill: 'rgba(255, 255, 255, 1)' }
  }

  const dragStartStyle = (id) => {
    if (Imitation.state.elementDragStart === undefined) return undefined

    if (Imitation.state.elementDragStart === id) return { background: Imitation.state.theme.palette.secondary.main, color: 'rgba(255, 255, 255, 1)', fill: 'rgba(255, 255, 255, 1)' }
  }

  const dragEndStyle = (id) => {
    if (Imitation.state.elementDragEnd === undefined) return undefined

    if (Imitation.state.elementDragEnd === id) return { background: Imitation.state.theme.palette.success.main, color: 'rgba(255, 255, 255, 1)', fill: 'rgba(255, 255, 255, 1)' }
  }

  const childrenLabel = (value) => {
    return information.children.find(i => i.value === value)?.label
  }

  const handleChangeUse = (id, value) => {
    const [currentGraphContent, parentGraphContent] = getElementAndParentById(Imitation.state.graphContent, id)
    currentGraphContent.use = value
    Imitation.assignState({ graphContent: Imitation.state.graphContent, graphContentUpdate: hash() })
  }

  const handleEdit = (id) => {
    Imitation.assignState({ navigationTabsValue: 'ElementConfig', elementSelect: id })
  }

  const handleDelete = (id) => {
    const [currentGraphContent, parentGraphContent] = getElementAndParentById(Imitation.state.graphContent, id)
    const elementIds = getElementsAll([currentGraphContent]).map(i => i.id)
    deleteArrayItem(parentGraphContent, currentGraphContent)

    Imitation.state.graphEvent.filter(i => elementIds.includes(i.elementId) === true).forEach(i => updateTriggerLink(Imitation.state.graphContent, i.eventId))
    Imitation.state.graphEvent = Imitation.state.graphEvent.filter(i => elementIds.includes(i.elementId) === false)

    Imitation.assignState({ graphContent: Imitation.state.graphContent, graphContentUpdate: hash(), graphEventUpdate: hash() })
  }

  const handleAdd = (id, area) => {
    Imitation.assignState({ navigationTabsValue: 'ElementShop', elementSelect: id + '@' + area })
  }

  const handleChildrenExpand = (item) => {
    setChildrenVisible(pre => pre.includes(item[0]) ? pre.filter(i => i !== item[0]) : [...pre, item[0]])
  }

  const onMouseOver = (e, id) => {
    if (Imitation.state.elementDragStart !== undefined) {
      if (parentId.includes(Imitation.state.elementDragStart) === false && id !== Imitation.state.elementDragStart && id.split('@')[0] !== Imitation.state.elementDragStart) {
        Imitation.state.elementDragEnd = id
      }
      if (parentId.includes(Imitation.state.elementDragStart) === true || id === Imitation.state.elementDragStart || id.split('@')[0] === Imitation.state.elementDragStart) {
        Imitation.state.elementDragEnd = undefined
      }
    }

    if (Imitation.state.elementDragStart === undefined) {
      Imitation.state.elementHover = id
    }

    Imitation.dispatch()

    e.stopPropagation()
  }

  const onMouseDown = (e) => {
    mouseDownRef.current = true

    e.stopPropagation()
  }

  const onMouseMove = (e, id) => {
    if (mouseDownRef.current === true) Imitation.assignState({ elementDragStart: id })
  }

  const onMouseUp = (e) => {
    mouseDownRef.current = false
  }

  React.useEffect(() => {
    window.addEventListener('mouseup', onMouseUp)

    return () => window.removeEventListener('mouseup', onMouseUp)
  }, [])

  return <>
    <div
      style={{ height: 42, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px', transition: '0.5s all', borderRadius: 4, paddingLeft: parentId.length * 8 + 8, ...hoverStyle(id), ...dragStartStyle(id), ...dragEndStyle(id) }}
      onMouseDown={(e) => onMouseDown(e, id)}
      onMouseMove={(e) => onMouseMove(e, id)}
      onMouseOver={(e) => onMouseOver(e, id)}
    >
      <div style={{ overflow: 'hidden', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{name}</div>
      <div style={{ whiteSpace: 'nowrap' }}>
        {
          use ?
            <IconButton size='small' onClick={() => handleChangeUse(id, false)}><VisibilityIcon fontSize='small' style={{ fill: 'inherit', transition: 'none' }} /></IconButton>
            :
            <IconButton size='small' onClick={() => handleChangeUse(id, true)}><VisibilityOffIcon fontSize='small' style={{ fill: 'inherit', transition: 'none' }} /></IconButton>
        }
        <IconButton size='small' onClick={() => handleDelete(id)}><DeleteIcon fontSize='small' style={{ fill: 'inherit', transition: 'none' }} /></IconButton>
        <IconButton size='small' onClick={() => handleEdit(id)}><EditIcon fontSize='small' style={{ fill: 'inherit', transition: 'none' }} /></IconButton>
      </div>
    </div>
    {
      children ? Object.entries(children).map((i, index) => {
        return <React.Fragment key={index}>
          <div
            style={{ height: 42, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px', transition: '0.5s all', borderRadius: 4, paddingLeft: parentId.length * 8 + 16, ...hoverStyle(id + '@' + i[0]), ...dragStartStyle(id + '@' + i[0]), ...dragEndStyle(id + '@' + i[0]) }}
            onMouseOver={(e) => onMouseOver(e, id + '@' + i[0])}
            onDragEnter={(e) => onDragEnter(e, id + '@' + i[0])}
          >
            <div style={{ overflow: 'hidden', fontWeight: 'bold', opacity: 0.5 }}>
              {
                childrenLabel(i[0])
              }
            </div>
            <div style={{ whiteSpace: 'nowrap' }}>
              <IconButton size='small' onClick={() => handleAdd(id, i[0])}><AddCircleRoundedIcon fontSize='small' style={{ fill: 'inherit', transition: 'none' }} /></IconButton>
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
  </>
}

function App() {
  const domRef = React.useRef()

  React.useEffect(() => {
    const node = domRef.current.parentNode
    const enable = Imitation.state.elementDragStart !== undefined

    const r = scrollListener(node, enable)

    return () => r()
  }, [Imitation.state.elementDragStart])

  return <Grid container spacing={2} ref={el => domRef.current = el}>
    <Grid item xs={12}>Element Overview</Grid>
    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12} className='font'>
      {
        Imitation.state.graphContent.map(i => <ItemRender key={i.id} {...i} parentId={[]} />)
      }
    </Grid>
  </Grid>
}

export default App