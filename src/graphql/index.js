const glue = require('schemaglue')

const { schemaDirectives } = require('./directives')

const { schema, resolver } = glue('src/graphql')

module.exports = {
  schemaDirectives,
  schema,
  resolver,
}
