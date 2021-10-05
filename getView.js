require('dotenv').config()
const { menuItem } = require('./menu')

module.exports = getView = (message, view) => {
  view = menuItem[view]
  const base = require('airtable').base(process.env.AIRTABLE_TABLE)
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
