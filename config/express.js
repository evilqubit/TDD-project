expressConfig = function (app){
app.use('/collection',require('../routes/controllers/collection'));
app.use('/pokemon',require('../routes/controllers/pokemon'));
}
module.exports = expressConfig
