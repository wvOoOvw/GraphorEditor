import React from 'react'

import { Divider } from '@mui/material'
import { Grid } from '@mui/material'
import { IconButton } from '@mui/material'
import { Paper } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { InputLabel } from '@mui/material'

import AddBusinessIcon from '@mui/icons-material/AddBusiness'

import Imitation from './utils.imitation'
import { deepSearch, hash } from './utils.common'
import { defaultStyleAdd } from './utils.graph.style'
import { evalBeforeRenderHook } from './utils.const'
import { TooltipSX, TextFieldSX, AutocompleteSX, SelectSX } from './utils.mui.sx'

function App() {
  const [list, setList] = React.useState(Imitation.state.graphElement)

  const [filter, setFilter] = React.useState(Imitation.state.graphElement.length > 0 ? Imitation.state.graphElement[0].information.type : undefined)

  const handleAdd = e => {
    const hash_ = hash()
    const newElement = {
      id: hash_,
      license: e.license.key,
      name: e.information.name
    }
    newElement.hook = {
      useBeforeRenderHook: false,
      beforeRenderHook: evalBeforeRenderHook
    }
    if (e.information.style) {
      newElement.style = Object.assign(JSON.parse(JSON.stringify(defaultStyleAdd)), e.information.style)
      delete newElement.style.$use
      delete newElement.style.$nonuse
      if (e.information.style.$use) {
        Object.keys(newElement.style).forEach(i => {
          if (!e.information.style.$use.includes(i)) delete newElement.style[i]
        })
      }
      if (e.information.style.$nonuse) {
        Object.keys(newElement.style).forEach(i => {
          if (e.information.style.$nonuse.includes(i)) delete newElement.style[i]
        })
      }
    }
    if (e.information.property) newElement.property = JSON.parse(JSON.stringify(e.information.property))
    if (e.information.listen) newElement.listen = []
    if (e.information.dispatch) newElement.dispatch = []
    if (e.information.children) {
      const c = {}
      e.information.children.forEach(i => c[i.value] = [])
      newElement.children = c
    }

    if (Imitation.state.navigationTabsElementValue) {
      const [id, childrenKey] = Imitation.state.navigationTabsElementValue.split('@')
      const [currentGraphContent, parentGraphContent] = deepSearch(Imitation.state.graphContent, 'id', id)
      currentGraphContent.children[childrenKey].push(newElement)
    }
    if (!Imitation.state.navigationTabsElementValue) {
      Imitation.state.graphContent.push(newElement)
    }
    Imitation.assignState({ graphContentUpdate: hash() })
  }

  return <Grid container spacing={2}>
    <Grid item xs={12}>Element Shop</Grid>
    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      <FormControl fullWidth {...SelectSX}>
        <InputLabel>Filter</InputLabel>
        <Select {...SelectSX} value={filter} label='Filter' onChange={e => setFilter(e.target.value)} >
          {
            list.map(i => i.information.type).reduce((t, i) => t.includes(i) ? t : [...t, i], []).map(i => {
              return <MenuItem key={i} value={i}>{i}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12}>
      <Grid container spacing={2}>
        {
          list
            .filter(i => !filter || i.information.type === filter)
            .map(i => {
              return <Grid item xs={6} key={i.information.licenseKey}>
                <Paper>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 40, padding: '0 8px', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {i.information.name}
                  </div>
                  <div style={{ width: 80, height: 80, margin: 'auto', position: 'relative', overflow: 'hidden' }}>
                    <i.View />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', height: 40, padding: '0 8px' }}>
                    <IconButton onClick={() => handleAdd(i)}><AddBusinessIcon /></IconButton>
                  </div>
                </Paper>
              </Grid>
            })
        }
      </Grid>
    </Grid>

  </Grid>
}

export default App