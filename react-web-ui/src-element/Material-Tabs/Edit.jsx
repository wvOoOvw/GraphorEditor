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
  const { element, property, style, update, component, sx, sendMessage } = props

  const [aceDialogOptions, setAceDialogOptions] = React.useState()

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>居中</div>
      <Switch checked={property.centered} onChange={e => { property.centered = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='默认值' value={property.value} onChange={e => { property.value = e.target.value; update() }} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>文字Color</InputLabel>
        <Select {...sx.SelectSX} value={property.textColor} label='文字Color' onChange={e => { property.textColor = e.target.value; update() }}>
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
        <Select {...sx.SelectSX} value={property.indicatorColor} label='背景Color' onChange={e => { property.indicatorColor = e.target.value; update() }}>
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
        <Select {...sx.SelectSX} value={property.orientation} label='方向' onChange={e => { property.orientation = e.target.value; update() }}>
          <MenuItem value='horizontal'>横向</MenuItem>
          <MenuItem value='vertical'>纵向</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>类型</InputLabel>
        <Select {...sx.SelectSX} value={property.variant} label='类型' onChange={e => { property.variant = e.target.value; update() }}>
          <MenuItem value='standard'>默认</MenuItem>
          <MenuItem value='fullWidth'>填充宽度</MenuItem>
          <MenuItem value='scrollable'>滑动</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>滑动按钮</InputLabel>
        <Select {...sx.SelectSX} value={property.scrollButtons} label='滑动按钮' onChange={e => { property.scrollButtons = e.target.value; update() }}>
          <MenuItem value='auto'>自动</MenuItem>
          <MenuItem value={true}>打开</MenuItem>
          <MenuItem value={false}>关闭</MenuItem>
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      <Button style={{ textTransform: 'none' }} fullWidth variant='outlined' onClick={() => setAceDialogOptions(true)}>Options</Button>
    </Grid>

    {
      aceDialogOptions ?
        <component.AceDialog
          value={JSON.stringify(property.options, null, 2)}
          onChange={v => { try { if (!Array.isArray(JSON.parse(v))) throw new Error(); property.options = JSON.parse(v); update(); setAceDialogOptions(); } catch { sendMessage('Format Error') } }}
          onClose={() => setAceDialogOptions()}
          mode='json'
        />
        : null
    }
  </Grid>
}

export default Edit