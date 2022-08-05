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

import { defaultOuterAll } from '../utils/graph.OuterStyle'

export function Render_C(props) {
  const { value, onChange } = props

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>渲染元素</div>
      <Switch checked={value.outer.render} onChange={e => onChange(() => value.outer.render = e.target.checked)} />
    </Grid>
  </>
}

export function Visible_C(props) {
  const { value, onChange } = props

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>显示元素</div>
      <Switch checked={value.outer.visible} onChange={e => onChange(() => value.outer.visible = e.target.checked)} />
    </Grid>
  </>
}

export function ToolButton(props) {
  const { value, onChange } = props

  const handleHorizontalCenter = () => {
    onChange(() => {
      if (value.outer.margin === undefined) {
        value.outer.margin = JSON.parse(JSON.stringify(defaultOuterAll.margin))
      }
      if (value.outer.position === undefined) {
        value.outer.position = JSON.parse(JSON.stringify(defaultOuterAll.position))
      }
      if (value.outer.inset === undefined) {
        value.outer.inset = JSON.parse(JSON.stringify(defaultOuterAll.inset))
      }

      value.outer.position = 'absolute'
      value.outer.inset[1] = '0'
      value.outer.inset[3] = '0'
      value.outer.margin[1] = 'auto'
      value.outer.margin[3] = 'auto'
    })
  }
  const handleVerticalCenter = () => {
    onChange(() => {
      if (value.outer.margin === undefined) {
        value.outer.margin = JSON.parse(JSON.stringify(defaultOuterAll.margin))
      }
      if (value.outer.position === undefined) {
        value.outer.position = JSON.parse(JSON.stringify(defaultOuterAll.position))
      }
      if (value.outer.inset === undefined) {
        value.outer.inset = JSON.parse(JSON.stringify(defaultOuterAll.inset))
      }

      value.outer.position = 'absolute'
      value.outer.inset[0] = '0'
      value.outer.inset[2] = '0'
      value.outer.margin[0] = 'auto'
      value.outer.margin[2] = 'auto'
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
        value.outer.width = JSON.parse(JSON.stringify(defaultOuterAll.width))
        value.outer.height = JSON.parse(JSON.stringify(defaultOuterAll.height))
      } else {
        delete value.outer.width
        delete value.outer.height
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>宽高</div>
      <Switch checked={value.outer.width !== undefined && value.outer.height !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.width !== undefined && value.outer.height !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField fullWidth label='宽度' value={value.outer.width} onChange={e => onChange(() => value.outer.width = e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label='高度' value={value.outer.height} onChange={e => onChange(() => value.outer.height = e.target.value)} />
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
        value.outer.minWidth = JSON.parse(JSON.stringify(defaultOuterAll.minWidth))
        value.outer.minHeight = JSON.parse(JSON.stringify(defaultOuterAll.minHeight))
        value.outer.maxWidth = JSON.parse(JSON.stringify(defaultOuterAll.maxWidth))
        value.outer.maxHeight = JSON.parse(JSON.stringify(defaultOuterAll.maxHeight))
      } else {
        delete value.outer.minWidth
        delete value.outer.minHeight
        delete value.outer.maxWidth
        delete value.outer.maxHeight
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>宽高限制</div>
      <Switch checked={value.outer.minWidth !== undefined && value.outer.minHeight !== undefined && value.outer.maxWidth !== undefined && value.outer.maxHeight !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.minWidth !== undefined && value.outer.minHeight !== undefined && value.outer.maxWidth !== undefined && value.outer.maxHeight !== undefined ?
        <>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={6}>
                <TextField fullWidth label='最小宽度' value={value.outer.minWidth} onChange={e => onChange(() => value.outer.minWidth = e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label='最小高度' value={value.outer.minHeight} onChange={e => onChange(() => value.outer.minHeight = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={6}>
                <TextField fullWidth label='最大宽度' value={value.outer.maxWidth} onChange={e => onChange(() => value.outer.maxWidth = e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label='最大高度' value={value.outer.maxHeight} onChange={e => onChange(() => value.outer.maxHeight = e.target.value)} />
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
        value.outer.position = JSON.parse(JSON.stringify(defaultOuterAll.position))
      } else {
        delete value.outer.position
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>定位</div>
      <Switch checked={value.outer.position !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.position !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>定位</InputLabel>
              <Select label='定位' value={value.outer.position} onChange={e => onChange(() => value.outer.position = e.target.value)}  >
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
        value.outer.inset = JSON.parse(JSON.stringify(defaultOuterAll.inset))
      } else {
        delete value.outer.inset
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>位置</div>
      <Switch checked={value.outer.inset !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.inset !== undefined ?
        <>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={3}>
                <TextField fullWidth label='上' value={value.outer.inset[0]} onChange={e => onChange(() => value.outer.inset[0] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth label='右' value={value.outer.inset[1]} onChange={e => onChange(() => value.outer.inset[1] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth label='下' value={value.outer.inset[2]} onChange={e => onChange(() => value.outer.inset[2] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth label='左' value={value.outer.inset[3]} onChange={e => onChange(() => value.outer.inset[3] = e.target.value)} />
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
        value.outer.display = JSON.parse(JSON.stringify(defaultOuterAll.display))
      } else {
        delete value.outer.display
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>布局</div>
      <Switch checked={value.outer.display !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.display !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>布局</InputLabel>
              <Select label='布局' value={value.outer.display} onChange={e => onChange(() => value.outer.display = e.target.value)}  >
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
        value.outer.zIndex = JSON.parse(JSON.stringify(defaultOuterAll.zIndex))
      } else {
        delete value.outer.zIndex
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>层级</div>
      <Switch checked={value.outer.zIndex !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.zIndex !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField fullWidth label='层级' value={value.outer.zIndex} onChange={e => onChange(() => value.outer.zIndex = e.target.value)} type='number' />
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
        value.outer.cursor = JSON.parse(JSON.stringify(defaultOuterAll.cursor))
      } else {
        delete value.outer.cursor
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>光标</div>
      <Switch checked={value.outer.cursor !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.cursor !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>光标</InputLabel>
              <Select label='光标' value={value.outer.cursor} onChange={e => onChange(() => value.outer.cursor = e.target.value)}  >
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
        value.outer.overflow = JSON.parse(JSON.stringify(defaultOuterAll.overflow))
      } else {
        delete value.outer.overflow
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>溢出</div>
      <Switch checked={value.outer.overflow !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.overflow !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>溢出</InputLabel>
              <Select label='溢出' value={value.outer.overflow} onChange={e => onChange(() => value.outer.overflow = e.target.value)}  >
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
        value.outer.verticalAlign = JSON.parse(JSON.stringify(defaultOuterAll.verticalAlign))
      } else {
        delete value.outer.verticalAlign
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>对齐</div>
      <Switch checked={value.outer.verticalAlign !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.verticalAlign !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>对齐</InputLabel>
              <Select label='对齐' value={value.outer.verticalAlign} onChange={e => onChange(() => value.outer.verticalAlign = e.target.value)}  >
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
        value.outer.padding = JSON.parse(JSON.stringify(defaultOuterAll.padding))
      } else {
        delete value.outer.padding
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>内间距</div>
      <Switch checked={value.outer.padding !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.padding !== undefined ?
        <>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={3}>
                <TextField fullWidth label='上' value={value.outer.padding[0]} onChange={e => onChange(() => value.outer.padding[0] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth label='右' value={value.outer.padding[1]} onChange={e => onChange(() => value.outer.padding[1] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth label='下' value={value.outer.padding[2]} onChange={e => onChange(() => value.outer.padding[2] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth label='左' value={value.outer.padding[3]} onChange={e => onChange(() => value.outer.padding[3] = e.target.value)} />
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
        value.outer.margin = JSON.parse(JSON.stringify(defaultOuterAll.margin))
      } else {
        delete value.outer.margin
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>外间距</div>
      <Switch checked={value.outer.margin !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.margin !== undefined ?
        <>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={3}>
                <TextField fullWidth label='上' value={value.outer.margin[0]} onChange={e => onChange(() => value.outer.margin[0] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth label='右' value={value.outer.margin[1]} onChange={e => onChange(() => value.outer.margin[1] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth label='下' value={value.outer.margin[2]} onChange={e => onChange(() => value.outer.margin[2] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth label='左' value={value.outer.margin[3]} onChange={e => onChange(() => value.outer.margin[3] = e.target.value)} />
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
        value.outer.flex = JSON.parse(JSON.stringify(defaultOuterAll.flex))
      } else {
        delete value.outer.flex
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>弹性</div>
      <Switch checked={value.outer.flex !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.flex !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>方向</InputLabel>
              <Select label='方向' value={value.outer.flex.flexDirection} onChange={e => onChange(() => value.outer.flex.flexDirection = e.target.value)}  >
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
              <Select label='换行' value={value.outer.flex.flexWrap} onChange={e => onChange(() => value.outer.flex.flexWrap = e.target.value)}  >
                <MenuItem value='nowrap'>不换行</MenuItem>
                <MenuItem value='wrap'>换行</MenuItem>
                <MenuItem value='wrap-reverse'>换行（逆向）</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>水平布局</InputLabel>
              <Select label='水平布局' value={value.outer.flex.justifyContent} onChange={e => onChange(() => value.outer.flex.justifyContent = e.target.value)}  >
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
              <Select label='垂直布局' value={value.outer.flex.alignItems} onChange={e => onChange(() => value.outer.flex.alignItems = e.target.value)}  >
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
              <Select label='轴布局' value={value.outer.flex.alignContent} onChange={e => onChange(() => value.outer.flex.alignContent = e.target.value)}  >
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
            <TextField fullWidth label='单元 扩展量' value={value.outer.flex.flexGrow} onChange={e => onChange(() => value.outer.flex.flexGrow = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label='单元 收缩量' value={value.outer.flex.flexShrink} onChange={e => onChange(() => value.outer.flex.flexShrink = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label='单元 初始长度' value={value.outer.flex.flexBasis} onChange={e => onChange(() => value.outer.flex.flexBasis = e.target.value)} />
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
        value.outer.transform = JSON.parse(JSON.stringify(defaultOuterAll.transform))
      } else {
        delete value.outer.transform
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>变化</div>
      <Switch checked={value.outer.transform !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.transform !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>呈现形式</InputLabel>
              <Select label='呈现形式' value={value.outer.transform.transformStyle} onChange={e => onChange(() => value.outer.transform.transformStyle = e.target.value)}  >
                <MenuItem value='flat'>平面</MenuItem>
                <MenuItem value='preserve-3d'>立体</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label='透视距离' value={value.outer.transform.perspective} onChange={e => onChange(() => value.outer.transform.perspective = e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={4}>
                <TextField fullWidth label='基点 X' value={value.outer.transform.transformOrigin[0]} onChange={e => onChange(() => value.outer.transform.transformOrigin[0] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth label='基点 Y' value={value.outer.transform.transformOrigin[1]} onChange={e => onChange(() => value.outer.transform.transformOrigin[1] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth label='基点 Z' value={value.outer.transform.transformOrigin[2]} onChange={e => onChange(() => value.outer.transform.transformOrigin[2] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={4}>
                <TextField fullWidth label='平移 X' value={value.outer.transform.transformTranslate[0]} onChange={e => onChange(() => value.outer.transform.transformTranslate[0] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth label='平移 Y' value={value.outer.transform.transformTranslate[1]} onChange={e => onChange(() => value.outer.transform.transformTranslate[1] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth label='平移 Z' value={value.outer.transform.transformTranslate[2]} onChange={e => onChange(() => value.outer.transform.transformTranslate[2] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={4}>
                <TextField fullWidth type='number' label='旋转 X' value={value.outer.transform.transformRotate[0]} onChange={e => onChange(() => value.outer.transform.transformRotate[0] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth type='number' label='旋转 Y' value={value.outer.transform.transformRotate[1]} onChange={e => onChange(() => value.outer.transform.transformRotate[1] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth type='number' label='旋转 Z' value={value.outer.transform.transformRotate[2]} onChange={e => onChange(() => value.outer.transform.transformRotate[2] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={4}>
                <TextField fullWidth type='number' label='缩放 X' value={value.outer.transform.transformScale[0]} onChange={e => onChange(() => value.outer.transform.transformScale[0] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth type='number' label='缩放 Y' value={value.outer.transform.transformScale[1]} onChange={e => onChange(() => value.outer.transform.transformScale[1] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth type='number' label='缩放 Z' value={value.outer.transform.transformScale[2]} onChange={e => onChange(() => value.outer.transform.transformScale[2] = e.target.value)} />
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
        value.outer.transition = JSON.parse(JSON.stringify(defaultOuterAll.transition))
      } else {
        delete value.outer.transition
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>过渡</div>
      <Switch checked={value.outer.transition !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.transition !== undefined ?
        <>
          <Grid item xs={12}>
            <div>时间</div>
            <Slider value={value.outer.transition.transitionTime} onChange={(e, v) => onChange(() => value.outer.transition.transitionTime = v)} min={0} max={2} step={0.01} valueLabelDisplay='auto' />
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
        value.outer.filter = JSON.parse(JSON.stringify(defaultOuterAll.filter))
      } else {
        delete value.outer.filter
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>滤镜</div>
      <Switch checked={value.outer.filter !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.filter !== undefined ?
        <>
          <Grid item xs={12}>
            <div>模糊</div>
            <Slider value={value.outer.filter.filterBlur} onChange={(e, v) => onChange(() => value.outer.filter.filterBlur = v)} min={0} max={50} step={1} valueLabelDisplay='auto' />
          </Grid>
          <Grid item xs={12}>
            <div>亮暗</div>
            <Slider value={value.outer.filter.filterBrightness} onChange={(e, v) => onChange(() => value.outer.filter.filterBrightness = v)} min={0} max={200} step={1} valueLabelDisplay='auto' />
          </Grid>
          <Grid item xs={12}>
            <div>透明</div>
            <Slider value={value.outer.filter.filterOpacity} onChange={(e, v) => onChange(() => value.outer.filter.filterOpacity = v)} min={0} max={100} step={1} valueLabelDisplay='auto' />
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
        value.outer.border = JSON.parse(JSON.stringify(defaultOuterAll.border))
      } else {
        delete value.outer.border
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>边框</div>
      <Switch checked={value.outer.border !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.border !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField fullWidth label='宽度' value={value.outer.border.borderWidth} onChange={e => onChange(() => value.outer.border.borderWidth = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={8}>
            <TextField fullWidth label='颜色' value={value.outer.border.borderColor} onChange={e => onChange(() => value.outer.border.borderColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label='调色板' value={value.outer.border.borderColor} onChange={e => onChange(() => value.outer.border.borderColor = e.target.value)} type='color' />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>线条类型</InputLabel>
              <Select label='线条类型' value={value.outer.border.borderStyle} onChange={e => onChange(() => value.outer.border.borderStyle = e.target.value)}>
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
              <Select label='位置' value={value.outer.border.borderPosition} onChange={e => onChange(() => value.outer.border.borderPosition = e.target.value)} multiple>
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
        value.outer.borderRadius = JSON.parse(JSON.stringify(defaultOuterAll.borderRadius))
      } else {
        delete value.outer.borderRadius
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>圆角</div>
      <Switch checked={value.outer.borderRadius !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.borderRadius !== undefined ?
        <>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={3}>
                <TextField fullWidth label='左上' value={value.outer.borderRadius[0]} onChange={e => onChange(() => value.outer.borderRadius[0] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth label='右上' value={value.outer.borderRadius[1]} onChange={e => onChange(() => value.outer.borderRadius[1] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth label='右下' value={value.outer.borderRadius[2]} onChange={e => onChange(() => value.outer.borderRadius[2] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth label='左下' value={value.outer.borderRadius[3]} onChange={e => onChange(() => value.outer.borderRadius[3] = e.target.value)} />
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
        value.outer.boxShadow = JSON.parse(JSON.stringify(defaultOuterAll.boxShadow))
      } else {
        delete value.outer.boxShadow
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>阴影</div>
      <Switch checked={value.outer.boxShadow !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.boxShadow !== undefined ?
        <>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>内阴影</div>
            <Switch checked={value.outer.boxShadow.boxShadowInset} onChange={e => onChange(() => value.outer.boxShadow.boxShadowInset = e.target.checked)} />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label='位置 X' value={value.outer.boxShadow.boxShadowPosition[0]} onChange={e => onChange(() => value.outer.boxShadow.boxShadowPosition[0] = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label='位置 Y' value={value.outer.boxShadow.boxShadowPosition[1]} onChange={e => onChange(() => value.outer.boxShadow.boxShadowPosition[1] = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label='尺寸' value={value.outer.boxShadow.boxShadowSize} onChange={e => onChange(() => value.outer.boxShadow.boxShadowSize = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={8}>
            <TextField fullWidth label='颜色' value={value.outer.boxShadow.boxShadowColor} onChange={e => onChange(() => value.outer.boxShadow.boxShadowColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label='调色板' value={value.outer.boxShadow.boxShadowColor} onChange={e => onChange(() => value.outer.boxShadow.boxShadowColor = e.target.value)} type='color' />
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
        value.outer.outline = JSON.parse(JSON.stringify(defaultOuterAll.outline))
      } else {
        delete value.outer.outline
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>轮廓</div>
      <Switch checked={value.outer.outline !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.outline !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField fullWidth label='宽度' value={value.outer.outline.outlineWidth} onChange={e => onChange(() => value.outer.outline.outlineWidth = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={8}>
            <TextField fullWidth label='颜色' value={value.outer.outline.outlineColor} onChange={e => onChange(() => value.outer.outline.outlineColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label='调色板' value={value.outer.outline.outlineColor} onChange={e => onChange(() => value.outer.outline.outlineColor = e.target.value)} type='color' />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>线条类型</InputLabel>
              <Select label='线条类型' value={value.outer.outline.outlineStyle} onChange={e => onChange(() => value.outer.outline.outlineStyle = e.target.value)}  >
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
        value.outer.background = JSON.parse(JSON.stringify(defaultOuterAll.background))
      } else {
        delete value.outer.background
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>背景</div>
      <Switch checked={value.outer.background !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.background !== undefined ?
        <>
          <Grid item xs={8}>
            <TextField fullWidth label='颜色' value={value.outer.background.backgroundColor} onChange={e => onChange(() => value.outer.background.backgroundColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label='调色板' value={value.outer.background.backgroundColor} onChange={e => onChange(() => value.outer.background.backgroundColor = e.target.value)} type='color' />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label='图片' value={value.outer.background.backgroundImage} onChange={e => onChange(() => value.outer.background.backgroundImage = e.target.value)} multiline maxRows={4} />
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                <TextField fullWidth label='位置 X' value={value.outer.background.backgroundPosition[0]} onChange={e => onChange(() => value.outer.background.backgroundPosition[0] = e.target.value)} multiline maxRows={4} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label='位置 Y' value={value.outer.background.backgroundPosition[1]} onChange={e => onChange(() => value.outer.background.backgroundPosition[1] = e.target.value)} multiline maxRows={4} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                <TextField fullWidth label='尺寸 X' value={value.outer.background.backgroundSize[0]} onChange={e => onChange(() => value.outer.background.backgroundSize[0] = e.target.value)} multiline maxRows={4} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label='尺寸 Y' value={value.outer.background.backgroundSize[1]} onChange={e => onChange(() => value.outer.background.backgroundSize[1] = e.target.value)} multiline maxRows={4} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>重复填充</InputLabel>
              <Select label='重复填充' value={value.outer.background.backgroundRepeat} onChange={e => onChange(() => value.outer.background.backgroundRepeat = e.target.value)}  >
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
              <Select label='跟随滑动' value={value.outer.background.backgroundAttachment} onChange={e => onChange(() => value.outer.background.backgroundAttachment = e.target.value)}  >
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
        value.outer.font = JSON.parse(JSON.stringify(defaultOuterAll.font))
      } else {
        delete value.outer.font
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>字体</div>
      <Switch checked={value.outer.font !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.font !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField fullWidth type='number' label='尺寸' value={value.outer.font.fontSize} onChange={e => onChange(() => value.outer.font.fontSize = e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>粗细</InputLabel>
              <Select value={value.outer.font.fontWeight} label='粗细' onChange={e => onChange(() => value.outer.font.fontWeight = e.target.value)}>
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
              multiple
              options={['"Times New Roman"']}
              value={value.outer.font.fontFamily.split(',').filter(i => i)}
              onChange={(e, v) => onChange(() => value.outer.font.fontFamily = v.join(','))}
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
        value.outer.text = JSON.parse(JSON.stringify(defaultOuterAll.text))
      } else {
        delete value.outer.text
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>文本</div>
      <Switch checked={value.outer.text !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.text !== undefined ?
        <>
          <Grid item xs={4}>
            <TextField fullWidth type='number' label='行高' value={value.outer.text.lineHeight} onChange={e => onChange(() => value.outer.text.lineHeight = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth type='number' label='字符间距' value={value.outer.text.letterSpacing} onChange={e => onChange(() => value.outer.text.letterSpacing = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>对齐</InputLabel>
              <Select value={value.outer.text.textAlign} label='对齐' onChange={e => onChange(() => value.outer.text.textAlign = e.target.value)}>
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
              <Select value={value.outer.text.whiteSpace} label='换行' onChange={e => onChange(() => value.outer.text.whiteSpace = e.target.value)}>
                <MenuItem value='normal'>默认</MenuItem>
                <MenuItem value='nowrap'>不换行</MenuItem>
                <MenuItem value='pre-wrap'>保留空格换行</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <TextField fullWidth label='颜色' value={value.outer.text.color} onChange={e => onChange(() => value.outer.text.color = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label='调色板' value={value.outer.text.color} onChange={e => onChange(() => value.outer.text.color = e.target.value)} type='color' />
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
        value.outer.textDecoration = JSON.parse(JSON.stringify(defaultOuterAll.textDecoration))
      } else {
        delete value.outer.textDecoration
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>文本装饰</div>
      <Switch checked={value.outer.textDecoration !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.textDecoration !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>位置</InputLabel>
              <Select value={value.outer.textDecoration.textDecorationLine} label='位置' onChange={e => onChange(() => value.outer.textDecoration.textDecorationLine = e.target.value)}>
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
              <Select value={value.outer.textDecoration.textDecorationStyle} label='线条类型' onChange={e => onChange(() => value.outer.textDecoration.textDecorationStyle = e.target.value)}>
                <MenuItem value='solid'>实线</MenuItem>
                <MenuItem value='double'>双线</MenuItem>
                <MenuItem value='dashed'>虚线</MenuItem>
                <MenuItem value='dotted'>点线</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <TextField fullWidth label='颜色' value={value.outer.textDecoration.textDecorationColor} onChange={e => onChange(() => value.outer.textDecoration.textDecorationColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label='调色板' value={value.outer.textDecoration.textDecorationColor} onChange={e => onChange(() => value.outer.textDecoration.textDecorationColor = e.target.value)} type='color' />
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
        value.outer.textShadow = JSON.parse(JSON.stringify(defaultOuterAll.textShadow))
      } else {
        delete value.outer.textShadow
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>文本阴影</div>
      <Switch checked={value.outer.textShadow !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.textShadow !== undefined ?
        <>
          <Grid item xs={4}>
            <TextField fullWidth label='位置 X' value={value.outer.textShadow.textShadowPosition[0]} onChange={e => onChange(() => value.outer.textShadow.textShadowPosition[0] = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label='位置 Y' value={value.outer.textShadow.textShadowPosition[1]} onChange={e => onChange(() => value.outer.textShadow.textShadowPosition[1] = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label='尺寸' value={value.outer.textShadow.textShadowSize} onChange={e => onChange(() => value.outer.textShadow.textShadowSize = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={8}>
            <TextField fullWidth label='颜色' value={value.outer.textShadow.textShadowColor} onChange={e => onChange(() => value.outer.textShadow.textShadowColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label='调色板' value={value.outer.textShadow.textShadowColor} onChange={e => onChange(() => value.outer.textShadow.textShadowColor = e.target.value)} type='color' />
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
        value.outer.textStroke = JSON.parse(JSON.stringify(defaultOuterAll.textStroke))
      } else {
        delete value.outer.textStroke
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>文本描边</div>
      <Switch checked={value.outer.textStroke !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outer.textStroke !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField fullWidth label='宽度' value={value.outer.textStroke.textStrokeWidth} onChange={e => onChange(() => value.outer.textStroke.textStrokeWidth = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={8}>
            <TextField fullWidth label='颜色' value={value.outer.textStroke.textStrokeColor} onChange={e => onChange(() => value.outer.textStroke.textStrokeColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label='调色板' value={value.outer.textStroke.textStrokeColor} onChange={e => onChange(() => value.outer.textStroke.textStrokeColor = e.target.value)} type='color' />
          </Grid>
        </> : null
    }
  </>
}