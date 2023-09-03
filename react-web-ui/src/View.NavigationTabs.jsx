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
import { TooltipSX, TextFieldSX } from './utils.mui.sx'

function App() {

  const onChange = (e, v) => {
    if (v === '@Close') {
      Imitation.assignState({ navigationTabsElementValue: undefined, navigationTabsValue: undefined })
      return
    }
    Imitation.assignState({ navigationTabsElementValue: undefined, navigationTabsValue: v })
  }

  return <div style={{ display: 'flex', height: '100%' }}>

    <Paper style={{ height: '100%', position: 'relative', display: 'flex' }} className='font'>

      <Tabs
        orientation='vertical'
        sx={{ '& .MuiButtonBase-root': { padding: 0, minWidth: 50 }, '& .MuiTabs-indicator': { left: 0, width: 4 } }}
        value={Imitation.state.navigationTabsValue}
        onChange={onChange}
      >
        <Tab value='ElementShop' icon={<Tooltip {...TooltipSX} title='Element Shop' placement='right'><AddIcon /></Tooltip>} />
        <Tab value='ElementOverview' icon={<Tooltip {...TooltipSX} title='Element Overview' placement='right'><FormatListBulletedIcon /></Tooltip>} />
        <Tab value='ElementEvent' icon={<Tooltip {...TooltipSX} title='Element Event' placement='right'><EventNoteIcon /></Tooltip>} />
        <Tab value='GraphConfig' icon={<Tooltip {...TooltipSX} title='Graph Config' placement='right'><SettingsIcon /></Tooltip>} />
        <Tab value='@Close' icon={<Tooltip {...TooltipSX} title='Hidden' placement='right'><CloseFullscreenIcon /></Tooltip>} />
        {
          Imitation.state.navigationTabsValue === 'ElementConfig' ? <Tab value='ElementConfig' icon={<Tooltip {...TooltipSX} title='Element Config' placement='right'><SettingsApplicationsIcon /></Tooltip>} /> : null
        }
      </Tabs>

    </Paper>

    <Paper style={{ width: Imitation.state.navigationTabsValue ? 360 + 32 : 0, marginLeft: Imitation.state.navigationTabsValue ? 16 : 0, height: '100%', display: 'flex', transition: '0.5s all', overflow: 'hidden' }} className='font'>

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

    </Paper>

  </div>

}

export default Imitation.withBindRender(App, state => [state.elementHover, state.navigationTabsValue, state.navigationTabsElementValue, state.graphElementUpdate, state.graphContentUpdate, state.graphConfigUpdate])