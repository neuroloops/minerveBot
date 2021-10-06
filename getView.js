const { menuItem } = require('./menu')

module.exports = getView = (base, message, view) => {
  view = menuItem[view]

  base('Table 1')
    .select({
      view,
      fields: ['Name', 'Artisanat'],
    })
    .eachPage(
      function page(records, fetchNextPage) {
        const items = []
        records.forEach(function (record) {
          console.log(record.getId())
          items.push(`${record.get('Name')} : [${record.get('Artisanat')}]  \n`)
        })
        message.reply(`${items.join('')}`)
        fetchNextPage()
      },
      function done(err) {
        if (err) {
          console.error(err)
          return
        }
      }
    )
}
