const path = require('path');
const express = require('express');
var methodOverride = require('method-override');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db/index');

//Connect to DB
db.connect(); 

// API
// const users = [
//   {
//     name: 'dat',
//     age: 24
//   },
//   {
//     name: 'mai anh',
//     age: 24
//   },
// ]
// app.get('/users', (req, res) => {
//   res.json(users)
// })

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

app.use(methodOverride('_method'));

// khi sử file là tĩnh thì dùng kiểu này
app.use(express.static(path.join(__dirname, 'public')));

//HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: 'hbs',
        helpers: {
            sum: (a, b) => a + b,
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
