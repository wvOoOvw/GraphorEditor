const core = (name) => {
  const Render = require(`./core/${name}/Render.jsx`).default
  const View = require(`./core/${name}/View.jsx`).default
  const Edit = require(`./core/${name}/Edit.jsx`).default
  const information = require(`./core/${name}/information.js`).default
  const license = require(`./core/${name}/license.js`).default

  return { Render, View, Edit, information, license }
}

const l = []

l.push(core('Basic-Audio'))
l.push(core('Basic-Iframe'))
l.push(core('Basic-Image'))
l.push(core('Basic-Input'))
l.push(core('Basic-Label'))
l.push(core('Basic-Link'))
l.push(core('Basic-Svg'))
l.push(core('Basic-Text'))
l.push(core('Basic-Video'))

l.push(core('Extra-VideoHls'))

l.push(core('Box-Array'))
l.push(core('Box-Basic'))
l.push(core('Box-Drag'))
l.push(core('Box-HashRouter'))
l.push(core('Box-SPA'))

l.push(core('Tool-Data'))
l.push(core('Tool-Effect'))
l.push(core('Tool-Http'))

l.push(core('Material-Accordion'))
l.push(core('Material-Autocomplete'))
l.push(core('Material-Badge'))
l.push(core('Material-BottomNavigation'))
l.push(core('Material-Button'))
l.push(core('Material-Checkbox'))
l.push(core('Material-CheckboxGroup'))
l.push(core('Material-CircularProgress'))
l.push(core('Material-Dialog'))
l.push(core('Material-List'))
l.push(core('Material-Menu'))
l.push(core('Material-MenuBox'))
l.push(core('Material-Pagination'))
l.push(core('Material-Radio'))
l.push(core('Material-RadioGroup'))
l.push(core('Material-Select'))
l.push(core('Material-Slider'))
l.push(core('Material-Switch'))
l.push(core('Material-Table'))
l.push(core('Material-Tabs'))
l.push(core('Material-TextField'))
l.push(core('Material-ToggleButtonGroup'))
l.push(core('Material-Tooltip'))

// l.push(core('Echarts-Custom'))

export default l