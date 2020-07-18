const { SchemaDirectiveVisitor } = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')

class IsAuthUserDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function res(...args) {
      const [user, {}, { authUser }] = args
      if ((authUser && authUser.id === user.id) || user.login) {
        const result = await resolve.apply(this, args)
        return result
      } 
      throw new Error('You must be the authenticated user to get this information')
    }
  }
}

class IsAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function res(...args) {
      const [, {}, { user: userInfo }] = args
      if (!userInfo) {
        throw new Error('User not authenticated')
      }

      return resolve.apply(this, args)
    }
  }
}

class IsAdminDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function res(...args) {
      const [, {}, { user: userInfo }] = args
      if (!userInfo) {
        throw new Error('User not authenticated')
      }

      return resolve.apply(this, args)
    }
  }
}

module.exports = {
  IsAuthDirective,
  IsAuthUserDirective,
  IsAdminDirective,
}
