import Table from 'cli-table'

export default (routes) => {
  let table = new Table({
    head: ['', 'Name', 'Path', 'Versions'],
    style: {
      head: ['green']
    }
  })
  console.log('\n _API ROUTES:')
  for (var key in routes) {
    if (routes.hasOwnProperty(key)) {
      var val = routes[key]
      var _o = {}
      _o[val.method] = [val.name, val.spec.path, val.spec.versions]
      table.push(_o)
    }
  }
  return table
}
