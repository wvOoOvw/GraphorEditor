import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { Button } from '@mui/material'
import { Switch } from '@mui/material'
import { Divider } from '@mui/material'

function Edit(props) {
  const { element, update, component, sx, sendMessage } = props

  const [aceDialog, setAceDialog] = React.useState()

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>居中</div>
      <Switch checked={element.property.centered} onChange={e => { element.property.centered = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='默认值' value={element.property.value} onChange={e => { element.property.value = e.target.value; update() }} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>文字Color</InputLabel>
        <Select {...sx.SelectSX} value={element.property.textColor} label='文字Color' onChange={e => { element.property.textColor = e.target.value; update() }}>
          {
            ['primary', 'inherit', 'secondary'].map(i => {
              return <MenuItem key={i} value={i}>{i}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>背景Color</InputLabel>
        <Select {...sx.SelectSX} value={element.property.indicatorColor} label='背景Color' onChange={e => { element.property.indicatorColor = e.target.value; update() }}>
          {
            ['primary', 'secondary'].map(i => {
              return <MenuItem key={i} value={i}>{i}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>方向</InputLabel>
        <Select {...sx.SelectSX} value={element.property.orientation} label='方向' onChange={e => { element.property.orientation = e.target.value; update() }}>
          <MenuItem value='horizontal'>横向</MenuItem>
          <MenuItem value='vertical'>纵向</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>类型</InputLabel>
        <Select {...sx.SelectSX} value={element.property.variant} label='类型' onChange={e => { element.property.variant = e.target.value; update() }}>
          <MenuItem value='standard'>默认</MenuItem>
          <MenuItem value='fullWidth'>填充宽度</MenuItem>
          <MenuItem value='scrollable'>滑动</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>滑动按钮</InputLabel>
        <Select {...sx.SelectSX} value={element.property.scrollButtons} label='滑动按钮' onChange={e => { element.property.scrollButtons = e.target.value; update() }}>
          <MenuItem value='auto'>自动</MenuItem>
          <MenuItem value={true}>打开</MenuItem>
          <MenuItem value={false}>关闭</MenuItem>
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      <Button style={{ textTransform: 'none' }} fullWidth variant='outlined' onClick={() => setAceDialog(true)}>Set Options</Button>
    </Grid>

    {
      aceDialog ?
        <component.AceDialog
          value={JSON.stringify(value.options, null, 2)}
          onChange={v => {
            try {
              const v_ = JSON.parse(v)
              if (!Array.isArray(v_)) throw new Error()
              element.property.options = v_
              setAceDialog(false)
            } catch {
              alert('Format Error')
            }
          }}
          onClose={() => setAceDialog(false)}
          mode='json'
        />
        : null
    }
  </Grid>
}

export default Edit