import React from 'react'

import { Divider } from '@mui/material'
import { Grid } from '@mui/material'
import { IconButton } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'

import AddBusinessIcon from '@mui/icons-material/AddBusiness'

import { deepSearch, hash } from '../utils/common'
import Imitation from '../utils/imitation'

import { defaultOuterAdd } from '../utils/graph.OuterStyle'

import { evalBeforeRenderHook } from '../utils/const'

function App() {
  const [list, setList] = React.useState(Imitation.state.graphElement)

  const [filterType, setFilterType] = React.useState(Imitation.state.graphElement[0].information.type)

  const handleAdd = e => {
    const hash_ = hash()
    const newElement = {
      only: hash_,
      license: e.license.key,
      name: e.information.name
    }
    newElement.hook = {
      useBeforeRenderHook: false,
      beforeRenderHook: evalBeforeRenderHook
    }
    if (e.information.outer) {
      newElement.outer = Object.assign(JSON.parse(JSON.stringify(defaultOuterAdd)), e.information.outer)
      delete newElement.outer.$use
      delete newElement.outer.$nonuse
      if (e.information.outer.$use) {
        Object.keys(newElement.outer).forEach(i => {
          if (!e.information.outer.$use.includes(i)) delete newElement.outer[i]
        })
      }
      if (e.information.outer.$nonuse) {
        Object.keys(newElement.outer).forEach(i => {
          if (e.information.outer.$nonuse.includes(i)) delete newElement.outer[i]
        })
      }
    }
    if (e.information.inner) newElement.inner = JSON.parse(JSON.stringify(e.information.inner))
    if (e.information.listen) newElement.listen = []
    if (e.information.dispatch) newElement.dispatch = []
    if (e.information.children) {
      const c = {}
      e.information.children.forEach(i => c[i.value] = [])
      newElement.children = c
    }

    if (Imitation.state.modalContent) {
      const [only, childrenKey] = Imitation.state.modalContent.split('@')
      const [currentGraphContent, parentGraphContent] = deepSearch(Imitation.state.graphContent, 'only', only)
      currentGraphContent.children[childrenKey].push(newElement)
    }
    if (!Imitation.state.modalContent) {
      Imitation.state.graphContent.push(newElement)
    }
    Imitation.assignState({ graphContentUpdate: hash() })
  }

  return <Grid container spacing={2}>
    <Grid item xs={12} sx={{ fontWeight: 'bold' }}>添加元素</Grid>
    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel>类型筛选</InputLabel>
        <Select value={filterType} label='类型筛选' onChange={e => setFilterType(e.target.value)} >
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
            .filter(i => !filterType || i.information.type === filterType)
            .map(i => {
              return <Grid item xs={6} key={i.information.licenseKey}>
                <div style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.2)', width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 40, padding: '0 8px', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {i.information.name}
                  </div>
                  <div style={{ width: 80, height: 80, margin: 'auto', position: 'relative', overflow: 'hidden' }}>
                    <i.View />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', height: 40, padding: '0 8px' }}>
                    <IconButton onClick={() => handleAdd(i)}><AddBusinessIcon /></IconButton>
                  </div>
                </div>
              </Grid>
            })
        }
      </Grid>
    </Grid>

  </Grid>
}

export default App