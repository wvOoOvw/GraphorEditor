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
  const { value, onChange, component, sx } = props

  const [headDialog, setHeadDialog] = React.useState(false)
  const [bodyDialog, setBodyDialog] = React.useState(false)

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Sticky Header</div>
      <Switch checked={value.stickyHeader} onChange={e => onChange(Object.assign({}, value, { stickyHeader: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Paper Container</div>
      <Switch checked={value.componentPaper} onChange={e => onChange(Object.assign({}, value, { componentPaper: e.target.checked }))} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Size</InputLabel>
        <Select {...sx.SelectSX} value={value.size} label='Size' onChange={e => onChange(Object.assign({}, value, { size: e.target.value }))}>
          <MenuItem value='medium'>Medium</MenuItem>
          <MenuItem value='small'>Small</MenuItem>
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Use Pagination</div>
      <Switch checked={value.usePagination} onChange={e => onChange(Object.assign({}, value, { usePagination: e.target.checked }))} />
    </Grid>
    {
      value.usePagination ?
        <>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>Use Pagination Component</div>
            <Switch checked={value.paginationComponent} onChange={e => onChange(Object.assign({}, value, { paginationComponent: e.target.checked }))} />
          </Grid>
          <Grid item xs={12}>
            <TextField {...sx.TextFieldSX} fullWidth label='Pagination Size' value={value.paginationSize} onChange={e => onChange(Object.assign({}, value, { paginationSize: e.target.value }))} />
          </Grid>
          <Grid item xs={12}>
            <TextField {...sx.TextFieldSX} fullWidth label='Pagination Page' value={value.paginationPage} onChange={e => onChange(Object.assign({}, value, { paginationPage: e.target.value }))} />
          </Grid>
          <Grid item xs={12}>
            <FormControl {...sx.SelectSX} fullWidth>
              <InputLabel>Pagination Justify Content</InputLabel>
              <Select {...sx.SelectSX} value={value.paginationJustifyContent} label='Pagination Justify Content' onChange={e => onChange(Object.assign({}, value, { paginationJustifyContent: e.target.value }))}  >
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
      <Switch checked={value.useAction} onChange={e => onChange(Object.assign({}, value, { useAction: e.target.checked }))} />
    </Grid>
    {
      value.useAction ?
        <>
          <Grid item xs={12}>
            <FormControl {...sx.SelectSX} fullWidth>
              <InputLabel>Action Button Variant</InputLabel>
              <Select {...sx.SelectSX} value={value.actionVariant} label='Action Button Variant' onChange={e => onChange(Object.assign({}, value, { actionVariant: e.target.value }))}>
                <MenuItem value='text'>Text</MenuItem>
                <MenuItem value='outlined'>Outlined</MenuItem>
                <MenuItem value='contained'>Contained</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl {...sx.SelectSX} fullWidth>
              <InputLabel>Color</InputLabel>
              <Select {...sx.SelectSX} value={value.actionColor} label='Color' onChange={e => onChange(Object.assign({}, value, { actionColor: e.target.value }))}>
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
            <TextField {...sx.TextFieldSX} fullWidth label='Title' value={value.actionTitle} onChange={e => onChange(Object.assign({}, value, { actionTitle: e.target.value }))} />
          </Grid>
          <Grid item xs={12}>
            <TextField {...sx.TextFieldSX} fullWidth label='Text' value={value.actionText} onChange={e => onChange(Object.assign({}, value, { actionText: e.target.value }))} />
          </Grid>
        </>
        : null
    }

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Use Select Checkbox</div>
      <Switch checked={value.useSelect} onChange={e => onChange(Object.assign({}, value, { useSelect: e.target.checked }))} />
    </Grid>
    {
      value.useSelect ?
        <>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>Multiple</div>
            <Switch checked={value.selectMultiple} onChange={e => onChange(Object.assign({}, value, { selectMultiple: e.target.checked }))} />
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
              onChange((value) => value.head = v_)
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
              onChange((value) => value.body = v_)
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