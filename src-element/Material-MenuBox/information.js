const information = {
  name: 'Menu Box',
  type: 'Material UI Component',
  children: [
    { value: 'menuContent', label: 'Menu Content' },
    { value: 'menuPopup', label: 'Menu Popup' },
  ],
  monitor: [
    { value: 'openMenu', label: 'Open Menu' },
    { value: 'closeMenu', label: 'Close Menu' },
  ],
  trigger: [
    { value: 'onOpen', label: 'On Open' },
    { value: 'onClose', label: 'On Close' },
  ],
  property: {
    open: false,
  }
}

export default information