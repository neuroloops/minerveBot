const menuItem = ['Fabrication', 'Transformation', 'Exploitation']
const competenceItem = [
  'Armes',
  'Armures',
  'Ingénierie',
  'Joaillerie',
  'Arts Obscurs',
  'Cuisine',
  'Ameublement',
  'Fonderie',
  'Menuiserie',
  'Tannerie',
  'Tissage',
  'Taille',
  'Abattage',
  'Minage',
  'Pêche',
  'Récolte',
  'Dépeçage',
]

module.exports.competenceItem = competenceItem
module.exports.menuItem = menuItem

module.exports.listMenu = menu => {
  if (menu === 'menuItem') {
    menu = menuItem
  } else if (menu === 'competenceItem') {
    menu = competenceItem
  }

  const items = []

  menu.map(item => {
    const index = menu.indexOf(item) + 1
    const temp = `[**${index}**]: ${item} **|** `
    items.push(temp)
  })
  const menuWithIndex = items.join('')
  return menuWithIndex
}
