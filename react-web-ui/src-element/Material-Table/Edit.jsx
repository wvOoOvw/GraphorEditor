import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { Switch } from '@mui/material'
import { Dialog } from '@mui/material'
import { DialogActions } from '@mui/material'
import { DialogContent } from '@mui/material'
import { Button } from '@mui/material'
import { Table } from '@mui/material'
import { TableBody } from '@mui/material'
import { TableCell } from '@mui/material'
import { TableHead } from '@mui/material'
import { TableRow } from '@mui/material'
import { Divider } from '@mui/material'

function Edit(props) {
  const { element, property, style, update, component, sx, sendMessage } = props

  const [headDialog, setHeadDialog] = React.useState(false)
  const [bodyDialog, setBodyDialog] = React.useState(false)

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Sticky Header</div>
      <Switch checked={property.stickyHeader} onChange={e => { property.stickyHeader = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Paper Container</div>
      <Switch checked={property.componentPaper} onChange={e => { property.componentPaper = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Size</InputLabel>
        <Select {...sx.SelectSX} value={property.size} label='Size' onChange={e => { property.size = e.target.value; update() }}>
          <MenuItem value='medium'>Medium</MenuItem>
          <MenuItem value='small'>Small</MenuItem>
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Use Pagination</div>
      <Switch checked={property.usePagination} onChange={e => { property.usePagination = e.target.checked; update() }} />
    </Grid>
    {
      value.usePagination ?
        <>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>Use Pagination Component</div>
            <Switch checked={property.paginationComponent} onChange={e => { property.paginationComponent = e.target.checked; update() }} />
          </Grid>
          <Grid item xs={12}>
            <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Pagination Size' value={property.paginationSize} onChange={e => { property.paginationSize = e.target.value; update() }} />
          </Grid>
          <Grid item xs={12}>
            <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Pagination Page' value={property.paginationPage} onChange={e => { property.paginationPage = e.target.value; update() }} />
          </Grid>
          <Grid item xs={12}>
            <FormControl {...sx.SelectSX} fullWidth>
              <InputLabel>Pagination Justify Content</InputLabel>
              <Select {...sx.SelectSX} value={property.paginationJustifyContent} label='Pagination Justify Content' onChange={e => { property.paginationJustifyContent = e.target.value; update() }}  >
                <MenuItem value='center'>Center</MenuItem>
                <MenuItem value='flex-start'>Flex Start</MenuItem>
                <MenuItem value='flex-end'>Flex End</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </>
        : null
    }

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Use Action Button</div>
      <Switch checked={property.useAction} onChange={e => { property.useAction = e.target.checked; update() }} />
    </Grid>
    {
      value.useAction ?
        <>
          <Grid item xs={12}>
            <FormControl {...sx.SelectSX} fullWidth>
              <InputLabel>Action Button Variant</InputLabel>
              <Select {...sx.SelectSX} value={property.actionVariant} label='Action Button Variant' onChange={e => { property.actionVariant = e.target.value; update() }}>
                <MenuItem value='text'>Text</MenuItem>
                <MenuItem value='outlined'>Outlined</MenuItem>
                <MenuItem value='contained'>Contained</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl {...sx.SelectSX} fullWidth>
              <InputLabel>Color</InputLabel>
              <Select {...sx.SelectSX} value={property.actionColor} label='Color' onChange={e => { property.actionColor = e.target.value; update() }}>
                <MenuItem value='primary'>Primary</MenuItem>
                <MenuItem value='inherit'>Inherit</MenuItem>
                <MenuItem value='secondary'>Secondary</MenuItem>
                <MenuItem value='success'>Success</MenuItem>
                <MenuItem value='error'>Error</MenuItem>
                <MenuItem value='info'>Info</MenuItem>
                <MenuItem value='warning'>Warning</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Title' value={property.actionTitle} onChange={e => { property.actionTitle = e.target.value; update() }} />
          </Grid>
          <Grid item xs={12}>
            <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Text' value={property.actionText} onChange={e => { property.actionText = e.target.value; update() }} />
          </Grid>
        </>
        : null
    }

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Use Select Checkbox</div>
      <Switch checked={property.useSelect} onChange={e => { property.useSelect = e.target.checked; update() }} />
    </Grid>
    {
      value.useSelect ?
        <>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>Multiple</div>
            <Switch checked={property.selectMultiple} onChange={e => { property.selectMultiple = e.target.checked; update() }} />
          </Grid>
        </>
        : null
    }

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      <Button fullWidth variant='outlined' onClick={() => setHeadDialog(true)}>Set Head Options</Button>
    </Grid>
    <Grid item xs={12}>
      <Button fullWidth variant='outlined' onClick={() => setBodyDialog(true)}>Set Body Options</Button>
    </Grid>

    {
      headDialog ?
        <component.AceDialog
          value={JSON.stringify(value.head, null, 2)}
          onChange={v => {
            try {
              const v_ = JSON.parse(v)
              if (!Array.isArray(v_)) throw new Error()
              property.head = v_
              setHeadDialog(false)
            } catch {
              alert('Format Error')
            }
          }}
          onClose={() => setHeadDialog(false)}
          mode='json'
        />
        : null
    }

    {
      bodyDialog ?
        <component.AceDialog
          value={JSON.stringify(value.body, null, 2)}
          onChange={v => {
            try {
              const v_ = JSON.parse(v)
              if (!Array.isArray(v_)) throw new Error()
              property.body = v_
              setBodyDialog(false)
            } catch {
              alert('Format Error')
            }
          }}
          onClose={() => setBodyDialog(false)}
          mode='json'
        />
        : null
    }
  </Grid >
}

export default Edit