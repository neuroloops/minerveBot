const { menuItem } = require('./menu')

module.exports = getView = (base, message, view) => {
  // view = menuItem[view]

  base('Table 1')
    .select({
      view: 'Tous (sort A_Z)',
    })
    .eachPage(
      function page(records, fetchNextPage) {
        const items = []
        records.forEach(function (record) {
          if (+view == 1) {
            items.push(
              `${record.get('Name')} ** =>** armes : **${record.get(
                'Armes'
              )} |**  Armures : **${record.get(
                'Armures'
              )} |**  Armures : **${record.get(
                'Armures'
              )} |** Armures : **${record.get(
                'Armures'
              )} |** Armures : **${record.get(
                'Armures'
              )} |** Armures : **${record.get(
                'Armures'
              )} |** Armures : **${record.get('Armures')} |** \n`
            )
          } else if (+view == 2) {
            items.push(
              `${record.get('Name')} => \n truc : **${record.get(
                'Armures'
              )} |**  ${record.fields} \n`
            )
            // message.reply(`${items.join('')} `)
          }
        })

        // message.reply(`salut`)
        console.log(items.length / 10)
        const howManyInTen = Math.ceil(items.length / 10)
        console.log(howManyInTen)
        console.log(items.slice(0, 10))
        let from = 0
        let to = 10

        for (let i = 0; i < howManyInTen; i++) {
          message.reply(`${items.slice(from, to).join('')} `)
          from += 10
          to += 10
          console.log('coucou')
        }
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
