const Course = require('../models/Course')
const {multipleMongooseToObject} = require('../../utils/utils')

class SiteController {
    // [GET] /  ---> trang Home
    index(req, res, next) {
        // sử dụng model
        //next là một function để lưu lỗi, khi lỗi chỉ tập trung fix ở một chỗ thôi

        // chuyền dữ liệu từ controller sang view sử dụng thư viện handlebar 
        //query databasev
        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses)
                });
            })
            .catch( error => next(error))

    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
