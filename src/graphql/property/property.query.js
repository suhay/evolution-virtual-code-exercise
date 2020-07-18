const { db } = require('../../db')

const Query = {
  Property: (parent, args, context, info) => {
    const filter = {}

    args.filter.forEach(fil => {
      switch (fil.key) {
        case 'name':
          filter.name = { '$contains': fil.term }
          break;

        case 'street':
          filter.street = { '$contains': fil.term }
          break;

        case 'city':
          filter.city = fil.term
          break;

        case 'state':
          filter.state = fil.term
          break;

        case 'available':
          filter.available = fil.term
          break;

        default:
          break;
      }
    })

    const find = args.limit 
      ? db
          .getCollection('properties')
          .chain()
          .find(filter)
          .simplesort('name')
          .limit(args.limit)
          .data()
      : db.getCollection('properties').chain().find(filter).simplesort('name').data()
    return find
  }
}

module.exports = {
  Query,
}
