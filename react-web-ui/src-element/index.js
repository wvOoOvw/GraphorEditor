const load = (name) => {
  const Render = require(`./${name}/Render.jsx`).default
  const View = require(`./${name}/View.jsx`).default
  const Edit = require(`./${name}/Edit.jsx`).default
  const information = require(`./${name}/information.js`).default
  const license = require(`./${name}/license.js`).default

  return { Render, View, Edit, information, license }
}

const l = []

l.push(load('Basic-Audio'))
l.push(load('Basic-Iframe'))
l.push(load('Basic-Image'))
l.push(load('Basic-Input'))
l.push(load('Basic-Label'))
l.push(load('Basic-Link'))
l.push(load('Basic-Svg'))
l.push(load('Basic-Text'))
l.push(load('Basic-Video'))

l.push(load('Box-Array'))
l.push(load('Box-Basic'))
l.push(load('Box-Drag'))
l.push(load('Box-HashRouter'))
l.push(load('Box-SPA'))

l.push(load('Extra-VideoHls'))

l.push(load('Material-Accordion'))
l.push(load('Material-Autocomplete'))
l.push(load('Material-Badge'))
l.push(load('Material-BottomNavigation'))
l.push(load('Material-Button'))
l.push(load('Material-Checkbox'))
l.push(load('Material-CheckboxGroup'))
l.push(load('Material-CircularProgress'))
l.push(load('Material-Dialog'))
l.push(load('Material-List'))
l.push(load('Material-Menu'))
l.push(load('Material-MenuBox'))
l.push(load('Material-Pagination'))
l.push(load('Material-Paper'))
l.push(load('Material-Radio'))
l.push(load('Material-RadioGroup'))
l.push(load('Material-Select'))
l.push(load('Material-Slider'))
l.push(load('Material-Switch'))
l.push(load('Material-Table'))
l.push(load('Material-Tabs'))
l.push(load('Material-TextField'))
l.push(load('Material-ToggleButtonGroup'))
l.push(load('Material-Tooltip'))

l.push(load('Tool-DataStore'))
l.push(load('Tool-EventStore'))
l.push(load('Tool-HttpRequest'))

// l.push(load('Echarts-Custom'))

export default l