import React from 'react'

import { Pagination } from '@mui/material'

function View() {
  return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Pagination count={2} sx={{ '.MuiPagination-ul': { flexWrap: 'nowrap' } }} />
  </div>
}

export default View