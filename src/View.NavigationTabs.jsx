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

import NavigationTabsElementShop from './View.NavigationTabs.ElementShop'
import NavigationTabsElementConfig from './View.NavigationTabs.ElementConfig'
import NavigationTabsElementEvent from './View.NavigationTabs.ElementEvent'
import NavigationTabsElementOverview from './View.NavigationTabs.ElementOverview'
import NavigationTabsGraphConfig from './View.NavigationTabs.GraphConfig'

import Imitation from './utils.imitation'

const tooltipPopperProps = { sx: { '& .MuiTooltip-tooltip': { background: 'white', color: 'black', fontSize: '12px', fontWeight: 'bold', fontFamily: 'monospace', lineHeight: '1.5', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px' } } }

function App() {

  const onChange = (e, v) => {
    if (v === '@Close') {
      Imitation.assignState({ navigationTabsElementValue: undefined, navigationTabsValue: undefined })
      return
    }
    Imitation.assignState({ navigationTabsElementValue: undefined, navigationTabsValue: v })
  }

  return <Paper style={{ height: '100%', position: 'relative', display: 'flex' }}  className='font'>

    <Tabs
      orientation='vertical'
      sx={{ '& .MuiButtonBase-root': { padding: 0, minWidth: 50 }, '& .MuiTabs-indicator': { left: 0, width: 4 } }}
      value={Imitation.state.navigationTabsValue}
      onChange={onChange}
    >
      <Tab value='ElementShop' icon={<Tooltip PopperProps={tooltipPopperProps} title='Element Shop' placement='right'><AddIcon /></Tooltip>} />
      <Tab value='ElementOverview' icon={<Tooltip PopperProps={tooltipPopperProps} title='Element Overview' placement='right'><FormatListBulletedIcon /></Tooltip>} />
      <Tab value='ElementEvent' icon={<Tooltip PopperProps={tooltipPopperProps} title='Element Event' placement='right'><EventNoteIcon /></Tooltip>} />
      <Tab value='ElementConfig' icon={<Tooltip PopperProps={tooltipPopperProps} title='Element Config' placement='right'><SettingsApplicationsIcon /></Tooltip>} />
      <Tab value='GraphConfig' icon={<Tooltip PopperProps={tooltipPopperProps} title='Graph Config' placement='right'><SettingsIcon /></Tooltip>} />
      <Tab value='@Close' icon={<Tooltip PopperProps={tooltipPopperProps} title='Hidden' placement='right'><CloseFullscreenIcon /></Tooltip>} />
    </Tabs>

    <div style={{ width: Imitation.state.navigationTabsValue ? 360 + 32 : 0, height: '100%', display: 'flex', transition: '0.5s all', overflow: 'hidden' }}>
      <Divider orientation='vertical' />
      {
        Imitation.state.navigationTabsValue ?
          <>
            {
              Imitation.state.navigationTabsValue === 'GraphConfig' ?
                <div style={{ width: 360, height: 'calc(100% - 32px)', padding: 16, overflowX: 'hidden', overflowY: 'auto', flexShrink: 0 }}>
                  <NavigationTabsGraphConfig />
                </div>
                : null
            }
            {
              Imitation.state.navigationTabsValue === 'ElementShop' ?
                <div style={{ width: 360, height: 'calc(100% - 32px)', padding: 16, overflowX: 'hidden', overflowY: 'auto', flexShrink: 0 }}>
                  <NavigationTabsElementShop />
                </div>
                : null
            }
            {
              Imitation.state.navigationTabsValue === 'ElementConfig' ?
                <div style={{ width: 360, height: 'calc(100% - 32px)', padding: 16, overflowX: 'hidden', overflowY: 'auto', flexShrink: 0 }} key={Imitation.state.navigationTabsElementValue}>
                  <NavigationTabsElementConfig />
                </div>
                : null
            }
            {
              Imitation.state.navigationTabsValue === 'ElementOverview' ?
                <div style={{ width: 360, height: 'calc(100% - 32px)', padding: 16, overflowX: 'hidden', overflowY: 'auto', flexShrink: 0 }}>
                  <NavigationTabsElementOverview />
                </div>
                : null
            }
            {
              Imitation.state.navigationTabsValue === 'ElementEvent' ?
                <div style={{ width: 360, height: 'calc(100% - 32px)', padding: 16, overflowX: 'hidden', overflowY: 'auto', flexShrink: 0 }}>
                  <NavigationTabsElementEvent />
                </div>
                : null
            }
          </>
          : null
      }
    </div>

  </Paper>
}

export default Imitation.withBindRender(App, state => [state.navigationTabsValue, state.navigationTabsElementValue, state.graphContentUpdate, state.graphConfigUpdate])