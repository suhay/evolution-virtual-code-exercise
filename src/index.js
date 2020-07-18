require('dotenv').config()

const express = require('express')
const path = require('path')
const { ApolloServer } = require('apollo-server-express')
const morgan = require('morgan')

require('./db').init()
const { resolver: resolvers, schema, schemaDirectives } = require('./graphql')

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));

  (() => {
    const webpack = require('webpack')
    const webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : '../webpack.config')
    const compiler = webpack(webpackConfig)

    app.use(require('webpack-dev-middleware')(compiler, {
      logLevel: 'warn', publicPath: webpackConfig.output.publicPath,
    }))

    app.use(require('webpack-hot-middleware')(compiler, {
      log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
    }))
  })()
} else {
  app.use(morgan('tiny'))
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  schemaDirectives,
  context: ({ req, res }) => {
    const nreq = req
    const user = nreq.user
    return {
      user,
      res,
    }
  },
})

if (process.env.NODE_ENV === 'development') {
  (() => {
    const webpack = require('webpack')
    const webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : '../webpack.config')
    const compiler = webpack(webpackConfig)

    app.use(require('webpack-dev-middleware')(compiler, {
      logLevel: 'warn', publicPath: webpackConfig.output.publicPath,
    }))

    app.use(require('webpack-hot-middleware')(compiler, {
      log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
    }))
  })()
}

app.use(express.static(path.resolve('./public')))

app.all('/', (req, res) => {
  res.sendFile(path.resolve('./public/index.html'))
})

server.applyMiddleware({ app })

app.listen({ port: process.env.PORT || 4000 }, async () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`)
})
