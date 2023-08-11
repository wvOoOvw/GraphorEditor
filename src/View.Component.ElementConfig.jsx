import React from 'react'

import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { TextField } from '@mui/material'
import { Switch } from '@mui/material'
import { Slider } from '@mui/material'
import { Button } from '@mui/material'
import { Autocomplete } from '@mui/material'

import { defaultOuterAll } from './utils.graph.style'
import { TooltipSX, TextFieldSX, AutocompleteSX } from './utils.mui.sx'

export function Render_C(props) {
  const { value, onChange } = props

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Render</div>
      <Switch checked={value.style.render} onChange={e => onChange(() => value.style.render = e.target.checked)} />
    </Grid>
  </>
}

export function Visible_C(props) {
  const { value, onChange } = props

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Visible</div>
      <Switch checked={value.style.visible} onChange={e => onChange(() => value.style.visible = e.target.checked)} />
    </Grid>
  </>
}

export function ToolButton(props) {
  const { value, onChange } = props

  const handleHorizontalCenter = () => {
    onChange(() => {
      if (value.style.margin === undefined) {
        value.style.margin = JSON.parse(JSON.stringify(defaultOuterAll.margin))
      }
      if (value.style.position === undefined) {
        value.style.position = JSON.parse(JSON.stringify(defaultOuterAll.position))
      }
      if (value.style.inset === undefined) {
        value.style.inset = JSON.parse(JSON.stringify(defaultOuterAll.inset))
      }

      value.style.position = 'absolute'
      value.style.inset[1] = '0'
      value.style.inset[3] = '0'
      value.style.margin[1] = 'auto'
      value.style.margin[3] = 'auto'
    })
  }
  const handleVerticalCenter = () => {
    onChange(() => {
      if (value.style.margin === undefined) {
        value.style.margin = JSON.parse(JSON.stringify(defaultOuterAll.margin))
      }
      if (value.style.position === undefined) {
        value.style.position = JSON.parse(JSON.stringify(defaultOuterAll.position))
      }
      if (value.style.inset === undefined) {
        value.style.inset = JSON.parse(JSON.stringify(defaultOuterAll.inset))
      }

      value.style.position = 'absolute'
      value.style.inset[0] = '0'
      value.style.inset[2] = '0'
      value.style.margin[0] = 'auto'
      value.style.margin[2] = 'auto'
    })
  }

  return <>
    <Grid item xs={12}>
      <Grid container spacing={1} justifyContent='center'>
        <Grid item>
          <Button variant='outlined' onClick={handleHorizontalCenter}>水平居中</Button>
        </Grid>
        <Grid item>
          <Button variant='outlined' onClick={handleVerticalCenter}>垂直居中</Button>
        </Grid>
      </Grid>
    </Grid>
  </>
}

