import React from 'react'

import ReactAce from 'react-ace'

import { Button } from '@mui/material'
import { Dialog } from '@mui/material'
import { DialogTitle } from '@mui/material'
import { DialogActions } from '@mui/material'
import { DialogContent } from '@mui/material'

function AceDialog(props) {
  const [value, setValue] = React.useState(props.value)

  return <Dialog onClose={() => props.onClose()} open={true} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 1080 } }}>
    <DialogTitle className='font'><div>Edit Code</div></DialogTitle>
    <DialogContent>
      <ReactAce
        style={{ width: '100%', height: 500, lineHeight: 1.5, fontWeight: 'bold', fontSize: 14, fontFamily: 'monospace' }}
        mode={props.mode}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
        showPrintMargin={false}
        tabSize={2}
        value={value}
        onChange={setValue}
      />
    </DialogContent>
    <DialogActions className='font'>
      <Button variant='contained' style={{ textTransform: 'none' }} onClick={() => props.onChange(value)}>Save</Button>
    </DialogActions>
  </Dialog>
}

export { AceDialog }