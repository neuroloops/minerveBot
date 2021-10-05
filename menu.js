require('dotenv').config()

const menuItem = ['Fabrication', 'Transformation', 'Exploitation']

module.exports.menuItem = menuItem

module.exports.listMenu = message => {
  const menu = menuItem
  const items = []

  menu.map(item => {
    const index = menu.indexOf(item) + 1
    const temp = `${index}: ${item} `

    items.push(temp)
  })
  const menuWithIndex = items.join('')
  return menuWithIndex
}