export function Size_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.width = JSON.parse(JSON.stringify(defaultOuterAll.width))
        value.style.height = JSON.parse(JSON.stringify(defaultOuterAll.height))
      } else {
        delete value.style.width
        delete value.style.height
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>宽高</div>
      <Switch checked={value.style.width !== undefined && value.style.height !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.width !== undefined && value.style.height !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='宽度' value={value.style.width} onChange={e => onChange(() => value.style.width = e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='高度' value={value.style.height} onChange={e => onChange(() => value.style.height = e.target.value)} />
          </Grid>
        </> : null
    }
  </>
}

export function SizeLimit_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.minWidth = JSON.parse(JSON.stringify(defaultOuterAll.minWidth))
        value.style.minHeight = JSON.parse(JSON.stringify(defaultOuterAll.minHeight))
        value.style.maxWidth = JSON.parse(JSON.stringify(defaultOuterAll.maxWidth))
        value.style.maxHeight = JSON.parse(JSON.stringify(defaultOuterAll.maxHeight))
      } else {
        delete value.style.minWidth
        delete value.style.minHeight
        delete value.style.maxWidth
        delete value.style.maxHeight
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>宽高限制</div>
      <Switch checked={value.style.minWidth !== undefined && value.style.minHeight !== undefined && value.style.maxWidth !== undefined && value.style.maxHeight !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.minWidth !== undefined && value.style.minHeight !== undefined && value.style.maxWidth !== undefined && value.style.maxHeight !== undefined ?
        <>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='最小宽度' value={value.style.minWidth} onChange={e => onChange(() => value.style.minWidth = e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='最小高度' value={value.style.minHeight} onChange={e => onChange(() => value.style.minHeight = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='最大宽度' value={value.style.maxWidth} onChange={e => onChange(() => value.style.maxWidth = e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='最大高度' value={value.style.maxHeight} onChange={e => onChange(() => value.style.maxHeight = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
        </> : null
    }
  </>
}

export function Position_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.position = JSON.parse(JSON.stringify(defaultOuterAll.position))
      } else {
        delete value.style.position
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>定位</div>
      <Switch checked={value.style.position !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.position !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>定位</InputLabel>
              <Select label='定位' value={value.style.position} onChange={e => onChange(() => value.style.position = e.target.value)}  >
                <MenuItem value='static'>static</MenuItem>
                <MenuItem value='relative'>relative</MenuItem>
                <MenuItem value='absolute'>absolute</MenuItem>
                <MenuItem value='fixed'>fixed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </> : null
    }
  </>
}

export function Inset_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.inset = JSON.parse(JSON.stringify(defaultOuterAll.inset))
      } else {
        delete value.style.inset
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>位置</div>
      <Switch checked={value.style.inset !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.inset !== undefined ?
        <>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='上' value={value.style.inset[0]} onChange={e => onChange(() => value.style.inset[0] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='右' value={value.style.inset[1]} onChange={e => onChange(() => value.style.inset[1] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='下' value={value.style.inset[2]} onChange={e => onChange(() => value.style.inset[2] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='左' value={value.style.inset[3]} onChange={e => onChange(() => value.style.inset[3] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
        </> : null
    }
  </>
}

export function Display_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.display = JSON.parse(JSON.stringify(defaultOuterAll.display))
      } else {
        delete value.style.display
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>布局</div>
      <Switch checked={value.style.display !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.display !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>布局</InputLabel>
              <Select label='布局' value={value.style.display} onChange={e => onChange(() => value.style.display = e.target.value)}  >
                <MenuItem value='inline'>inline</MenuItem>
                <MenuItem value='block'>block</MenuItem>
                <MenuItem value='inline-block'>inline-block</MenuItem>
                <MenuItem value='flex'>flex</MenuItem>
                <MenuItem value='inline-flex'>inline-flex</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </> : null
    }
  </>
}

export function ZIndex_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.zIndex = JSON.parse(JSON.stringify(defaultOuterAll.zIndex))
      } else {
        delete value.style.zIndex
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>层级</div>
      <Switch checked={value.style.zIndex !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.zIndex !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='层级' value={value.style.zIndex} onChange={e => onChange(() => value.style.zIndex = e.target.value)} type='number' />
          </Grid>
        </> : null
    }
  </>
}

export function Cursor_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.cursor = JSON.parse(JSON.stringify(defaultOuterAll.cursor))
      } else {
        delete value.style.cursor
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>光标</div>
      <Switch checked={value.style.cursor !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.cursor !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>光标</InputLabel>
              <Select label='光标' value={value.style.cursor} onChange={e => onChange(() => value.style.cursor = e.target.value)}  >
                <MenuItem value='default'>默认</MenuItem>
                <MenuItem value='pointer'>点击</MenuItem>
                <MenuItem value='move'>移动</MenuItem>
                <MenuItem value='text'>文本</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </> : null
    }
  </>
}

export function Overflow_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.overflow = JSON.parse(JSON.stringify(defaultOuterAll.overflow))
      } else {
        delete value.style.overflow
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>溢出</div>
      <Switch checked={value.style.overflow !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.overflow !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>溢出</InputLabel>
              <Select label='溢出' value={value.style.overflow} onChange={e => onChange(() => value.style.overflow = e.target.value)}  >
                <MenuItem value='visible'>显示</MenuItem>
                <MenuItem value='hidden'>隐藏</MenuItem>
                <MenuItem value='auto'>滑动</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </> : null
    }
  </>
}

export function VerticalAlign_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.verticalAlign = JSON.parse(JSON.stringify(defaultOuterAll.verticalAlign))
      } else {
        delete value.style.verticalAlign
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>对齐</div>
      <Switch checked={value.style.verticalAlign !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.verticalAlign !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>对齐</InputLabel>
              <Select label='对齐' value={value.style.verticalAlign} onChange={e => onChange(() => value.style.verticalAlign = e.target.value)}  >
                <MenuItem value='baseline'>基线</MenuItem>
                <MenuItem value='top'>上</MenuItem>
                <MenuItem value='middle'>中</MenuItem>
                <MenuItem value='bottom'>下</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </> : null
    }
  </>
}


export function Padding_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.padding = JSON.parse(JSON.stringify(defaultOuterAll.padding))
      } else {
        delete value.style.padding
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>内间距</div>
      <Switch checked={value.style.padding !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.padding !== undefined ?
        <>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='上' value={value.style.padding[0]} onChange={e => onChange(() => value.style.padding[0] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='右' value={value.style.padding[1]} onChange={e => onChange(() => value.style.padding[1] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='下' value={value.style.padding[2]} onChange={e => onChange(() => value.style.padding[2] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='左' value={value.style.padding[3]} onChange={e => onChange(() => value.style.padding[3] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
        </> : null
    }
  </>
}

export function Margin_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.margin = JSON.parse(JSON.stringify(defaultOuterAll.margin))
      } else {
        delete value.style.margin
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>外间距</div>
      <Switch checked={value.style.margin !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.margin !== undefined ?
        <>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='上' value={value.style.margin[0]} onChange={e => onChange(() => value.style.margin[0] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='右' value={value.style.margin[1]} onChange={e => onChange(() => value.style.margin[1] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='下' value={value.style.margin[2]} onChange={e => onChange(() => value.style.margin[2] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='左' value={value.style.margin[3]} onChange={e => onChange(() => value.style.margin[3] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
        </> : null
    }
  </>
}


export function Flex_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.flex = JSON.parse(JSON.stringify(defaultOuterAll.flex))
      } else {
        delete value.style.flex
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>弹性</div>
      <Switch checked={value.style.flex !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.flex !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>方向</InputLabel>
              <Select label='方向' value={value.style.flex.flexDirection} onChange={e => onChange(() => value.style.flex.flexDirection = e.target.value)}  >
                <MenuItem value='row'>水平</MenuItem>
                <MenuItem value='row-reverse'>水平（逆向）</MenuItem>
                <MenuItem value='column'>垂直</MenuItem>
                <MenuItem value='column-reverse	'>垂直（逆向）</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>换行</InputLabel>
              <Select label='换行' value={value.style.flex.flexWrap} onChange={e => onChange(() => value.style.flex.flexWrap = e.target.value)}  >
                <MenuItem value='nowrap'>不换行</MenuItem>
                <MenuItem value='wrap'>换行</MenuItem>
                <MenuItem value='wrap-reverse'>换行（逆向）</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>水平布局</InputLabel>
              <Select label='水平布局' value={value.style.flex.justifyContent} onChange={e => onChange(() => value.style.flex.justifyContent = e.target.value)}  >
                <MenuItem value='flex-start'>起始</MenuItem>
                <MenuItem value='flex-end'>末尾</MenuItem>
                <MenuItem value='center'>中心</MenuItem>
                <MenuItem value='space-between'>均匀（两侧置空）</MenuItem>
                <MenuItem value='space-around'>均匀（两侧留空）</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>垂直布局</InputLabel>
              <Select label='垂直布局' value={value.style.flex.alignItems} onChange={e => onChange(() => value.style.flex.alignItems = e.target.value)}  >
                <MenuItem value='stretch'>占据全部</MenuItem>
                <MenuItem value='flex-start'>起始</MenuItem>
                <MenuItem value='flex-end'>末尾</MenuItem>
                <MenuItem value='center'>中心</MenuItem>
                <MenuItem value='baseline'>基线</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>轴布局</InputLabel>
              <Select label='轴布局' value={value.style.flex.alignContent} onChange={e => onChange(() => value.style.flex.alignContent = e.target.value)}  >
                <MenuItem value='stretch'>占据全部</MenuItem>
                <MenuItem value='flex-start'>起始</MenuItem>
                <MenuItem value='flex-end'>末尾</MenuItem>
                <MenuItem value='center'>中心</MenuItem>
                <MenuItem value='space-between'>均匀（两侧置空）</MenuItem>
                <MenuItem value='space-around'>均匀（两侧留空）</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField {...TextFieldSX} fullWidth label='单元 扩展量' value={value.style.flex.flexGrow} onChange={e => onChange(() => value.style.flex.flexGrow = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={6}>
            <TextField {...TextFieldSX} fullWidth label='单元 收缩量' value={value.style.flex.flexShrink} onChange={e => onChange(() => value.style.flex.flexShrink = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='单元 初始长度' value={value.style.flex.flexBasis} onChange={e => onChange(() => value.style.flex.flexBasis = e.target.value)} />
          </Grid>
        </> : null
    }
  </>
}

export function Transform_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.transform = JSON.parse(JSON.stringify(defaultOuterAll.transform))
      } else {
        delete value.style.transform
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>变化</div>
      <Switch checked={value.style.transform !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.transform !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>呈现形式</InputLabel>
              <Select label='呈现形式' value={value.style.transform.transformStyle} onChange={e => onChange(() => value.style.transform.transformStyle = e.target.value)}  >
                <MenuItem value='flat'>平面</MenuItem>
                <MenuItem value='preserve-3d'>立体</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='透视距离' value={value.style.transform.perspective} onChange={e => onChange(() => value.style.transform.perspective = e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth label='基点 X' value={value.style.transform.transformOrigin[0]} onChange={e => onChange(() => value.style.transform.transformOrigin[0] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth label='基点 Y' value={value.style.transform.transformOrigin[1]} onChange={e => onChange(() => value.style.transform.transformOrigin[1] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth label='基点 Z' value={value.style.transform.transformOrigin[2]} onChange={e => onChange(() => value.style.transform.transformOrigin[2] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth label='平移 X' value={value.style.transform.transformTranslate[0]} onChange={e => onChange(() => value.style.transform.transformTranslate[0] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth label='平移 Y' value={value.style.transform.transformTranslate[1]} onChange={e => onChange(() => value.style.transform.transformTranslate[1] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth label='平移 Z' value={value.style.transform.transformTranslate[2]} onChange={e => onChange(() => value.style.transform.transformTranslate[2] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth type='number' label='旋转 X' value={value.style.transform.transformRotate[0]} onChange={e => onChange(() => value.style.transform.transformRotate[0] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth type='number' label='旋转 Y' value={value.style.transform.transformRotate[1]} onChange={e => onChange(() => value.style.transform.transformRotate[1] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth type='number' label='旋转 Z' value={value.style.transform.transformRotate[2]} onChange={e => onChange(() => value.style.transform.transformRotate[2] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth type='number' label='缩放 X' value={value.style.transform.transformScale[0]} onChange={e => onChange(() => value.style.transform.transformScale[0] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth type='number' label='缩放 Y' value={value.style.transform.transformScale[1]} onChange={e => onChange(() => value.style.transform.transformScale[1] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth type='number' label='缩放 Z' value={value.style.transform.transformScale[2]} onChange={e => onChange(() => value.style.transform.transformScale[2] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
        </> : null
    }
  </>
}

export function Transition_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.transition = JSON.parse(JSON.stringify(defaultOuterAll.transition))
      } else {
        delete value.style.transition
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>过渡</div>
      <Switch checked={value.style.transition !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.transition !== undefined ?
        <>
          <Grid item xs={12}>
            <div>时间</div>
            <Slider value={value.style.transition.transitionTime} onChange={(e, v) => onChange(() => value.style.transition.transitionTime = v)} min={0} max={2} step={0.01} valueLabelDisplay='auto' />
          </Grid>
        </> : null
    }
  </>
}

export function Filter_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.filter = JSON.parse(JSON.stringify(defaultOuterAll.filter))
      } else {
        delete value.style.filter
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>滤镜</div>
      <Switch checked={value.style.filter !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.filter !== undefined ?
        <>
          <Grid item xs={12}>
            <div>模糊</div>
            <Slider value={value.style.filter.filterBlur} onChange={(e, v) => onChange(() => value.style.filter.filterBlur = v)} min={0} max={50} step={1} valueLabelDisplay='auto' />
          </Grid>
          <Grid item xs={12}>
            <div>亮暗</div>
            <Slider value={value.style.filter.filterBrightness} onChange={(e, v) => onChange(() => value.style.filter.filterBrightness = v)} min={0} max={200} step={1} valueLabelDisplay='auto' />
          </Grid>
          <Grid item xs={12}>
            <div>透明</div>
            <Slider value={value.style.filter.filterOpacity} onChange={(e, v) => onChange(() => value.style.filter.filterOpacity = v)} min={0} max={100} step={1} valueLabelDisplay='auto' />
          </Grid>
        </> : null
    }
  </>
}

export function Border_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.border = JSON.parse(JSON.stringify(defaultOuterAll.border))
      } else {
        delete value.style.border
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>边框</div>
      <Switch checked={value.style.border !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.border !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='宽度' value={value.style.border.borderWidth} onChange={e => onChange(() => value.style.border.borderWidth = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='颜色' value={value.style.border.borderColor} onChange={e => onChange(() => value.style.border.borderColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='调色板' value={value.style.border.borderColor} onChange={e => onChange(() => value.style.border.borderColor = e.target.value)} type='color' />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>线条类型</InputLabel>
              <Select label='线条类型' value={value.style.border.borderStyle} onChange={e => onChange(() => value.style.border.borderStyle = e.target.value)}>
                <MenuItem value='solid'>实线</MenuItem>
                <MenuItem value='double'>双线</MenuItem>
                <MenuItem value='dashed'>虚线</MenuItem>
                <MenuItem value='dotted'>点线</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>位置</InputLabel>
              <Select label='位置' value={value.style.border.borderPosition} onChange={e => onChange(() => value.style.border.borderPosition = e.target.value)} multiple>
                <MenuItem value='top'>上</MenuItem>
                <MenuItem value='bottom'>下</MenuItem>
                <MenuItem value='left'>左</MenuItem>
                <MenuItem value='right'>右</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </> : null
    }
  </>
}

export function BorderRadius_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.borderRadius = JSON.parse(JSON.stringify(defaultOuterAll.borderRadius))
      } else {
        delete value.style.borderRadius
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>圆角</div>
      <Switch checked={value.style.borderRadius !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.borderRadius !== undefined ?
        <>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='左上' value={value.style.borderRadius[0]} onChange={e => onChange(() => value.style.borderRadius[0] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='右上' value={value.style.borderRadius[1]} onChange={e => onChange(() => value.style.borderRadius[1] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='右下' value={value.style.borderRadius[2]} onChange={e => onChange(() => value.style.borderRadius[2] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='左下' value={value.style.borderRadius[3]} onChange={e => onChange(() => value.style.borderRadius[3] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
        </> : null
    }
  </>
}

export function BoxShadow_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.boxShadow = JSON.parse(JSON.stringify(defaultOuterAll.boxShadow))
      } else {
        delete value.style.boxShadow
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>阴影</div>
      <Switch checked={value.style.boxShadow !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.boxShadow !== undefined ?
        <>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>内阴影</div>
            <Switch checked={value.style.boxShadow.boxShadowInset} onChange={e => onChange(() => value.style.boxShadow.boxShadowInset = e.target.checked)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='位置 X' value={value.style.boxShadow.boxShadowPosition[0]} onChange={e => onChange(() => value.style.boxShadow.boxShadowPosition[0] = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='位置 Y' value={value.style.boxShadow.boxShadowPosition[1]} onChange={e => onChange(() => value.style.boxShadow.boxShadowPosition[1] = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='尺寸' value={value.style.boxShadow.boxShadowSize} onChange={e => onChange(() => value.style.boxShadow.boxShadowSize = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='颜色' value={value.style.boxShadow.boxShadowColor} onChange={e => onChange(() => value.style.boxShadow.boxShadowColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='调色板' value={value.style.boxShadow.boxShadowColor} onChange={e => onChange(() => value.style.boxShadow.boxShadowColor = e.target.value)} type='color' />
          </Grid>

        </> : null
    }
  </>
}

export function Outline_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.outline = JSON.parse(JSON.stringify(defaultOuterAll.outline))
      } else {
        delete value.style.outline
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>轮廓</div>
      <Switch checked={value.style.outline !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.outline !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='宽度' value={value.style.outline.outlineWidth} onChange={e => onChange(() => value.style.outline.outlineWidth = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='颜色' value={value.style.outline.outlineColor} onChange={e => onChange(() => value.style.outline.outlineColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='调色板' value={value.style.outline.outlineColor} onChange={e => onChange(() => value.style.outline.outlineColor = e.target.value)} type='color' />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>线条类型</InputLabel>
              <Select label='线条类型' value={value.style.outline.outlineStyle} onChange={e => onChange(() => value.style.outline.outlineStyle = e.target.value)}  >
                <MenuItem value='solid'>实线</MenuItem>
                <MenuItem value='double'>双线</MenuItem>
                <MenuItem value='dashed'>虚线</MenuItem>
                <MenuItem value='dotted'>点线</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </> : null
    }
  </>
}

export function Background_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.background = JSON.parse(JSON.stringify(defaultOuterAll.background))
      } else {
        delete value.style.background
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>背景</div>
      <Switch checked={value.style.background !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.background !== undefined ?
        <>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='颜色' value={value.style.background.backgroundColor} onChange={e => onChange(() => value.style.background.backgroundColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='调色板' value={value.style.background.backgroundColor} onChange={e => onChange(() => value.style.background.backgroundColor = e.target.value)} type='color' />
          </Grid>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='图片' value={value.style.background.backgroundImage} onChange={e => onChange(() => value.style.background.backgroundImage = e.target.value)} multiline maxRows={4} />
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='位置 X' value={value.style.background.backgroundPosition[0]} onChange={e => onChange(() => value.style.background.backgroundPosition[0] = e.target.value)} multiline maxRows={4} />
              </Grid>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='位置 Y' value={value.style.background.backgroundPosition[1]} onChange={e => onChange(() => value.style.background.backgroundPosition[1] = e.target.value)} multiline maxRows={4} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='尺寸 X' value={value.style.background.backgroundSize[0]} onChange={e => onChange(() => value.style.background.backgroundSize[0] = e.target.value)} multiline maxRows={4} />
              </Grid>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='尺寸 Y' value={value.style.background.backgroundSize[1]} onChange={e => onChange(() => value.style.background.backgroundSize[1] = e.target.value)} multiline maxRows={4} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>重复填充</InputLabel>
              <Select label='重复填充' value={value.style.background.backgroundRepeat} onChange={e => onChange(() => value.style.background.backgroundRepeat = e.target.value)}  >
                <MenuItem value='no-repeat'>不重复</MenuItem>
                <MenuItem value='repeat'>重复</MenuItem>
                <MenuItem value='repeat-x'>仅重复X轴</MenuItem>
                <MenuItem value='repeat-y'>仅重复Y轴</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>跟随滑动</InputLabel>
              <Select label='跟随滑动' value={value.style.background.backgroundAttachment} onChange={e => onChange(() => value.style.background.backgroundAttachment = e.target.value)}  >
                <MenuItem value='scroll'>滑动</MenuItem>
                <MenuItem value='fixed'>不滑动</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </> : null
    }
  </>
}

export function Font_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.font = JSON.parse(JSON.stringify(defaultOuterAll.font))
      } else {
        delete value.style.font
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>字体</div>
      <Switch checked={value.style.font !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.font !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth type='number' label='尺寸' value={value.style.font.fontSize} onChange={e => onChange(() => value.style.font.fontSize = e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>粗细</InputLabel>
              <Select value={value.style.font.fontWeight} label='粗细' onChange={e => onChange(() => value.style.font.fontWeight = e.target.value)}>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={200}>200</MenuItem>
                <MenuItem value={300}>300</MenuItem>
                <MenuItem value={400}>400</MenuItem>
                <MenuItem value={500}>500</MenuItem>
                <MenuItem value={600}>600</MenuItem>
                <MenuItem value={700}>700</MenuItem>
                <MenuItem value={800}>800</MenuItem>
                <MenuItem value={900}>900</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              {...AutocompleteSX}
              multiple
              options={['"Times New Roman"']}
              value={value.style.font.fontFamily.split(',').filter(i => i)}
              onChange={(e, v) => onChange(() => value.style.font.fontFamily = v.join(','))}
              renderInput={(params) => <TextField {...params} label='系列' />}
            />
          </Grid>
        </> : null
    }
  </>
}

export function Text_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.text = JSON.parse(JSON.stringify(defaultOuterAll.text))
      } else {
        delete value.style.text
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>文本</div>
      <Switch checked={value.style.text !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.text !== undefined ?
        <>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth type='number' label='行高' value={value.style.text.lineHeight} onChange={e => onChange(() => value.style.text.lineHeight = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth type='number' label='字符间距' value={value.style.text.letterSpacing} onChange={e => onChange(() => value.style.text.letterSpacing = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>对齐</InputLabel>
              <Select value={value.style.text.textAlign} label='对齐' onChange={e => onChange(() => value.style.text.textAlign = e.target.value)}>
                <MenuItem value='left'>居左</MenuItem>
                <MenuItem value='right'>居右</MenuItem>
                <MenuItem value='center'>居中</MenuItem>
                <MenuItem value='justify'>两端对齐</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>换行</InputLabel>
              <Select value={value.style.text.whiteSpace} label='换行' onChange={e => onChange(() => value.style.text.whiteSpace = e.target.value)}>
                <MenuItem value='normal'>默认</MenuItem>
                <MenuItem value='nowrap'>不换行</MenuItem>
                <MenuItem value='pre-wrap'>保留空格换行</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='颜色' value={value.style.text.color} onChange={e => onChange(() => value.style.text.color = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='调色板' value={value.style.text.color} onChange={e => onChange(() => value.style.text.color = e.target.value)} type='color' />
          </Grid>
        </> : null
    }
  </>
}

export function TextDecoration_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.textDecoration = JSON.parse(JSON.stringify(defaultOuterAll.textDecoration))
      } else {
        delete value.style.textDecoration
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>文本装饰</div>
      <Switch checked={value.style.textDecoration !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.textDecoration !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>位置</InputLabel>
              <Select value={value.style.textDecoration.textDecorationLine} label='位置' onChange={e => onChange(() => value.style.textDecoration.textDecorationLine = e.target.value)}>
                <MenuItem value='none'>默认</MenuItem>
                <MenuItem value='underline'>下划线</MenuItem>
                <MenuItem value='overline'>上划线</MenuItem>
                <MenuItem value='line-through'>中划线</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>线条类型</InputLabel>
              <Select value={value.style.textDecoration.textDecorationStyle} label='线条类型' onChange={e => onChange(() => value.style.textDecoration.textDecorationStyle = e.target.value)}>
                <MenuItem value='solid'>实线</MenuItem>
                <MenuItem value='double'>双线</MenuItem>
                <MenuItem value='dashed'>虚线</MenuItem>
                <MenuItem value='dotted'>点线</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='颜色' value={value.style.textDecoration.textDecorationColor} onChange={e => onChange(() => value.style.textDecoration.textDecorationColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='调色板' value={value.style.textDecoration.textDecorationColor} onChange={e => onChange(() => value.style.textDecoration.textDecorationColor = e.target.value)} type='color' />
          </Grid>
        </> : null
    }
  </>
}

export function TextShadow_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.textShadow = JSON.parse(JSON.stringify(defaultOuterAll.textShadow))
      } else {
        delete value.style.textShadow
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>文本阴影</div>
      <Switch checked={value.style.textShadow !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.textShadow !== undefined ?
        <>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='位置 X' value={value.style.textShadow.textShadowPosition[0]} onChange={e => onChange(() => value.style.textShadow.textShadowPosition[0] = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='位置 Y' value={value.style.textShadow.textShadowPosition[1]} onChange={e => onChange(() => value.style.textShadow.textShadowPosition[1] = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='尺寸' value={value.style.textShadow.textShadowSize} onChange={e => onChange(() => value.style.textShadow.textShadowSize = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='颜色' value={value.style.textShadow.textShadowColor} onChange={e => onChange(() => value.style.textShadow.textShadowColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='调色板' value={value.style.textShadow.textShadowColor} onChange={e => onChange(() => value.style.textShadow.textShadowColor = e.target.value)} type='color' />
          </Grid>
        </> : null
    }
  </>
}

export function TextStroke_C(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.textStroke = JSON.parse(JSON.stringify(defaultOuterAll.textStroke))
      } else {
        delete value.style.textStroke
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>文本描边</div>
      <Switch checked={value.style.textStroke !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.textStroke !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='宽度' value={value.style.textStroke.textStrokeWidth} onChange={e => onChange(() => value.style.textStroke.textStrokeWidth = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='颜色' value={value.style.textStroke.textStrokeColor} onChange={e => onChange(() => value.style.textStroke.textStrokeColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='调色板' value={value.style.textStroke.textStrokeColor} onChange={e => onChange(() => value.style.textStroke.textStrokeColor = e.target.value)} type='color' />
          </Grid>
        </> : null
    }
  </>
}