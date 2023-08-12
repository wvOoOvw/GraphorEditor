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
    '& input, & .MuiInputBase-multiline': { fontSize: '14px', padding: '12px' },
    '& label': { fontSize: '12px', lineHeight: 1, padding: 0, background: 'white' },
    '& label.MuiFormLabel-filled, & label.Mui-focused, & .MuiInputLabel-shrink': { padding: '4px', paddingTop: 0, background: 'white' },
    '& fieldset': { top: 0 },
    '& fieldset legend': { display: 'none' }
  }
}

const AutocompleteSX = {
  sx: {
    '& input': { fontSize: '14px' },
    '& .MuiOutlinedInput-root': { padding: '4.5px', paddingLeft: '8px' },
    '& label': { fontSize: '12px', lineHeight: 1, padding: 0, background: 'white' },
    '& label.MuiFormLabel-filled, & label.Mui-focused, & .MuiInputLabel-shrink': { padding: '4px', paddingTop: 0, background: 'white' },
    '& fieldset': { top: 0 },
    '& fieldset legend': { display: 'none' }
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

const SelectSX = {
  sx: {
    '& .MuiSelect-select': { fontSize: '14px', padding: '10.5px 12px' },
    '& label': { fontSize: '12px', lineHeight: 1, padding: 0, background: 'white' },
    '& label.MuiFormLabel-filled, & label.Mui-focused, & .MuiInputLabel-shrink': { padding: '4px', paddingTop: 0, background: 'white' },
    '& fieldset': { top: 0 },
    '& fieldset legend': { display: 'none' }
  },
  MenuProps: {
    sx: {
      '& .MuiMenuItem-root': { fontSize: '14px', fontWeight: 'bold', fontFamily: 'monospace' }
    }
  }
}

export { TooltipSX, TextFieldSX, AutocompleteSX, SelectSX }