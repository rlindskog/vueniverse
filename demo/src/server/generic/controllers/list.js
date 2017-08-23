import { ServerError } from '~/middleware/express-server-error'

export default class List {
  constructor (model) {
    this.model = model
  }
  async get (req, res) {
    try {
      let list = await this.model.find({})
      if (!list) throw (new ServerError(`No list items were found.`, { status: 404 }))
      res.json(list)
    } catch (error) {
      res.handleServerError(error)
    }
  }

  async post (req, res) {
    try {
      let newItem = new this.model(req.body)
      let savedItem = await newItem.save()
      res.json(savedItem)
    } catch (error) {
      res.handleServerError(error)
    }
  }

  async delete (req, res) {
    try {
      let params = req.params
      let deletedItem = await this.model.findOneAndDelete(params)
      if (!deletedItem) throw new ServerError(`Item doesn't exist.`, { status: 404 })
    } catch (error) {
      res.handleServerError(error)
    }
  }
}