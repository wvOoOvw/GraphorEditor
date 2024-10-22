import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'

import App from './App.jsx'

import icon from '../static/icon.png'

const link = document.createElement('link')
link.rel = 'icon'
link.href = icon
document.head.append(link)

window.addEventListener('wheel', e => e.preventDefault(), { passive: false })

ReactDOM.render(<App />, document.getElementById('root'))