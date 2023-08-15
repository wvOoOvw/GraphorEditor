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

import { defaultStyle } from './utils.graph.style'
import { TooltipSX, TextFieldSX, AutocompleteSX, SelectSX } from './utils.mui.sx'

export function Render(props) {
  const { value, onChange } = props

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Use</div>
      <Switch checked={value.style.use} onChange={e => onChange(() => value.style.use = e.target.checked)} />
    </Grid>
  </>
}

export function ClassName(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.className = JSON.parse(JSON.stringify(defaultStyle.className))
      } else {
        delete value.style.className
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Class Name</div>
      <Switch checked={value.style.className !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.className !== undefined ?
        <>
          <Grid item xs={12}>
            <Autocomplete
              {...AutocompleteSX}
              multiple
              options={[]}
              value={value.style.className}
              onChange={(e, v) => onChange(() => value.style.className = v)}
              renderInput={(params) => <TextField {...params} label='Class Name' />}
            />
          </Grid>
        </> : null
    }
  </>
}

export function Visible(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.visible = JSON.parse(JSON.stringify(defaultStyle.visible))
      } else {
        delete value.style.visible
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Visible</div>
      <Switch checked={value.style.visible !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.visible !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Visible</InputLabel>
              <Select {...SelectSX} label='Visible' value={value.style.visible} onChange={e => onChange(() => value.style.visible = e.target.value)}  >
                <MenuItem value='visible'>Visible</MenuItem>
                <MenuItem value='hidden'>Hidden</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </> : null
    }
  </>
}

