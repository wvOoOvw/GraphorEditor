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
  const { value, onChange, component, sx } = props

  const [modalOptions, setModalOptions] = React.useState(false)

  return <Grid container spacing={2}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>居中</div>
      <Switch checked={value.centered} onChange={e => onChange(Object.assign({}, value, { centered: e.target.checked }))} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth label='默认值' value={value.value} onChange={e => onChange(Object.assign({}, value, { value: e.target.value }))} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>文字主题颜色</InputLabel>
        <Select {...sx.SelectSX} value={value.textColor} label='文字主题颜色' onChange={e => onChange(Object.assign({}, value, { textColor: e.target.value }))}>
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
        <InputLabel>背景主题颜色</InputLabel>
        <Select {...sx.SelectSX} value={value.indicatorColor} label='背景主题颜色' onChange={e => onChange(Object.assign({}, value, { indicatorColor: e.target.value }))}>
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
        <Select {...sx.SelectSX} value={value.orientation} label='方向' onChange={e => onChange(Object.assign({}, value, { orientation: e.target.value }))}>
          <MenuItem value='horizontal'>横向</MenuItem>
          <MenuItem value='vertical'>纵向</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>类型</InputLabel>
        <Select {...sx.SelectSX} value={value.variant} label='类型' onChange={e => onChange(Object.assign({}, value, { variant: e.target.value }))}>
          <MenuItem value='standard'>默认</MenuItem>
          <MenuItem value='fullWidth'>填充宽度</MenuItem>
          <MenuItem value='scrollable'>滑动</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>滑动按钮</InputLabel>
        <Select {...sx.SelectSX} value={value.scrollButtons} label='滑动按钮' onChange={e => onChange(Object.assign({}, value, { scrollButtons: e.target.value }))}>
          <MenuItem value='auto'>自动</MenuItem>
          <MenuItem value={true}>打开</MenuItem>
          <MenuItem value={false}>关闭</MenuItem>
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      <Button fullWidth variant='outlined' onClick={() => setModalOptions(true)}>配置选项数据</Button>
    </Grid>

    {
      modalOptions ?
        <component.CodeModal
          value={JSON.stringify(value.options, null, 2)}
          onChange={v => {
            try {
              const v_ = JSON.parse(v)
              if (!Array.isArray(v_)) throw new Error()
              onChange((value) => value.options = v_)
              setModalOptions(false)
            } catch {
              alert('格式错误')
            }
          }}
          onClose={() => setModalOptions(false)}
          mode='json'
          initValue={'[]'}
        /> : null
    }
  </Grid>
}

export default Edit