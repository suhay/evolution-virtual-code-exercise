const { IsAuthUserDirective, IsAuthDirective, IsAdminDirective } = require('./auth.directive')

const schemaDirectives = {
  isAuth: IsAuthDirective,
  isAuthUser: IsAuthUserDirective,
  isAdmin: IsAdminDirective,
}

module.exports = {
  schemaDirectives,
}
