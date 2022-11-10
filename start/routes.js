//routes
const adminRoutes = require('../routes/admin.routes')
const userRoutes = require('../routes/user.routes')
const petRoutes = require('../routes/pet.routes')
//
module.exports = function (app, express) {
  app.use(express.json())
  app.use('/api/admin', adminRoutes)
  app.use('/api/user', userRoutes)
  app.use('/api/pets', petRoutes)
  app.use((req, res, next) => {
    const error = new Error('INVALID ROUTE')
    error.status = 404
    next(error)
  })

  app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.status(error.status).json({
      message: error.message,
    })
  })
}
