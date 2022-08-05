import React from 'react'

import { Tabs } from '@mui/material'
import { Tab } from '@mui/material'
import { Divider } from '@mui/material'
import { Tooltip } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import SettingsIcon from '@mui/icons-material/Settings'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'
import EventNoteIcon from '@mui/icons-material/EventNote'

import ModalAddElement from './Modal.AddElement'
import ModalElementConfig from './Modal.ElementConfig'
import ModalElementEvent from './Modal.ElementEvent'
import ModalGraphConfig from './Modal.GraphConfig'
import ModalElementOverview from './Modal.ElementOverview'

import Imitation from '../utils/imitation'

function App() {
  const onChange = (e, v) => {
    if (v === '@Close') {
      Imitation.assignState({ modalContent: undefined, modalVisible: undefined })
      return
    }
    Imitation.assignState({ modalContent: undefined, modalVisible: v })
  }

  const modalList = [
    { value: 'AddElement', title: '添加元素', icon: <AddIcon /> },
    { value: 'ElementOverview', title: '元素预览', icon: <FormatListBulletedIcon /> },
    { value: 'ElementEvent', title: '元素事件', icon: <EventNoteIcon /> },
    { value: 'ElementConfig', title: '元素配置', icon: <SettingsApplicationsIcon /> },
    { value: 'GraphConfig', title: '控制器配置', icon: <SettingsIcon /> },
    { value: '@Close', title: '隐藏面板', icon: <CloseFullscreenIcon /> },
  ]

  return <div style={{ height: '100%', position: 'relative', display: 'flex' }}>
    <Tabs
      orientation='vertical'
      sx={{ '& .MuiButtonBase-root': { padding: 0, minWidth: 50 }, '& .MuiTabs-indicator': { left: 0, width: 4 } }}
      value={Imitation.state.modalVisible}
      onChange={onChange}
    >
      {
        modalList.map(i => {
          return <Tab value={i.value} icon={<Tooltip arrow title={i.title} placement='right'>{i.icon}</Tooltip>} />
        })
      }
    </Tabs>

    <Divider orientation='vertical' />

    {
      Imitation.state.modalVisible ?
        <>
          {
            Imitation.state.modalVisible === 'GraphConfig' ?
              <div style={{ width: 360, height: 'calc(100% - 32px)', padding: 16, overflowX: 'hidden', overflowY: 'auto' }}>
                <ModalGraphConfig />
              </div> : null
          }
          {
            Imitation.state.modalVisible === 'AddElement' ?
              <div style={{ width: 360, height: 'calc(100% - 32px)', padding: 16, overflowX: 'hidden', overflowY: 'auto' }}>
                <ModalAddElement />
              </div> : null
          }
          {
            Imitation.state.modalVisible === 'ElementConfig' ?
              <div style={{ width: 360, height: 'calc(100% - 32px)', padding: 16, overflowX: 'hidden', overflowY: 'auto' }} key={Imitation.state.modalContent}>
                <ModalElementConfig />
              </div> : null
          }
          {
            Imitation.state.modalVisible === 'ElementOverview' ?
              <div style={{ width: 360, height: 'calc(100% - 32px)', padding: 16, overflowX: 'hidden', overflowY: 'auto' }}>
                <ModalElementOverview />
              </div> : null
          }
          {
            Imitation.state.modalVisible === 'ElementEvent' ?
              <div style={{ width: 360, height: 'calc(100% - 32px)', padding: 16, overflowX: 'hidden', overflowY: 'auto' }}>
                <ModalElementEvent />
              </div> : null
          }
          <Divider orientation='vertical' />
        </> : null
    }

  </div>
}

export default Imitation.withBindRender(App, state => [state.modalVisible, state.modalContent, state.graphContentUpdate, state.graphConfigUpdate])