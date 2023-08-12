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

  const [modalHead, setModalHead] = React.useState(false)
  const [modalBody, setModalBody] = React.useState(false)

  return <Grid container spacing={2}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>表头固定</div>
      <Switch checked={value.stickyHeader} onChange={e => onChange(Object.assign({}, value, { stickyHeader: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>边框</div>
      <Switch checked={value.componentPaper} onChange={e => onChange(Object.assign({}, value, { componentPaper: e.target.checked }))} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>尺寸</InputLabel>
        <Select {...sx.SelectSX} value={value.size} label='尺寸' onChange={e => onChange(Object.assign({}, value, { size: e.target.value }))}>
          {
            ['medium', 'small'].map(i => {
              return <MenuItem key={i} value={i}>{i}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>使用分页</div>
      <Switch checked={value.usePagination} onChange={e => onChange(Object.assign({}, value, { usePagination: e.target.checked }))} />
    </Grid>
    {
      value.usePagination ?
        <>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>内置分页</div>
            <Switch checked={value.paginationComponent} onChange={e => onChange(Object.assign({}, value, { paginationComponent: e.target.checked }))} />
          </Grid>
          <Grid item xs={12}>
            <TextField {...sx.TextFieldSX} fullWidth label='单页计数' value={value.paginationSize} onChange={e => onChange(Object.assign({}, value, { paginationSize: e.target.value }))} />
          </Grid>
          <Grid item xs={12}>
            <TextField {...sx.TextFieldSX} fullWidth label='页码' value={value.paginationPage} onChange={e => onChange(Object.assign({}, value, { paginationPage: e.target.value }))} />
          </Grid>
          <Grid item xs={12}>
            <FormControl {...sx.SelectSX} fullWidth>
              <InputLabel>分页位置</InputLabel>
              <Select {...sx.SelectSX} value={value.paginationJustifyContent} label='分页位置' onChange={e => onChange(Object.assign({}, value, { paginationJustifyContent: e.target.value }))}  >
                <MenuItem value='center'>居中</MenuItem>
                <MenuItem value='flex-start'>左</MenuItem>
                <MenuItem value='flex-end'>右</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </> : null
    }

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>使用尾部按钮</div>
      <Switch checked={value.useAction} onChange={e => onChange(Object.assign({}, value, { useAction: e.target.checked }))} />
    </Grid>
    {
      value.useAction ?
        <>
          <Grid item xs={12}>
            <FormControl {...sx.SelectSX} fullWidth>
              <InputLabel>按钮类型</InputLabel>
              <Select {...sx.SelectSX} value={value.actionVariant} label='按钮类型' onChange={e => onChange(Object.assign({}, value, { actionVariant: e.target.value }))}>
                <MenuItem value='text'>文字</MenuItem>
                <MenuItem value='outlined'>边线</MenuItem>
                <MenuItem value='contained'>填充</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl {...sx.SelectSX} fullWidth>
              <InputLabel>按钮主题颜色</InputLabel>
              <Select {...sx.SelectSX} value={value.actionColor} label='按钮主题颜色' onChange={e => onChange(Object.assign({}, value, { actionColor: e.target.value }))}>
                {
                  ['primary', 'inherit', 'secondary', 'success', 'error', 'info', 'warning'].map(i => {
                    return <MenuItem key={i} value={i}>{i}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField {...sx.TextFieldSX} fullWidth label='标题文案' value={value.actionTitle} onChange={e => onChange(Object.assign({}, value, { actionTitle: e.target.value }))} />
          </Grid>
          <Grid item xs={12}>
            <TextField {...sx.TextFieldSX} fullWidth label='按钮文案' value={value.actionText} onChange={e => onChange(Object.assign({}, value, { actionText: e.target.value }))} />
          </Grid>
        </> : null
    }

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>使用头部选择</div>
      <Switch checked={value.useSelect} onChange={e => onChange(Object.assign({}, value, { useSelect: e.target.checked }))} />
    </Grid>
    {
      value.useSelect ?
        <>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>显示全选</div>
            <Switch checked={value.selectMultiple} onChange={e => onChange(Object.assign({}, value, { selectMultiple: e.target.checked }))} />
          </Grid>
        </> : null
    }

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      <Button fullWidth variant='outlined' onClick={() => setModalHead(true)}>配置表头数据</Button>
    </Grid>
    <Grid item xs={12}>
      <Button fullWidth variant='outlined' onClick={() => setModalBody(true)}>配置表格数据</Button>
    </Grid>

    {
      modalHead ?
        <component.CodeModal
          value={JSON.stringify(value.head, null, 2)}
          onChange={v => {
            try {
              const v_ = JSON.parse(v)
              if (!Array.isArray(v_)) throw new Error()
              onChange((value) => value.head = v_)
              setModalHead(false)
            } catch {
              alert('格式错误')
            }
          }}
          onClose={() => setModalHead(false)}
          mode='json'
          initValue={'[]'}
        /> : null
    }

    {
      modalBody ?
        <component.CodeModal
          value={JSON.stringify(value.body, null, 2)}
          onChange={v => {
            try {
              const v_ = JSON.parse(v)
              if (!Array.isArray(v_)) throw new Error()
              onChange((value) => value.body = v_)
              setModalBody(false)
            } catch {
              alert('格式错误')
            }
          }}
          onClose={() => setModalBody(false)}
          mode='json'
          initValue={'[]'}
        /> : null
    }
  </Grid >
}

export default Edit