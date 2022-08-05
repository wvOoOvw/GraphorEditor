import React from 'react'

import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { Dialog } from '@mui/material'
import { DialogTitle } from '@mui/material'
import { DialogContent } from '@mui/material'
import { DialogActions } from '@mui/material'

import axios from '../utils/axios'
import Imitation from '../utils/imitation'

function Login(props) {
  const { onClose } = props

  const [account, setAccount] = React.useState(Imitation.state.userInformation.account)
  const [password, setPassword] = React.useState('')

  const [formatHightlight, setFormatHightlight] = React.useState(false)

  const handlePassword = e => {
    axios.put('/account', { password }).then(res => {
      Imitation.assignState({ message: '修改成功' })
      onClose()
    }).catch(res => {
      if (res.data === 'Format Error') {
        if (formatHightlight) {
          clearTimeout(formatHightlight)
        }
        setFormatHightlight(setTimeout(() => { setFormatHightlight(false) }, 4000))
      }
    })
  }

  const handleExit = e => {
    Imitation.assignState({ userInformation: { token: undefined, account: undefined } })
    localStorage.removeItem('token')
    localStorage.removeItem('account')
    onClose()
  }

  return <Dialog open={true} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: '640px' } }} onClose={onClose}>
    <DialogTitle>账号管理</DialogTitle>

    <DialogContent dividers>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField value={account} onChange={e => setAccount(e.target.value)} fullWidth label='账号' disabled />
        </Grid>
        <Grid item xs={12}>
          <TextField value={password} onChange={e => setPassword(e.target.value)} fullWidth label='密码' />
        </Grid>

        <Grid item xs={12} style={{ color: formatHightlight ? 'red' : 'gray', fontWeight: 'bold', transition: '1s all' }}>
          Format: 8 to 16 characters and contains only english and digits
        </Grid>
      </Grid>
    </DialogContent>

    <DialogActions>
      <Button variant='contained' onClick={handlePassword}>修改密码</Button>
      <Button variant='outlined' onClick={handleExit}>注销</Button>
    </DialogActions>
  </Dialog>
}

function UnLogin(props) {
  const { onClose } = props

  const [account, setAccount] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [formatHightlight, setFormatHightlight] = React.useState(false)

  const handleLogin = e => {
    axios.post('/login', { account, password }).then(res => {
      Imitation.assignState({ userInformation: { token: res.data.token, account: res.data.account }, message: '登录成功' })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('account', res.data.account)
      onClose()
    })
  }

  const handleRegister = e => {
    axios.post('/register', { account, password }).then(res => {
      Imitation.assignState({ userInformation: { token: res.data.token, account: res.data.account }, message: '注册成功' })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('account', res.data.account)
      onClose()
    }).catch(res => {
      if (res.data === 'Format Error') {
        if (formatHightlight) {
          clearTimeout(formatHightlight)
        }
        setFormatHightlight(setTimeout(() => { setFormatHightlight(false) }, 4000))
      }
    })
  }

  const handlePassword = e => {
    axios.put('/account', { password }).then(res => {
      Imitation.assignState({ userInformation: { token: res.data.token, account: res.data.account }, message: '修改成功' })
      onClose()
    })
  }

  return <Dialog open={true} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: '640px' } }} onClose={onClose}>
    <DialogTitle>登录 / 注册</DialogTitle>

    <DialogContent dividers>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField value={account} onChange={e => setAccount(e.target.value)} fullWidth label='账号' />
        </Grid>
        <Grid item xs={12}>
          <TextField value={password} onChange={e => setPassword(e.target.value)} fullWidth label='密码' />
        </Grid>

        <Grid item xs={12} style={{ color: formatHightlight ? 'red' : 'gray', fontWeight: 'bold', transition: '1s all' }}>
          Format: 8 to 16 characters and contains only english and digits
        </Grid>
      </Grid>
    </DialogContent>

    <DialogActions>
      <Button variant='contained' onClick={handleLogin}>登录</Button>
      <Button variant='outlined' onClick={handleRegister}>注册</Button>
    </DialogActions>
  </Dialog>
}

function App(props) {
  if (Imitation.state.userInformation.account) {
    return <Login {...props} />
  } else {
    return <UnLogin {...props} />
  }
}

export default App