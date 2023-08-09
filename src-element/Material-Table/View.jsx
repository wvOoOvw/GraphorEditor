import React from 'react'

import { Table } from '@mui/material'
import { TableBody } from '@mui/material'
import { TableCell } from '@mui/material'
import { TableHead } from '@mui/material'
import { TableRow } from '@mui/material'

function View() {
  return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Table size='small'>
      <TableHead>
        <TableRow>
          <TableCell>
            ***
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            ******
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
}

export default View