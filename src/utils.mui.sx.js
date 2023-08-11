const TooltipSX = {
  PopperProps: {
    sx: {
      '& .MuiTooltip-tooltip':
        { background: 'white', color: 'black', fontSize: '12px', fontWeight: 'bold', fontFamily: 'monospace', lineHeight: '1.5', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px' }
    }
  }
}

const TextFieldSX = {
  sx: {
    '& input': { fontSize: 14, padding: '12px' },
    '& label': { fontSize: 12, lineHeight: 1, padding: 0, background: 'white' },
    '& label': { fontSize: 12, lineHeight: 1 },
    '& label.MuiFormLabel-filled, & label.Mui-focused': { padding: '4px', background: 'white' },
    '& fieldset': { top: 0 },
    '& fieldset legend': { display: 'none' }
  }
}

const AutocompleteSX = {
  sx: {
    '& input': { fontSize: '14px' },
    '& .MuiInputLabel-root': { fontSize: '14px', lineHeight: '1' },
    '& .MuiOutlinedInput-root': { padding: '4px' }
  },
  componentsProps: {
    popper: {
      sx: {
        '& .MuiAutocomplete-option': { fontSize: '14px', fontWeight: 'bold', fontFamily: 'monospace' }
      }
    },
    paper: {
      sx: {
        '& .MuiAutocomplete-noOptions': { fontSize: '14px', fontWeight: 'bold', fontFamily: 'monospace', padding: '12px' }
      }
    }
  }
}

export { TooltipSX, TextFieldSX, AutocompleteSX }