export function ToolButton(props) {
  const { value, onChange } = props

  const handleHorizontalCenter = () => {
    onChange(() => {
      if (value.style.margin === undefined) {
        value.style.margin = JSON.parse(JSON.stringify(defaultStyle.margin))
      }
      if (value.style.position === undefined) {
        value.style.position = JSON.parse(JSON.stringify(defaultStyle.position))
      }
      if (value.style.inset === undefined) {
        value.style.inset = JSON.parse(JSON.stringify(defaultStyle.inset))
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
        value.style.margin = JSON.parse(JSON.stringify(defaultStyle.margin))
      }
      if (value.style.position === undefined) {
        value.style.position = JSON.parse(JSON.stringify(defaultStyle.position))
      }
      if (value.style.inset === undefined) {
        value.style.inset = JSON.parse(JSON.stringify(defaultStyle.inset))
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

export function Size(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.width = JSON.parse(JSON.stringify(defaultStyle.width))
        value.style.height = JSON.parse(JSON.stringify(defaultStyle.height))
      } else {
        delete value.style.width
        delete value.style.height
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Width & Height</div>
      <Switch checked={value.style.width !== undefined && value.style.height !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.width !== undefined && value.style.height !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Width' value={value.style.width} onChange={e => onChange(() => value.style.width = e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Height' value={value.style.height} onChange={e => onChange(() => value.style.height = e.target.value)} />
          </Grid>
        </> : null
    }
  </>
}

export function SizeLimit(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.minWidth = JSON.parse(JSON.stringify(defaultStyle.minWidth))
        value.style.minHeight = JSON.parse(JSON.stringify(defaultStyle.minHeight))
        value.style.maxWidth = JSON.parse(JSON.stringify(defaultStyle.maxWidth))
        value.style.maxHeight = JSON.parse(JSON.stringify(defaultStyle.maxHeight))
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
      <div>Max Width & Min Height</div>
      <Switch checked={value.style.minWidth !== undefined && value.style.minHeight !== undefined && value.style.maxWidth !== undefined && value.style.maxHeight !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.minWidth !== undefined && value.style.minHeight !== undefined && value.style.maxWidth !== undefined && value.style.maxHeight !== undefined ?
        <>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='Min Width' value={value.style.minWidth} onChange={e => onChange(() => value.style.minWidth = e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='Min Height' value={value.style.minHeight} onChange={e => onChange(() => value.style.minHeight = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='Max Width' value={value.style.maxWidth} onChange={e => onChange(() => value.style.maxWidth = e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='Max Height' value={value.style.maxHeight} onChange={e => onChange(() => value.style.maxHeight = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
        </> : null
    }
  </>
}

export function Position(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.position = JSON.parse(JSON.stringify(defaultStyle.position))
      } else {
        delete value.style.position
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Position</div>
      <Switch checked={value.style.position !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.position !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Position</InputLabel>
              <Select {...SelectSX} label='Position' value={value.style.position} onChange={e => onChange(() => value.style.position = e.target.value)}  >
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

export function Inset(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.inset = JSON.parse(JSON.stringify(defaultStyle.inset))
      } else {
        delete value.style.inset
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Inset</div>
      <Switch checked={value.style.inset !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.inset !== undefined ?
        <>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Top' value={value.style.inset[0]} onChange={e => onChange(() => value.style.inset[0] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Right' value={value.style.inset[1]} onChange={e => onChange(() => value.style.inset[1] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Bottom' value={value.style.inset[2]} onChange={e => onChange(() => value.style.inset[2] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Left' value={value.style.inset[3]} onChange={e => onChange(() => value.style.inset[3] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
        </> : null
    }
  </>
}

export function Display(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.display = JSON.parse(JSON.stringify(defaultStyle.display))
      } else {
        delete value.style.display
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Display</div>
      <Switch checked={value.style.display !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.display !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Display</InputLabel>
              <Select {...SelectSX} label='Display' value={value.style.display} onChange={e => onChange(() => value.style.display = e.target.value)}  >
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

export function ZIndex(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.zIndex = JSON.parse(JSON.stringify(defaultStyle.zIndex))
      } else {
        delete value.style.zIndex
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Z-Index</div>
      <Switch checked={value.style.zIndex !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.zIndex !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Z-Index' value={value.style.zIndex} onChange={e => onChange(() => value.style.zIndex = e.target.value)} type='number' />
          </Grid>
        </> : null
    }
  </>
}

export function Cursor(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.cursor = JSON.parse(JSON.stringify(defaultStyle.cursor))
      } else {
        delete value.style.cursor
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Cursor</div>
      <Switch checked={value.style.cursor !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.cursor !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Cursor</InputLabel>
              <Select {...SelectSX} label='Cursor' value={value.style.cursor} onChange={e => onChange(() => value.style.cursor = e.target.value)}  >
                <MenuItem value='default'>default</MenuItem>
                <MenuItem value='pointer'>pointer</MenuItem>
                <MenuItem value='move'>move</MenuItem>
                <MenuItem value='text'>text</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </> : null
    }
  </>
}

export function Overflow(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.overflow = JSON.parse(JSON.stringify(defaultStyle.overflow))
      } else {
        delete value.style.overflow
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Overflow</div>
      <Switch checked={value.style.overflow !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.overflow !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Overflow</InputLabel>
              <Select {...SelectSX} label='Overflow' value={value.style.overflow} onChange={e => onChange(() => value.style.overflow = e.target.value)}  >
                <MenuItem value='visible'>visible</MenuItem>
                <MenuItem value='hidden'>hidden</MenuItem>
                <MenuItem value='auto'>auto</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </> : null
    }
  </>
}

export function VerticalAlign(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.verticalAlign = JSON.parse(JSON.stringify(defaultStyle.verticalAlign))
      } else {
        delete value.style.verticalAlign
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Vertical Align</div>
      <Switch checked={value.style.verticalAlign !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.verticalAlign !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Vertical Align</InputLabel>
              <Select {...SelectSX} label='Vertical Align' value={value.style.verticalAlign} onChange={e => onChange(() => value.style.verticalAlign = e.target.value)}  >
                <MenuItem value='baseline'>baseline</MenuItem>
                <MenuItem value='top'>top</MenuItem>
                <MenuItem value='middle'>middle</MenuItem>
                <MenuItem value='bottom'>bottom</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </> : null
    }
  </>
}

export function Padding(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.padding = JSON.parse(JSON.stringify(defaultStyle.padding))
      } else {
        delete value.style.padding
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Padding</div>
      <Switch checked={value.style.padding !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.padding !== undefined ?
        <>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Top' value={value.style.padding[0]} onChange={e => onChange(() => value.style.padding[0] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Right' value={value.style.padding[1]} onChange={e => onChange(() => value.style.padding[1] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Bottom' value={value.style.padding[2]} onChange={e => onChange(() => value.style.padding[2] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Left' value={value.style.padding[3]} onChange={e => onChange(() => value.style.padding[3] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
        </> : null
    }
  </>
}

export function Margin(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.margin = JSON.parse(JSON.stringify(defaultStyle.margin))
      } else {
        delete value.style.margin
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Margin</div>
      <Switch checked={value.style.margin !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.margin !== undefined ?
        <>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='top' value={value.style.margin[0]} onChange={e => onChange(() => value.style.margin[0] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='right' value={value.style.margin[1]} onChange={e => onChange(() => value.style.margin[1] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='bottom' value={value.style.margin[2]} onChange={e => onChange(() => value.style.margin[2] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='left' value={value.style.margin[3]} onChange={e => onChange(() => value.style.margin[3] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
        </> : null
    }
  </>
}

export function Flex(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.flex = JSON.parse(JSON.stringify(defaultStyle.flex))
      } else {
        delete value.style.flex
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Flex</div>
      <Switch checked={value.style.flex !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.flex !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Flex Direction</InputLabel>
              <Select {...SelectSX} label='Flex Direction' value={value.style.flex.flexDirection} onChange={e => onChange(() => value.style.flex.flexDirection = e.target.value)}  >
                <MenuItem value='row'>row</MenuItem>
                <MenuItem value='row-reverse'>row-reverse</MenuItem>
                <MenuItem value='column'>column</MenuItem>
                <MenuItem value='column-reverse'>垂column-reverse</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Flex Wrap</InputLabel>
              <Select {...SelectSX} label='Flex Wrap' value={value.style.flex.flexWrap} onChange={e => onChange(() => value.style.flex.flexWrap = e.target.value)}  >
                <MenuItem value='nowrap'>nowrap</MenuItem>
                <MenuItem value='wrap'>wrap</MenuItem>
                <MenuItem value='wrap-reverse'>wrap-reverse</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Justify Content</InputLabel>
              <Select {...SelectSX} label='Justify Content' value={value.style.flex.justifyContent} onChange={e => onChange(() => value.style.flex.justifyContent = e.target.value)}  >
                <MenuItem value='flex-start'>flex-start</MenuItem>
                <MenuItem value='flex-end'>flex-end</MenuItem>
                <MenuItem value='center'>center</MenuItem>
                <MenuItem value='space-between'>space-between</MenuItem>
                <MenuItem value='space-around'>space-around</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Align Items</InputLabel>
              <Select {...SelectSX} label='Align Items' value={value.style.flex.alignItems} onChange={e => onChange(() => value.style.flex.alignItems = e.target.value)}  >
                <MenuItem value='stretch'>stretch</MenuItem>
                <MenuItem value='flex-start'>flex-start</MenuItem>
                <MenuItem value='flex-end'>flex-end</MenuItem>
                <MenuItem value='center'>center</MenuItem>
                <MenuItem value='baseline'>baseline</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Align Content</InputLabel>
              <Select {...SelectSX} label='Align Content' value={value.style.flex.alignContent} onChange={e => onChange(() => value.style.flex.alignContent = e.target.value)}  >
                <MenuItem value='stretch'>stretch</MenuItem>
                <MenuItem value='flex-start'>flex-start</MenuItem>
                <MenuItem value='flex-end'>flex-end</MenuItem>
                <MenuItem value='center'>center</MenuItem>
                <MenuItem value='space-between'>space-between</MenuItem>
                <MenuItem value='space-around'>space-around</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField {...TextFieldSX} fullWidth label='Flex Grow' value={value.style.flex.flexGrow} onChange={e => onChange(() => value.style.flex.flexGrow = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={6}>
            <TextField {...TextFieldSX} fullWidth label='Flex Shrink' value={value.style.flex.flexShrink} onChange={e => onChange(() => value.style.flex.flexShrink = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Flex Basis' value={value.style.flex.flexBasis} onChange={e => onChange(() => value.style.flex.flexBasis = e.target.value)} />
          </Grid>
        </> : null
    }
  </>
}

export function Transform(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.transform = JSON.parse(JSON.stringify(defaultStyle.transform))
      } else {
        delete value.style.transform
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Transform</div>
      <Switch checked={value.style.transform !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.transform !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Transform Style</InputLabel>
              <Select {...SelectSX} label='Transform Style' value={value.style.transform.transformStyle} onChange={e => onChange(() => value.style.transform.transformStyle = e.target.value)}  >
                <MenuItem value='flat'>flat</MenuItem>
                <MenuItem value='preserve-3d'>preserve-3d</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Perspective' value={value.style.transform.perspective} onChange={e => onChange(() => value.style.transform.perspective = e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth label='Transform Origin X' value={value.style.transform.transformOrigin[0]} onChange={e => onChange(() => value.style.transform.transformOrigin[0] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth label='Transform Origin Y' value={value.style.transform.transformOrigin[1]} onChange={e => onChange(() => value.style.transform.transformOrigin[1] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth label='Transform Origin Z' value={value.style.transform.transformOrigin[2]} onChange={e => onChange(() => value.style.transform.transformOrigin[2] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth label='Transform Translate X' value={value.style.transform.transformTranslate[0]} onChange={e => onChange(() => value.style.transform.transformTranslate[0] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth label='Transform Translate Y' value={value.style.transform.transformTranslate[1]} onChange={e => onChange(() => value.style.transform.transformTranslate[1] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth label='Transform Translate Z' value={value.style.transform.transformTranslate[2]} onChange={e => onChange(() => value.style.transform.transformTranslate[2] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth type='number' label='Transform Rotate X' value={value.style.transform.transformRotate[0]} onChange={e => onChange(() => value.style.transform.transformRotate[0] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth type='number' label='Transform Rotate Y' value={value.style.transform.transformRotate[1]} onChange={e => onChange(() => value.style.transform.transformRotate[1] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth type='number' label='Transform Rotate Z' value={value.style.transform.transformRotate[2]} onChange={e => onChange(() => value.style.transform.transformRotate[2] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth type='number' label='Transform Scale X' value={value.style.transform.transformScale[0]} onChange={e => onChange(() => value.style.transform.transformScale[0] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth type='number' label='Transform Scale Y' value={value.style.transform.transformScale[1]} onChange={e => onChange(() => value.style.transform.transformScale[1] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth type='number' label='Transform Scale Z' value={value.style.transform.transformScale[2]} onChange={e => onChange(() => value.style.transform.transformScale[2] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
        </> : null
    }
  </>
}

export function Transition(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.transition = JSON.parse(JSON.stringify(defaultStyle.transition))
      } else {
        delete value.style.transition
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Transition</div>
      <Switch checked={value.style.transition !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.transition !== undefined ?
        <>
          <Grid item xs={12}>
            <div>Transition Time</div>
            <Slider value={value.style.transition.transitionTime} onChange={(e, v) => onChange(() => value.style.transition.transitionTime = v)} min={0} max={2} step={0.01} valueLabelDisplay='auto' />
          </Grid>
        </> : null
    }
  </>
}

export function Filter(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.filter = JSON.parse(JSON.stringify(defaultStyle.filter))
      } else {
        delete value.style.filter
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Filter</div>
      <Switch checked={value.style.filter !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.filter !== undefined ?
        <>
          <Grid item xs={12}>
            <div>Filter Blur</div>
            <Slider value={value.style.filter.filterBlur} onChange={(e, v) => onChange(() => value.style.filter.filterBlur = v)} min={0} max={50} step={1} valueLabelDisplay='auto' />
          </Grid>
          <Grid item xs={12}>
            <div>Filter Brightness</div>
            <Slider value={value.style.filter.filterBrightness} onChange={(e, v) => onChange(() => value.style.filter.filterBrightness = v)} min={0} max={200} step={1} valueLabelDisplay='auto' />
          </Grid>
          <Grid item xs={12}>
            <div>Filter Opacity</div>
            <Slider value={value.style.filter.filterOpacity} onChange={(e, v) => onChange(() => value.style.filter.filterOpacity = v)} min={0} max={100} step={1} valueLabelDisplay='auto' />
          </Grid>
        </> : null
    }
  </>
}

export function Border(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.border = JSON.parse(JSON.stringify(defaultStyle.border))
      } else {
        delete value.style.border
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Border</div>
      <Switch checked={value.style.border !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.border !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Border Width' value={value.style.border.borderWidth} onChange={e => onChange(() => value.style.border.borderWidth = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='Border Color' value={value.style.border.borderColor} onChange={e => onChange(() => value.style.border.borderColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Border Color' value={value.style.border.borderColor} onChange={e => onChange(() => value.style.border.borderColor = e.target.value)} type='color' />
          </Grid>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Border Style</InputLabel>
              <Select {...SelectSX} label='Border Style' value={value.style.border.borderStyle} onChange={e => onChange(() => value.style.border.borderStyle = e.target.value)}>
                <MenuItem value='solid'>solid</MenuItem>
                <MenuItem value='double'>double</MenuItem>
                <MenuItem value='dashed'>dashed</MenuItem>
                <MenuItem value='dotted'>dotted</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Border Position</InputLabel>
              <Select {...SelectSX} label='Border Position' value={value.style.border.borderPosition} onChange={e => onChange(() => value.style.border.borderPosition = e.target.value)} multiple>
                <MenuItem value='top'>top</MenuItem>
                <MenuItem value='bottom'>bottom</MenuItem>
                <MenuItem value='left'>left</MenuItem>
                <MenuItem value='right'>right</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </> : null
    }
  </>
}

export function BorderRadius(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.borderRadius = JSON.parse(JSON.stringify(defaultStyle.borderRadius))
      } else {
        delete value.style.borderRadius
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Border Radius</div>
      <Switch checked={value.style.borderRadius !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.borderRadius !== undefined ?
        <>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Left Top' value={value.style.borderRadius[0]} onChange={e => onChange(() => value.style.borderRadius[0] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Right Top' value={value.style.borderRadius[1]} onChange={e => onChange(() => value.style.borderRadius[1] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Right Bottom' value={value.style.borderRadius[2]} onChange={e => onChange(() => value.style.borderRadius[2] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Left Bottom' value={value.style.borderRadius[3]} onChange={e => onChange(() => value.style.borderRadius[3] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
        </> : null
    }
  </>
}

export function BoxShadow(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.boxShadow = JSON.parse(JSON.stringify(defaultStyle.boxShadow))
      } else {
        delete value.style.boxShadow
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Box Shadow</div>
      <Switch checked={value.style.boxShadow !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.boxShadow !== undefined ?
        <>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>Box Shadow Inset</div>
            <Switch checked={value.style.boxShadow.boxShadowInset} onChange={e => onChange(() => value.style.boxShadow.boxShadowInset = e.target.checked)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Box Shadow Position X' value={value.style.boxShadow.boxShadowPosition[0]} onChange={e => onChange(() => value.style.boxShadow.boxShadowPosition[0] = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Box Shadow Position Y' value={value.style.boxShadow.boxShadowPosition[1]} onChange={e => onChange(() => value.style.boxShadow.boxShadowPosition[1] = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Box Shadow Size' value={value.style.boxShadow.boxShadowSize} onChange={e => onChange(() => value.style.boxShadow.boxShadowSize = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='Box Shadow Color' value={value.style.boxShadow.boxShadowColor} onChange={e => onChange(() => value.style.boxShadow.boxShadowColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Box Shadow Color' value={value.style.boxShadow.boxShadowColor} onChange={e => onChange(() => value.style.boxShadow.boxShadowColor = e.target.value)} type='color' />
          </Grid>

        </> : null
    }
  </>
}

export function Outline(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.outline = JSON.parse(JSON.stringify(defaultStyle.outline))
      } else {
        delete value.style.outline
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Outline</div>
      <Switch checked={value.style.outline !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.outline !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Outline Width' value={value.style.outline.outlineWidth} onChange={e => onChange(() => value.style.outline.outlineWidth = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='Outline Color' value={value.style.outline.outlineColor} onChange={e => onChange(() => value.style.outline.outlineColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Outline Color' value={value.style.outline.outlineColor} onChange={e => onChange(() => value.style.outline.outlineColor = e.target.value)} type='color' />
          </Grid>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Outline Style</InputLabel>
              <Select {...SelectSX} label='Outline Style' value={value.style.outline.outlineStyle} onChange={e => onChange(() => value.style.outline.outlineStyle = e.target.value)}  >
                <MenuItem value='solid'>solid</MenuItem>
                <MenuItem value='double'>double</MenuItem>
                <MenuItem value='dashed'>dashed</MenuItem>
                <MenuItem value='dotted'>dotted</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </> : null
    }
  </>
}

export function Background(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.background = JSON.parse(JSON.stringify(defaultStyle.background))
      } else {
        delete value.style.background
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Background</div>
      <Switch checked={value.style.background !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.background !== undefined ?
        <>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='Background Color' value={value.style.background.backgroundColor} onChange={e => onChange(() => value.style.background.backgroundColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Background Color' value={value.style.background.backgroundColor} onChange={e => onChange(() => value.style.background.backgroundColor = e.target.value)} type='color' />
          </Grid>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Background Image' value={value.style.background.backgroundImage} onChange={e => onChange(() => value.style.background.backgroundImage = e.target.value)} multiline maxRows={4} />
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='Background Position X' value={value.style.background.backgroundPosition[0]} onChange={e => onChange(() => value.style.background.backgroundPosition[0] = e.target.value)} multiline maxRows={4} />
              </Grid>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='Background Position Y' value={value.style.background.backgroundPosition[1]} onChange={e => onChange(() => value.style.background.backgroundPosition[1] = e.target.value)} multiline maxRows={4} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='Background Size X' value={value.style.background.backgroundSize[0]} onChange={e => onChange(() => value.style.background.backgroundSize[0] = e.target.value)} multiline maxRows={4} />
              </Grid>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='Background Size Y' value={value.style.background.backgroundSize[1]} onChange={e => onChange(() => value.style.background.backgroundSize[1] = e.target.value)} multiline maxRows={4} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Background Repeat</InputLabel>
              <Select {...SelectSX} label='Background Repeat' value={value.style.background.backgroundRepeat} onChange={e => onChange(() => value.style.background.backgroundRepeat = e.target.value)}  >
                <MenuItem value='no-repeat'>no-repeat</MenuItem>
                <MenuItem value='repeat'>repeat</MenuItem>
                <MenuItem value='repeat-x'>repeat-x</MenuItem>
                <MenuItem value='repeat-y'>repeat-y</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Background Attachment</InputLabel>
              <Select {...SelectSX} label='Background Attachment' value={value.style.background.backgroundAttachment} onChange={e => onChange(() => value.style.background.backgroundAttachment = e.target.value)}  >
                <MenuItem value='scroll'>scroll</MenuItem>
                <MenuItem value='fixed'>fixed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </> : null
    }
  </>
}

export function Font(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.font = JSON.parse(JSON.stringify(defaultStyle.font))
      } else {
        delete value.style.font
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Font</div>
      <Switch checked={value.style.font !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.font !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth type='number' label='Font Size' value={value.style.font.fontSize} onChange={e => onChange(() => value.style.font.fontSize = e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Font Weight</InputLabel>
              <Select {...SelectSX} value={value.style.font.fontWeight} label='Font Weight' onChange={e => onChange(() => value.style.font.fontWeight = e.target.value)}>
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
              renderInput={(params) => <TextField {...params} label='Font Family' />}
            />
          </Grid>
        </> : null
    }
  </>
}

export function Text(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.text = JSON.parse(JSON.stringify(defaultStyle.text))
      } else {
        delete value.style.text
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Text</div>
      <Switch checked={value.style.text !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.text !== undefined ?
        <>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth type='number' label='Line Height' value={value.style.text.lineHeight} onChange={e => onChange(() => value.style.text.lineHeight = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth type='number' label='Letter Spacing' value={value.style.text.letterSpacing} onChange={e => onChange(() => value.style.text.letterSpacing = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Text Align</InputLabel>
              <Select {...SelectSX} value={value.style.text.textAlign} label='Text Align' onChange={e => onChange(() => value.style.text.textAlign = e.target.value)}>
                <MenuItem value='left'>left</MenuItem>
                <MenuItem value='right'>right</MenuItem>
                <MenuItem value='center'>center</MenuItem>
                <MenuItem value='justify'>justify</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>White Space</InputLabel>
              <Select {...SelectSX} value={value.style.text.whiteSpace} label='White Space' onChange={e => onChange(() => value.style.text.whiteSpace = e.target.value)}>
                <MenuItem value='normal'>normal</MenuItem>
                <MenuItem value='nowrap'>nowrap</MenuItem>
                <MenuItem value='pre-wrap'>pre-wrap</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='Color' value={value.style.text.color} onChange={e => onChange(() => value.style.text.color = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Color' value={value.style.text.color} onChange={e => onChange(() => value.style.text.color = e.target.value)} type='color' />
          </Grid>
        </> : null
    }
  </>
}

export function TextDecoration(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.textDecoration = JSON.parse(JSON.stringify(defaultStyle.textDecoration))
      } else {
        delete value.style.textDecoration
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Text Decoration</div>
      <Switch checked={value.style.textDecoration !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.textDecoration !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Text Decoration Line</InputLabel>
              <Select {...SelectSX} value={value.style.textDecoration.textDecorationLine} label='位置' onChange={e => onChange(() => value.style.textDecoration.textDecorationLine = e.target.value)}>
                <MenuItem value='none'>none</MenuItem>
                <MenuItem value='underline'>underline</MenuItem>
                <MenuItem value='overline'>overline</MenuItem>
                <MenuItem value='line-through'>line-through</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Text Decoration Style</InputLabel>
              <Select {...SelectSX} value={value.style.textDecoration.textDecorationStyle} label='Text Decoration Style' onChange={e => onChange(() => value.style.textDecoration.textDecorationStyle = e.target.value)}>
                <MenuItem value='solid'>solid</MenuItem>
                <MenuItem value='double'>double</MenuItem>
                <MenuItem value='dashed'>dashed</MenuItem>
                <MenuItem value='dotted'>dotted</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='Color' value={value.style.textDecoration.textDecorationColor} onChange={e => onChange(() => value.style.textDecoration.textDecorationColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Color' value={value.style.textDecoration.textDecorationColor} onChange={e => onChange(() => value.style.textDecoration.textDecorationColor = e.target.value)} type='color' />
          </Grid>
        </> : null
    }
  </>
}

export function TextShadow(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.textShadow = JSON.parse(JSON.stringify(defaultStyle.textShadow))
      } else {
        delete value.style.textShadow
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Text Shadow</div>
      <Switch checked={value.style.textShadow !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.textShadow !== undefined ?
        <>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Text Shadow Position X' value={value.style.textShadow.textShadowPosition[0]} onChange={e => onChange(() => value.style.textShadow.textShadowPosition[0] = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Text Shadow Position Y' value={value.style.textShadow.textShadowPosition[1]} onChange={e => onChange(() => value.style.textShadow.textShadowPosition[1] = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Text Shadow Size' value={value.style.textShadow.textShadowSize} onChange={e => onChange(() => value.style.textShadow.textShadowSize = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='Color' value={value.style.textShadow.textShadowColor} onChange={e => onChange(() => value.style.textShadow.textShadowColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Color' value={value.style.textShadow.textShadowColor} onChange={e => onChange(() => value.style.textShadow.textShadowColor = e.target.value)} type='color' />
          </Grid>
        </> : null
    }
  </>
}

export function TextStroke(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.style.textStroke = JSON.parse(JSON.stringify(defaultStyle.textStroke))
      } else {
        delete value.style.textStroke
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Text Stroke</div>
      <Switch checked={value.style.textStroke !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.style.textStroke !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Text Stroke Width' value={value.style.textStroke.textStrokeWidth} onChange={e => onChange(() => value.style.textStroke.textStrokeWidth = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='Text Stroke Color' value={value.style.textStroke.textStrokeColor} onChange={e => onChange(() => value.style.textStroke.textStrokeColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Text Stroke Color' value={value.style.textStroke.textStrokeColor} onChange={e => onChange(() => value.style.textStroke.textStrokeColor = e.target.value)} type='color' />
          </Grid>
        </> : null
    }
  </>
}