import { ServerError } from 'body-parser'

/*
  This generic controller is meant to be use in conjunction
  with Vuetifys data table. https://vuetifyjs.com/components/data-tables
  This is good for large data sets because it incorporates server-side pagination.
*/
export default class Table {
  // model: a mongoose model constructor
  // defaultSort: what you want to sort the table based on if none is provided by the clients query.
  constructor (model, defaultSort = 'createdAt') {
    this.model = model
    this.defaultSort = defaultSort
    this.get = this.get.bind(this)
  }

  async get (req, res) {
    try {
      let { sortBy, descending, page, rowsPerPage } = req.query
      // set a default sortBy to this.defaultSort
      sortBy = sortBy && sortBy.length ? sortBy : this.defaultSort
      // change vuetify descending method (boolean) into mongoose method (-1, 0, 1)
      if (descending === true) descending = -1
      else if (descending === false) descending = 1
      else descending = -1
      // turn query that should be numbers into numbers
      page = parseInt(page)
      rowsPerPage = parseInt(rowsPerPage)
      // check to see if rowsPerPage is set to all, which is notated by -1.
      let items
      if (rowsPerPage !== -1) {
        let paginateFrom = page * rowsPerPage - rowsPerPage
        let paginateTo = page * rowsPerPage
        items = await this.model.find({})
          .sort({ [sortBy]: descending })
          .skip(paginateFrom)
          .limit(paginateTo)
      } else {
        // if rowsPerPage is set to 'all' (-1), don't wory about pagination.
        items = await this.model.find({}).sort({ [sortBy]: descending })
      }
      let total = await this.model.count({})
      if (!items) throw new ServerError('No items exist at this moment.', { status: 404 })
      res.json({ total, items })
    } catch (error) {
      res.handleServerError(error)
    }
  }
}
