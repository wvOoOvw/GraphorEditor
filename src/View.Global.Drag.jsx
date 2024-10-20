import React from 'react'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import MoveDownIcon from '@mui/icons-material/MoveDown'
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox'

import Animation from './View.Component.Animation'

import Imitation from './utils.imitation'
import { getElementAndParentById, hash, deleteArrayItem } from './utils.common'

function App() {
  const [position, setPosition] = React.useState([0, 0])

  const onMouseMove = e => {
    const x = e.pageX
    const y = e.pageY
    setPosition([x, y])
  }

  const onDrop = e => {
    if (Imitation.state.elementDragStart !== undefined && Imitation.state.elementDragEnd !== undefined) {
      if (Imitation.state.elementDragStart && Imitation.state.elementDragEnd && Imitation.state.elementDragStart !== Imitation.state.elementDragEnd) {
        if (Imitation.state.elementDragEnd.includes('@') === true) {
          const [id, childrenKey] = Imitation.state.elementDragEnd.split('@')
          const [currentGraphContent, parentGraphContent] = getElementAndParentById(Imitation.state.graphContent, Imitation.state.elementDragStart)
          const [currentGraphContent_, parentGraphContent_] = getElementAndParentById(Imitation.state.graphContent, id)
          deleteArrayItem(parentGraphContent, currentGraphContent)
          currentGraphContent_.children[childrenKey].push(currentGraphContent)
        }
        if (Imitation.state.elementDragEnd.includes('@') === false) {
          const [currentGraphContent, parentGraphContent] = getElementAndParentById(Imitation.state.graphContent, Imitation.state.elementDragStart)
          const [currentGraphContent_, parentGraphContent_] = getElementAndParentById(Imitation.state.graphContent, Imitation.state.elementDragEnd)
          deleteArrayItem(parentGraphContent, currentGraphContent)
          const index = parentGraphContent_.indexOf(currentGraphContent_)
          parentGraphContent_.splice(index + 1, 0, currentGraphContent)
        }
      }
      Imitation.state.graphContent = Imitation.state.graphContent
      Imitation.state.graphContentUpdate = hash()
    }

    Imitation.state.elementDragStart = undefined
    Imitation.state.elementDragEnd = undefined

    Imitation.dispatch()
  }

  const onTouchMove = e => {
    const x = e.targetTouches[0].pageX
    const y = e.targetTouches[0].pageY
    setPosition([x, y])
  }

  const onTouchEnd = e => {
    if (Imitation.state.elementDragStart !== undefined && Imitation.state.elementDragEnd !== undefined) {
      if (Imitation.state.elementDragStart && Imitation.state.elementDragEnd && Imitation.state.elementDragStart !== Imitation.state.elementDragEnd) {
        if (Imitation.state.elementDragEnd.includes('@') === true) {
          const [id, childrenKey] = Imitation.state.elementDragEnd.split('@')
          const [currentGraphContent, parentGraphContent] = getElementAndParentById(Imitation.state.graphContent, Imitation.state.elementDragStart)
          const [currentGraphContent_, parentGraphContent_] = getElementAndParentById(Imitation.state.graphContent, id)
          deleteArrayItem(parentGraphContent, currentGraphContent)
          currentGraphContent_.children[childrenKey].push(currentGraphContent)
        }
        if (Imitation.state.elementDragEnd.includes('@') === false) {
          const [currentGraphContent, parentGraphContent] = getElementAndParentById(Imitation.state.graphContent, Imitation.state.elementDragStart)
          const [currentGraphContent_, parentGraphContent_] = getElementAndParentById(Imitation.state.graphContent, Imitation.state.elementDragEnd)
          deleteArrayItem(parentGraphContent, currentGraphContent)
          const index = parentGraphContent_.indexOf(currentGraphContent_)
          parentGraphContent_.splice(index + 1, 0, currentGraphContent)
        }
      }
      Imitation.state.graphContent = Imitation.state.graphContent
      Imitation.state.graphContentUpdate = hash()
    }

    Imitation.state.elementDragStart = undefined
    Imitation.state.elementDragEnd = undefined

    Imitation.dispatch()
  }

  React.useEffect(() => {
    if (Imitation.state.elementDragStart === undefined) return null

    if (window.ontouchstart === undefined) {
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)

      return () => {
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
      }
    }

    if (window.ontouchstart !== undefined) {
      window.addEventListener('touchmove', onTouchMove)
      window.addEventListener('touchend', onTouchEnd)

      return () => {
        window.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('touchend', onTouchEnd)
      }
    }

  }, [Imitation.state.elementDragStart, Imitation.state.elementDragEnd])

  if (Imitation.state.elementDragStart === undefined && Imitation.state.elementDragEnd === undefined) return null
  if (Imitation.state.elementDragEnd !== undefined) return <Animation tag={IconButton} restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} variant={Imitation.state.elementDragEnd ? 'contained' : 'outlined'} style={{ minWidth: 0, width: 32, height: 32, position: 'absolute', zIndex: 103, left: position[0] + 8, top: position[1] + 12, color: 'black', transitionDuration: '0.5s', transitionProperty: 'opacity, color, background' }}><MoveToInboxIcon /></Animation>
  if (Imitation.state.elementDragStart !== undefined) return <Animation tag={IconButton} restore={true} animation={[{ opacity: 0 }, { opacity: 1 }]} variant={Imitation.state.elementDragEnd ? 'contained' : 'outlined'} style={{ minWidth: 0, width: 32, height: 32, position: 'absolute', zIndex: 103, left: position[0] + 8, top: position[1] + 12, color: 'black', transitionDuration: '0.5s', transitionProperty: 'opacity, color, background' }}><MoveDownIcon /></Animation>
}

export default Imitation.withBindComponent(App, state => [state.elementDragStart, state.elementDragEnd])