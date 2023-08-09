import React from 'react'

import ReactAce from 'react-ace'

import { Button } from '@mui/material'
import { Dialog } from '@mui/material'
import { DialogActions } from '@mui/material'
import { DialogContent } from '@mui/material'

function Code(props) {
  const { value, onChange, height, mode } = props

  return <ReactAce
    style={{ width: '100%', height: height, lineHeight: 1.5 }}
    mode={mode}
    enableBasicAutocompletion={true}
    enableLiveAutocompletion={true}
    enableSnippets={true}
    showPrintMargin={false}
    tabSize={2}
    value={value}
    onChange={onChange}
  />
}

function CodeModal(props) {
  const { value, onChange, onClose, initValue, mode, width = 920, height = 500 } = props

  const [data, setData] = React.useState(value)

  return <Dialog onClose={onClose} open={true} sx={{ '& .MuiDialog-paper': { width: width, maxWidth: 'none' } }}>
    <DialogContent>
      <Code value={data} onChange={e => setData(e)} height={height} mode={mode} />
    </DialogContent>
    <DialogActions>
      {
        initValue ? <Button variant='contained' onClick={() => setData(initValue)}>重置</Button> : null
      }
      <Button variant='contained' onClick={() => onChange(data)}>保存</Button>
    </DialogActions>
  </Dialog>
}

export { CodeModal, Code }