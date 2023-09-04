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
  const { license, id, name, use, children, style, parentId, drag } = props

  const { information } = React.useMemo(() => graphElementSearch(license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!information) return null

  const [childrenVisible, setChildrenVisible] = React.useState(children ? Object.keys(children) : undefined)

  const hoverStyle = (id) => {
    return Imitation.state.elementHover === id ? { boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px' } : {}
  }

  const dragStyle = (id) => {
    return Imitation.state.elementDragEnter !== Imitation.state.elementDragStart && Imitation.state.elementDragEnter === id ? { boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px' } : {}
  }

  const childrenLabel = (value) => {
    return information.children.find(i => i.value === value)?.label
  }

  const handleChangeUse = (e) => {
    const [currentGraphContent, parentGraphContent] = deepSearch(Imitation.state.graphContent, 'id', id)
    currentGraphContent.use = e
    Imitation.assignState({ graphContent: Imitation.state.graphContent, graphContentUpdate: hash() })
  }

  const handleEdit = () => {
    Imitation.assignState({ navigationTabsValue: 'ElementConfig', navigationTabsElementValue: id })
  }

  const handleDelete = () => {
    const [currentGraphContent, parentGraphContent] = deepSearch(Imitation.state.graphContent, 'id', id)
    deleteArrayItem(parentGraphContent, currentGraphContent)
    Imitation.state.graphEvent = Imitation.state.graphEvent.filter(i => i.elementId !== currentGraphContent.id)
    Imitation.assignState({ graphContent: Imitation.state.graphContent, graphContentUpdate: hash() })
  }

  const handleAdd = (current) => {
    Imitation.assignState({ navigationTabsValue: 'ElementShop', navigationTabsElementValue: id + '@' + current })
  }

  const handleChildrenExpand = (item) => {
    setChildrenVisible(pre => pre.includes(item[0]) ? pre.filter(i => i !== item[0]) : [...pre, item[0]])
  }

  const onMouseOver = (e, id) => {
    Imitation.assignState({ elementHover: id })

    e.stopPropagation()
  }

  const onDragStart = (e) => {
    Imitation.assignState({ elementDragStart: id, elementHover: undefined })

    e.stopPropagation()
  }

  const onDragEnter = (e, id) => {
    if (parentId.includes(Imitation.state.elementDragStart) === false && id !== Imitation.state.elementDragStart && id.split('@')[0] !== Imitation.state.elementDragStart) {
      Imitation.assignState({ elementDragEnter: id, elementHover: id })
    }
    if (parentId.includes(Imitation.state.elementDragStart) === true || id === Imitation.state.elementDragStart || id.split('@')[0] === Imitation.state.elementDragStart) {
      Imitation.assignState({ elementDragEnter: undefined, elementHover: undefined })
    }

    e.stopPropagation()
  }

  const onDragEnd = (e) => {
    if (Imitation.state.elementDragStart && Imitation.state.elementDragEnter && Imitation.state.elementDragStart !== Imitation.state.elementDragEnter) {
      if (Imitation.state.elementDragEnter.includes('@')) {
        const [id, childrenKey] = Imitation.state.elementDragEnter.split('@')
        const [currentGraphContent, parentGraphContent] = deepSearch(Imitation.state.graphContent, 'id', Imitation.state.elementDragStart)
        const [currentGraphContent_, parentGraphContent_] = deepSearch(Imitation.state.graphContent, 'id', id)
        deleteArrayItem(parentGraphContent, currentGraphContent)
        currentGraphContent_.children[childrenKey].push(currentGraphContent)

      } else {
        const [currentGraphContent, parentGraphContent] = deepSearch(Imitation.state.graphContent, 'id', Imitation.state.elementDragStart)
        const [currentGraphContent_, parentGraphContent_] = deepSearch(Imitation.state.graphContent, 'id', Imitation.state.elementDragEnter)
        deleteArrayItem(parentGraphContent, currentGraphContent)
        const index = parentGraphContent_.indexOf(currentGraphContent_)
        parentGraphContent_.splice(index + 1, 0, currentGraphContent)
      }
    }
    Imitation.assignState({ elementDragStart: undefined, elementDragEnter: undefined, graphContent: Imitation.state.graphContent, graphContentUpdate: hash() })

    e.stopPropagation()
  }

  return <>
    <div
      draggable
      style={{ height: 42, fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px', transition: '0.5s all', margin: '1px 0', paddingLeft: parentId.length * 8 + 8, ...hoverStyle(id), ...dragStyle(id) }}
      onMouseOver={(e) => onMouseOver(e, id)}
      onDragStart={(e) => onDragStart(e)}
      onDragEnd={(e) => onDragEnd(e)}
      onDragEnter={(e) => onDragEnter(e, id)}
    >
      <div style={{ overflow: 'hidden', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{name}</div>
      <div style={{ whiteSpace: 'nowrap' }}>
        {
          use ?
            <IconButton size='small' onClick={() => handleChangeUse(false)}><VisibilityIcon fontSize='small' /></IconButton>
            :
            <IconButton size='small' onClick={() => handleChangeUse(true)}><VisibilityOffIcon fontSize='small' /></IconButton>
        }
        <IconButton size='small' onClick={handleDelete}><DeleteIcon fontSize='small' /></IconButton>
        <IconButton size='small' onClick={handleEdit}><EditIcon fontSize='small' /></IconButton>
      </div>
    </div>
    {
      children ? Object.entries(children).map((i, index) => {
        return <React.Fragment key={index}>
          <div
            style={{ height: 42, fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1px 0', padding: '0 8px', paddingLeft: parentId.length * 8 + 16, ...hoverStyle(id + '@' + i[0]), ...dragStyle(id + '@' + i[0]) }}
            onMouseOver={(e) => onMouseOver(e, id + '@' + i[0])}
            onDragEnter={(e) => onDragEnter(e, id + '@' + i[0])}
          >
            <div style={{ overflow: 'hidden', fontWeight: 'bold', opacity: 0.5 }}>
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
            childrenVisible.includes(i[0]) ? i[1].map(i => <ItemRender key={i.id} {...i} parentId={[...parentId, id]} />) : null
          }
        </React.Fragment>
      }) : null
    }
  </>
}

function App() {
  return <Grid container spacing={2}>
    <Grid item xs={12}>Element Overview</Grid>
    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      {
        Imitation.state.graphContent.map(i => <ItemRender key={i.id} {...i} parentId={[]} />)
      }
    </Grid>
  </Grid>
}

export default App