const express = require('express');
const bodyParser = require('body-parser')

const path = require('path')
const rootDir = require('./util/path')

const app = express();

const expressHbs = require('express-handlebars');

app.engine('hbs', expressHbs())
// app.set('view engine', 'pug');
app.set('view engine', 'hbs');
app.set('views', 'views');

const adminData = require('./routers/admin')
const shopRoutes = require('./routers/shop')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.router)
app.use(shopRoutes)

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: "Page not found!" })
})

app.listen(3000);