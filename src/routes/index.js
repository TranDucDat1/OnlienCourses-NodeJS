const newRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./course');
const meRouter = require('./me');

function route(app) {
    app.use('/news', newRouter);
    app.use('/courses', coursesRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
    // biến req sẽ chứa những thông tin mà ứng dụng được gửi lên server
    // biến res cho phép setup việc trả về của server
    // app.get('/', (req, res) => {
    //     res.render('home');
    // })

    // app.get('/news', (req, res) => {
    //     res.render('news');
    // })

    // app.get('/search', (req, res) => {
    //     res.render('search');
    // })
}

module.exports = route;
