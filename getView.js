module.exports = getView = (base, message, view) => {
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
              )} |**  Ingénierie : **${record.get(
                'Ingénierie'
              )} |** Joaillerie : **${record.get(
                'Joaillerie'
              )} |** Arts Obscurs : **${record.get(
                'Arts Obscurs'
              )} |** Cuisine : **${record.get(
                'Cuisine'
              )} |** Ameublement : **${record.get('Ameublement')} |** \n`
            )
          } else if (+view == 2) {
            items.push(
              `${record.get('Name')} ** =>** Fonderie : **${record.get(
                'Fonderie'
              )} |**  Menuiserie : **${record.get(
                'Menuiserie'
              )} |**  Tannerie : **${record.get(
                'Tannerie'
              )} |** Tissage : **${record.get(
                'Tissage'
              )} |** Taille : **${record.get('Taille')} |** \n`
            )
          } else if (+view == 3) {
            items.push(
              `${record.get('Name')} ** =>** Abattage : **${record.get(
                'Abattage'
              )} |**  Minage : **${record.get(
                'Minage'
              )} |**  Peche : **${record.get(
                'Peche'
              )} |** Récolte : **${record.get(
                'Récolte'
              )} |** Dépeçage : **${record.get('Dépeçage')} |** \n`
            )
          }
        })

        const howManyInTen = Math.ceil(items.length / 10)

        let from = 0
        let to = 10

        for (let i = 0; i < howManyInTen; i++) {
          message.reply(`${items.slice(from, to).join('')} `)
          from += 10
          to += 10
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
