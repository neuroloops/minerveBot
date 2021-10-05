module.exports = update = name => {
  const base = require('airtable').base(process.env.AIRTABLE_TABLE)
  console.log(name)
  let id = ''
  base('Table 1')
    .select({
      maxRecords: 3,
      view: 'Tous (sort A_Z)',
      filterByFormula: `Name = '${name}'`,
    })
    .eachPage(
      function page(records) {
        records.forEach(function (record) {
          console.log('Retrieved', record.get('Name'))
          if (record.get('Name') != name) {
            console.log('mauvais pseudo')
            return
          }

          console.log(record.getId())
          id = record.getId()
          // updateField(id)
        })
      },
      function done(err) {
        if (err) {
          console.error(err)
          return
        }
      }
    )

  const updateField = id => {
    console.log('update :', id)
    base('Table 1').update(
      [
        {
          id,
          fields: {
            'Arts Obscurs': 1,
            Cuisine: 3,
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err)
          return
        }
      }
    )

    base('Table 1').find(id, function (err, record) {
      if (err) {
        console.error(err)
        return
      }
      console.log('Retrieved', record.fields)
    })
  }
}
