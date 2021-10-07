const { competenceItem } = require('./menu')

module.exports = getComp = (base, message, id) => {
  const item = competenceItem[id - 1]

  console.log(item)
  base('Table 1')
    .select({
      view: 'Tous (sort A_Z)',
      sort: [{ field: item, direction: 'desc' }],
    })
    .eachPage(
      function page(records, fetchNextPage) {
        const items = []
        records.forEach(function (record) {
          if (record.get(item) > 0) {
            items.push(`${record.get('Name')} : [${record.get(item)}]  \n`)
          }
        })
        message.reply(
          `compétence ${competenceItem[id - 1]} \n ${items.join('')}`
        )
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
