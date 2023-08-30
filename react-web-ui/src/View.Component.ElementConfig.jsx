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

export function Visibility(props) {
  const { value, onChange } = props

  const handleChecked = e => {
    onChange(() => {
      if (e.target.checked) {
        value.display = JSON.parse(JSON.stringify(defaultStyle.display))
      } else {
        delete value.visibility
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Visibility</div>
      <Switch checked={value.visibility !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.visibility !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Visibility</InputLabel>
              <Select {...SelectSX} label='Visibility' value={value.visibility} onChange={e => onChange(() => value.visibility = e.target.value)}>
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
      if (value.margin === undefined) {
        value.margin = JSON.parse(JSON.stringify(defaultStyle.margin))
      }
      if (value.position === undefined) {
        value.position = JSON.parse(JSON.stringify(defaultStyle.position))
      }
      if (value.inset === undefined) {
        value.inset = JSON.parse(JSON.stringify(defaultStyle.inset))
      }

      value.position = 'absolute'
      value.inset[1] = '0'
      value.inset[3] = '0'
      value.margin[1] = 'auto'
      value.margin[3] = 'auto'
    })
  }
  const handleVerticalCenter = () => {
    onChange(() => {
      if (value.margin === undefined) {
        value.margin = JSON.parse(JSON.stringify(defaultStyle.margin))
      }
      if (value.position === undefined) {
        value.position = JSON.parse(JSON.stringify(defaultStyle.position))
      }
      if (value.inset === undefined) {
        value.inset = JSON.parse(JSON.stringify(defaultStyle.inset))
      }

      value.position = 'absolute'
      value.inset[0] = '0'
      value.inset[2] = '0'
      value.margin[0] = 'auto'
      value.margin[2] = 'auto'
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
        value.width = JSON.parse(JSON.stringify(defaultStyle.width))
        value.height = JSON.parse(JSON.stringify(defaultStyle.height))
      } else {
        delete value.width
        delete value.height
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Width & Height</div>
      <Switch checked={value.width !== undefined && value.height !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.width !== undefined && value.height !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Width' value={value.width} onChange={e => onChange(() => value.width = e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Height' value={value.height} onChange={e => onChange(() => value.height = e.target.value)} />
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
        value.minWidth = JSON.parse(JSON.stringify(defaultStyle.minWidth))
        value.minHeight = JSON.parse(JSON.stringify(defaultStyle.minHeight))
        value.maxWidth = JSON.parse(JSON.stringify(defaultStyle.maxWidth))
        value.maxHeight = JSON.parse(JSON.stringify(defaultStyle.maxHeight))
      } else {
        delete value.minWidth
        delete value.minHeight
        delete value.maxWidth
        delete value.maxHeight
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Max Width & Min Height</div>
      <Switch checked={value.minWidth !== undefined && value.minHeight !== undefined && value.maxWidth !== undefined && value.maxHeight !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.minWidth !== undefined && value.minHeight !== undefined && value.maxWidth !== undefined && value.maxHeight !== undefined ?
        <>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='Min Width' value={value.minWidth} onChange={e => onChange(() => value.minWidth = e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='Min Height' value={value.minHeight} onChange={e => onChange(() => value.minHeight = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='Max Width' value={value.maxWidth} onChange={e => onChange(() => value.maxWidth = e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='Max Height' value={value.maxHeight} onChange={e => onChange(() => value.maxHeight = e.target.value)} />
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
        value.position = JSON.parse(JSON.stringify(defaultStyle.position))
      } else {
        delete value.position
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Position</div>
      <Switch checked={value.position !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.position !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Position</InputLabel>
              <Select {...SelectSX} label='Position' value={value.position} onChange={e => onChange(() => value.position = e.target.value)}  >
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
        value.inset = JSON.parse(JSON.stringify(defaultStyle.inset))
      } else {
        delete value.inset
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Inset</div>
      <Switch checked={value.inset !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.inset !== undefined ?
        <>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Top' value={value.inset[0]} onChange={e => onChange(() => value.inset[0] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Right' value={value.inset[1]} onChange={e => onChange(() => value.inset[1] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Bottom' value={value.inset[2]} onChange={e => onChange(() => value.inset[2] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Left' value={value.inset[3]} onChange={e => onChange(() => value.inset[3] = e.target.value)} />
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
        value.display = JSON.parse(JSON.stringify(defaultStyle.display))
      } else {
        delete value.display
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Display</div>
      <Switch checked={value.display !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.display !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Display</InputLabel>
              <Select {...SelectSX} label='Display' value={value.display} onChange={e => onChange(() => value.display = e.target.value)}  >
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
        value.zIndex = JSON.parse(JSON.stringify(defaultStyle.zIndex))
      } else {
        delete value.zIndex
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Z-Index</div>
      <Switch checked={value.zIndex !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.zIndex !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Z-Index' value={value.zIndex} onChange={e => onChange(() => value.zIndex = e.target.value)} type='number' />
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
        value.cursor = JSON.parse(JSON.stringify(defaultStyle.cursor))
      } else {
        delete value.cursor
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Cursor</div>
      <Switch checked={value.cursor !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.cursor !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Cursor</InputLabel>
              <Select {...SelectSX} label='Cursor' value={value.cursor} onChange={e => onChange(() => value.cursor = e.target.value)}  >
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
        value.overflow = JSON.parse(JSON.stringify(defaultStyle.overflow))
      } else {
        delete value.overflow
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Overflow</div>
      <Switch checked={value.overflow !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.overflow !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Overflow</InputLabel>
              <Select {...SelectSX} label='Overflow' value={value.overflow} onChange={e => onChange(() => value.overflow = e.target.value)}  >
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
        value.verticalAlign = JSON.parse(JSON.stringify(defaultStyle.verticalAlign))
      } else {
        delete value.verticalAlign
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Vertical Align</div>
      <Switch checked={value.verticalAlign !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.verticalAlign !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Vertical Align</InputLabel>
              <Select {...SelectSX} label='Vertical Align' value={value.verticalAlign} onChange={e => onChange(() => value.verticalAlign = e.target.value)}  >
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
        value.padding = JSON.parse(JSON.stringify(defaultStyle.padding))
      } else {
        delete value.padding
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Padding</div>
      <Switch checked={value.padding !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.padding !== undefined ?
        <>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Top' value={value.padding[0]} onChange={e => onChange(() => value.padding[0] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Right' value={value.padding[1]} onChange={e => onChange(() => value.padding[1] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Bottom' value={value.padding[2]} onChange={e => onChange(() => value.padding[2] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Left' value={value.padding[3]} onChange={e => onChange(() => value.padding[3] = e.target.value)} />
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
        value.margin = JSON.parse(JSON.stringify(defaultStyle.margin))
      } else {
        delete value.margin
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Margin</div>
      <Switch checked={value.margin !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.margin !== undefined ?
        <>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='top' value={value.margin[0]} onChange={e => onChange(() => value.margin[0] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='right' value={value.margin[1]} onChange={e => onChange(() => value.margin[1] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='bottom' value={value.margin[2]} onChange={e => onChange(() => value.margin[2] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='left' value={value.margin[3]} onChange={e => onChange(() => value.margin[3] = e.target.value)} />
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
        value.flex = JSON.parse(JSON.stringify(defaultStyle.flex))
      } else {
        delete value.flex
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Flex</div>
      <Switch checked={value.flex !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.flex !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Flex Direction</InputLabel>
              <Select {...SelectSX} label='Flex Direction' value={value.flex.flexDirection} onChange={e => onChange(() => value.flex.flexDirection = e.target.value)}  >
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
              <Select {...SelectSX} label='Flex Wrap' value={value.flex.flexWrap} onChange={e => onChange(() => value.flex.flexWrap = e.target.value)}  >
                <MenuItem value='nowrap'>nowrap</MenuItem>
                <MenuItem value='wrap'>wrap</MenuItem>
                <MenuItem value='wrap-reverse'>wrap-reverse</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Justify Content</InputLabel>
              <Select {...SelectSX} label='Justify Content' value={value.flex.justifyContent} onChange={e => onChange(() => value.flex.justifyContent = e.target.value)}  >
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
              <Select {...SelectSX} label='Align Items' value={value.flex.alignItems} onChange={e => onChange(() => value.flex.alignItems = e.target.value)}  >
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
              <Select {...SelectSX} label='Align Content' value={value.flex.alignContent} onChange={e => onChange(() => value.flex.alignContent = e.target.value)}  >
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
            <TextField {...TextFieldSX} fullWidth label='Flex Grow' value={value.flex.flexGrow} onChange={e => onChange(() => value.flex.flexGrow = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={6}>
            <TextField {...TextFieldSX} fullWidth label='Flex Shrink' value={value.flex.flexShrink} onChange={e => onChange(() => value.flex.flexShrink = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Flex Basis' value={value.flex.flexBasis} onChange={e => onChange(() => value.flex.flexBasis = e.target.value)} />
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
        value.transform = JSON.parse(JSON.stringify(defaultStyle.transform))
      } else {
        delete value.transform
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Transform</div>
      <Switch checked={value.transform !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.transform !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Transform Style</InputLabel>
              <Select {...SelectSX} label='Transform Style' value={value.transform.transformStyle} onChange={e => onChange(() => value.transform.transformStyle = e.target.value)}  >
                <MenuItem value='flat'>flat</MenuItem>
                <MenuItem value='preserve-3d'>preserve-3d</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Perspective' value={value.transform.perspective} onChange={e => onChange(() => value.transform.perspective = e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth label='Transform Origin X' value={value.transform.transformOrigin[0]} onChange={e => onChange(() => value.transform.transformOrigin[0] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth label='Transform Origin Y' value={value.transform.transformOrigin[1]} onChange={e => onChange(() => value.transform.transformOrigin[1] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth label='Transform Origin Z' value={value.transform.transformOrigin[2]} onChange={e => onChange(() => value.transform.transformOrigin[2] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth label='Transform Translate X' value={value.transform.transformTranslate[0]} onChange={e => onChange(() => value.transform.transformTranslate[0] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth label='Transform Translate Y' value={value.transform.transformTranslate[1]} onChange={e => onChange(() => value.transform.transformTranslate[1] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth label='Transform Translate Z' value={value.transform.transformTranslate[2]} onChange={e => onChange(() => value.transform.transformTranslate[2] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth type='number' label='Transform Rotate X' value={value.transform.transformRotate[0]} onChange={e => onChange(() => value.transform.transformRotate[0] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth type='number' label='Transform Rotate Y' value={value.transform.transformRotate[1]} onChange={e => onChange(() => value.transform.transformRotate[1] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth type='number' label='Transform Rotate Z' value={value.transform.transformRotate[2]} onChange={e => onChange(() => value.transform.transformRotate[2] = e.target.value)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth type='number' label='Transform Scale X' value={value.transform.transformScale[0]} onChange={e => onChange(() => value.transform.transformScale[0] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth type='number' label='Transform Scale Y' value={value.transform.transformScale[1]} onChange={e => onChange(() => value.transform.transformScale[1] = e.target.value)} />
              </Grid>
              <Grid item xs={4}>
                <TextField {...TextFieldSX} fullWidth type='number' label='Transform Scale Z' value={value.transform.transformScale[2]} onChange={e => onChange(() => value.transform.transformScale[2] = e.target.value)} />
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
        value.transition = JSON.parse(JSON.stringify(defaultStyle.transition))
      } else {
        delete value.transition
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Transition</div>
      <Switch checked={value.transition !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.transition !== undefined ?
        <>
          <Grid item xs={12}>
            <div>Transition Time</div>
            <Slider value={value.transition.transitionTime} onChange={(e, v) => onChange(() => value.transition.transitionTime = v)} min={0} max={2} step={0.01} valueLabelDisplay='auto' />
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
        value.filter = JSON.parse(JSON.stringify(defaultStyle.filter))
      } else {
        delete value.filter
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Filter</div>
      <Switch checked={value.filter !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.filter !== undefined ?
        <>
          <Grid item xs={12}>
            <div>Filter Blur</div>
            <Slider value={value.filter.filterBlur} onChange={(e, v) => onChange(() => value.filter.filterBlur = v)} min={0} max={50} step={1} valueLabelDisplay='auto' />
          </Grid>
          <Grid item xs={12}>
            <div>Filter Brightness</div>
            <Slider value={value.filter.filterBrightness} onChange={(e, v) => onChange(() => value.filter.filterBrightness = v)} min={0} max={200} step={1} valueLabelDisplay='auto' />
          </Grid>
          <Grid item xs={12}>
            <div>Filter Opacity</div>
            <Slider value={value.filter.filterOpacity} onChange={(e, v) => onChange(() => value.filter.filterOpacity = v)} min={0} max={100} step={1} valueLabelDisplay='auto' />
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
        value.border = JSON.parse(JSON.stringify(defaultStyle.border))
      } else {
        delete value.border
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Border</div>
      <Switch checked={value.border !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.border !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Border Width' value={value.border.borderWidth} onChange={e => onChange(() => value.border.borderWidth = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='Border Color' value={value.border.borderColor} onChange={e => onChange(() => value.border.borderColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Border Color' value={value.border.borderColor} onChange={e => onChange(() => value.border.borderColor = e.target.value)} type='color' />
          </Grid>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Border Style</InputLabel>
              <Select {...SelectSX} label='Border Style' value={value.border.borderStyle} onChange={e => onChange(() => value.border.borderStyle = e.target.value)}>
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
              <Select {...SelectSX} label='Border Position' value={value.border.borderPosition} onChange={e => onChange(() => value.border.borderPosition = e.target.value)} multiple>
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
        value.borderRadius = JSON.parse(JSON.stringify(defaultStyle.borderRadius))
      } else {
        delete value.borderRadius
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Border Radius</div>
      <Switch checked={value.borderRadius !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.borderRadius !== undefined ?
        <>
          <Grid item xs={12}>
            <Grid container alignItems='center'>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Left Top' value={value.borderRadius[0]} onChange={e => onChange(() => value.borderRadius[0] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Right Top' value={value.borderRadius[1]} onChange={e => onChange(() => value.borderRadius[1] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Right Bottom' value={value.borderRadius[2]} onChange={e => onChange(() => value.borderRadius[2] = e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <TextField {...TextFieldSX} fullWidth label='Left Bottom' value={value.borderRadius[3]} onChange={e => onChange(() => value.borderRadius[3] = e.target.value)} />
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
        value.boxShadow = JSON.parse(JSON.stringify(defaultStyle.boxShadow))
      } else {
        delete value.boxShadow
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Box Shadow</div>
      <Switch checked={value.boxShadow !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.boxShadow !== undefined ?
        <>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>Box Shadow Inset</div>
            <Switch checked={value.boxShadow.boxShadowInset} onChange={e => onChange(() => value.boxShadow.boxShadowInset = e.target.checked)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Box Shadow Position X' value={value.boxShadow.boxShadowPosition[0]} onChange={e => onChange(() => value.boxShadow.boxShadowPosition[0] = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Box Shadow Position Y' value={value.boxShadow.boxShadowPosition[1]} onChange={e => onChange(() => value.boxShadow.boxShadowPosition[1] = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Box Shadow Size' value={value.boxShadow.boxShadowSize} onChange={e => onChange(() => value.boxShadow.boxShadowSize = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='Box Shadow Color' value={value.boxShadow.boxShadowColor} onChange={e => onChange(() => value.boxShadow.boxShadowColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Box Shadow Color' value={value.boxShadow.boxShadowColor} onChange={e => onChange(() => value.boxShadow.boxShadowColor = e.target.value)} type='color' />
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
        value.outline = JSON.parse(JSON.stringify(defaultStyle.outline))
      } else {
        delete value.outline
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Outline</div>
      <Switch checked={value.outline !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.outline !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Outline Width' value={value.outline.outlineWidth} onChange={e => onChange(() => value.outline.outlineWidth = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='Outline Color' value={value.outline.outlineColor} onChange={e => onChange(() => value.outline.outlineColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Outline Color' value={value.outline.outlineColor} onChange={e => onChange(() => value.outline.outlineColor = e.target.value)} type='color' />
          </Grid>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Outline Style</InputLabel>
              <Select {...SelectSX} label='Outline Style' value={value.outline.outlineStyle} onChange={e => onChange(() => value.outline.outlineStyle = e.target.value)}  >
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
        value.background = JSON.parse(JSON.stringify(defaultStyle.background))
      } else {
        delete value.background
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Background</div>
      <Switch checked={value.background !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.background !== undefined ?
        <>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='Background Color' value={value.background.backgroundColor} onChange={e => onChange(() => value.background.backgroundColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Background Color' value={value.background.backgroundColor} onChange={e => onChange(() => value.background.backgroundColor = e.target.value)} type='color' />
          </Grid>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Background Image' value={value.background.backgroundImage} onChange={e => onChange(() => value.background.backgroundImage = e.target.value)} multiline maxRows={4} />
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='Background Position X' value={value.background.backgroundPosition[0]} onChange={e => onChange(() => value.background.backgroundPosition[0] = e.target.value)} multiline maxRows={4} />
              </Grid>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='Background Position Y' value={value.background.backgroundPosition[1]} onChange={e => onChange(() => value.background.backgroundPosition[1] = e.target.value)} multiline maxRows={4} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='Background Size X' value={value.background.backgroundSize[0]} onChange={e => onChange(() => value.background.backgroundSize[0] = e.target.value)} multiline maxRows={4} />
              </Grid>
              <Grid item xs={6}>
                <TextField {...TextFieldSX} fullWidth label='Background Size Y' value={value.background.backgroundSize[1]} onChange={e => onChange(() => value.background.backgroundSize[1] = e.target.value)} multiline maxRows={4} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Background Repeat</InputLabel>
              <Select {...SelectSX} label='Background Repeat' value={value.background.backgroundRepeat} onChange={e => onChange(() => value.background.backgroundRepeat = e.target.value)}  >
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
              <Select {...SelectSX} label='Background Attachment' value={value.background.backgroundAttachment} onChange={e => onChange(() => value.background.backgroundAttachment = e.target.value)}  >
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
        value.font = JSON.parse(JSON.stringify(defaultStyle.font))
      } else {
        delete value.font
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Font</div>
      <Switch checked={value.font !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.font !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth type='number' label='Font Size' value={value.font.fontSize} onChange={e => onChange(() => value.font.fontSize = e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Font Weight</InputLabel>
              <Select {...SelectSX} value={value.font.fontWeight} label='Font Weight' onChange={e => onChange(() => value.font.fontWeight = e.target.value)}>
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
              value={value.font.fontFamily.split(',').filter(i => i)}
              onChange={(e, v) => onChange(() => value.font.fontFamily = v.join(','))}
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
        value.text = JSON.parse(JSON.stringify(defaultStyle.text))
      } else {
        delete value.text
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Text</div>
      <Switch checked={value.text !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.text !== undefined ?
        <>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth type='number' label='Line Height' value={value.text.lineHeight} onChange={e => onChange(() => value.text.lineHeight = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth type='number' label='Letter Spacing' value={value.text.letterSpacing} onChange={e => onChange(() => value.text.letterSpacing = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Text Align</InputLabel>
              <Select {...SelectSX} value={value.text.textAlign} label='Text Align' onChange={e => onChange(() => value.text.textAlign = e.target.value)}>
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
              <Select {...SelectSX} value={value.text.whiteSpace} label='White Space' onChange={e => onChange(() => value.text.whiteSpace = e.target.value)}>
                <MenuItem value='normal'>normal</MenuItem>
                <MenuItem value='nowrap'>nowrap</MenuItem>
                <MenuItem value='pre-wrap'>pre-wrap</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='Color' value={value.text.color} onChange={e => onChange(() => value.text.color = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Color' value={value.text.color} onChange={e => onChange(() => value.text.color = e.target.value)} type='color' />
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
        value.textDecoration = JSON.parse(JSON.stringify(defaultStyle.textDecoration))
      } else {
        delete value.textDecoration
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Text Decoration</div>
      <Switch checked={value.textDecoration !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.textDecoration !== undefined ?
        <>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Text Decoration Line</InputLabel>
              <Select {...SelectSX} value={value.textDecoration.textDecorationLine} label='位置' onChange={e => onChange(() => value.textDecoration.textDecorationLine = e.target.value)}>
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
              <Select {...SelectSX} value={value.textDecoration.textDecorationStyle} label='Text Decoration Style' onChange={e => onChange(() => value.textDecoration.textDecorationStyle = e.target.value)}>
                <MenuItem value='solid'>solid</MenuItem>
                <MenuItem value='double'>double</MenuItem>
                <MenuItem value='dashed'>dashed</MenuItem>
                <MenuItem value='dotted'>dotted</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='Color' value={value.textDecoration.textDecorationColor} onChange={e => onChange(() => value.textDecoration.textDecorationColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Color' value={value.textDecoration.textDecorationColor} onChange={e => onChange(() => value.textDecoration.textDecorationColor = e.target.value)} type='color' />
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
        value.textShadow = JSON.parse(JSON.stringify(defaultStyle.textShadow))
      } else {
        delete value.textShadow
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Text Shadow</div>
      <Switch checked={value.textShadow !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.textShadow !== undefined ?
        <>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Text Shadow Position X' value={value.textShadow.textShadowPosition[0]} onChange={e => onChange(() => value.textShadow.textShadowPosition[0] = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Text Shadow Position Y' value={value.textShadow.textShadowPosition[1]} onChange={e => onChange(() => value.textShadow.textShadowPosition[1] = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Text Shadow Size' value={value.textShadow.textShadowSize} onChange={e => onChange(() => value.textShadow.textShadowSize = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='Color' value={value.textShadow.textShadowColor} onChange={e => onChange(() => value.textShadow.textShadowColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Color' value={value.textShadow.textShadowColor} onChange={e => onChange(() => value.textShadow.textShadowColor = e.target.value)} type='color' />
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
        value.textStroke = JSON.parse(JSON.stringify(defaultStyle.textStroke))
      } else {
        delete value.textStroke
      }
    })
  }

  return <>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Text Stroke</div>
      <Switch checked={value.textStroke !== undefined} onChange={handleChecked} color='secondary' />
    </Grid>
    {
      value.textStroke !== undefined ?
        <>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Text Stroke Width' value={value.textStroke.textStrokeWidth} onChange={e => onChange(() => value.textStroke.textStrokeWidth = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={8}>
            <TextField {...TextFieldSX} fullWidth label='Text Stroke Color' value={value.textStroke.textStrokeColor} onChange={e => onChange(() => value.textStroke.textStrokeColor = e.target.value)} />
          </Grid>
          <Grid item xs={4}>
            <TextField {...TextFieldSX} fullWidth label='Text Stroke Color' value={value.textStroke.textStrokeColor} onChange={e => onChange(() => value.textStroke.textStrokeColor = e.target.value)} type='color' />
          </Grid>
        </> : null
    }
  </>
}