import React from 'react'

import { Tabs } from '@mui/material'
import { Tab } from '@mui/material'
import { Divider } from '@mui/material'
import { Tooltip } from '@mui/material'
import { Paper } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import SettingsIcon from '@mui/icons-material/Settings'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'
import EventNoteIcon from '@mui/icons-material/EventNote'

import NavigationTabsAddElement from './View.NavigationTabs.AddElement'
import NavigationTabsElementConfig from './View.NavigationTabs.ElementConfig'
import NavigationTabsElementEvent from './View.NavigationTabs.ElementEvent'
import NavigationTabsElementOverview from './View.NavigationTabs.ElementOverview'
import NavigationTabsGraphConfig from './View.NavigationTabs.GraphConfig'

import Imitation from './utils.imitation'

function App() {
  const onChange = (e, v) => {
    if (v === '@Close') {
      Imitation.assignState({ navigationTabsElementConfigValue: undefined, navigationTabsValue: undefined })
      return
    }
    Imitation.assignState({ navigationTabsElementConfigValue: undefined, navigationTabsValue: v })
  }

  return <Paper style={{ height: '100%', position: 'relative', display: 'flex' }}>

    <Tabs
      orientation='vertical'
      sx={{ '& .MuiButtonBase-root': { padding: 0, minWidth: 50 }, '& .MuiTabs-indicator': { left: 0, width: 4 } }}
      value={Imitation.state.navigationTabsValue}
      onChange={onChange}
    >
      <Tab value='AddElement' icon={<Tooltip arrow title='AddElement' placement='right'><AddIcon/></Tooltip>} />
      <Tab value='ElementOverview' icon={<Tooltip arrow title='ElementOverview' placement='right'><FormatListBulletedIcon/></Tooltip>} />
      <Tab value='ElementEvent' icon={<Tooltip arrow title='ElementEvent' placement='right'><EventNoteIcon/></Tooltip>} />
      <Tab value='ElementConfig' icon={<Tooltip arrow title='ElementConfig' placement='right'><SettingsApplicationsIcon/></Tooltip>} />
      <Tab value='GraphConfig' icon={<Tooltip arrow title='GraphConfig' placement='right'><SettingsIcon/></Tooltip>} />
      <Tab value='@Close' icon={<Tooltip arrow title='Hidden' placement='right'><CloseFullscreenIcon/></Tooltip>} />
    </Tabs>

    {
      Imitation.state.navigationTabsValue ? <Divider orientation='vertical' /> : null
    }

    {
      Imitation.state.navigationTabsValue ?
        <>
          {
            Imitation.state.navigationTabsValue === 'GraphConfig' ?
              <div style={{ width: 360, height: 'calc(100% - 32px)', padding: 16, overflowX: 'hidden', overflowY: 'auto' }}>
                <NavigationTabsGraphConfig />
              </div> : null
          }
          {
            Imitation.state.navigationTabsValue === 'AddElement' ?
              <div style={{ width: 360, height: 'calc(100% - 32px)', padding: 16, overflowX: 'hidden', overflowY: 'auto' }}>
                <NavigationTabsAddElement />
              </div> : null
          }
          {
            Imitation.state.navigationTabsValue === 'ElementConfig' ?
              <div style={{ width: 360, height: 'calc(100% - 32px)', padding: 16, overflowX: 'hidden', overflowY: 'auto' }} key={Imitation.state.navigationTabsElementConfigValue}>
                <NavigationTabsElementConfig />
              </div> : null
          }
          {
            Imitation.state.navigationTabsValue === 'ElementOverview' ?
              <div style={{ width: 360, height: 'calc(100% - 32px)', padding: 16, overflowX: 'hidden', overflowY: 'auto' }}>
                <NavigationTabsElementOverview />
              </div> : null
          }
          {
            Imitation.state.navigationTabsValue === 'ElementEvent' ?
              <div style={{ width: 360, height: 'calc(100% - 32px)', padding: 16, overflowX: 'hidden', overflowY: 'auto' }}>
                <NavigationTabsElementEvent />
              </div> : null
          }
          <Divider orientation='vertical' />
        </> : null
    }

  </Paper>
}

export default Imitation.withBindRender(App, state => [state.navigationTabsValue, state.navigationTabsElementConfigValue, state.graphContentUpdate, state.graphConfigUpdate])