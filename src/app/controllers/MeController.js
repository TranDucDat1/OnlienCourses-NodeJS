const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../utils/utils')

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {

        Promise.all([Course.find(), Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) => 
                res.render('me/stored-courses', {
                    deleteCount,
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
        // Course.find()
        //     .then(courses => 
        //         res.render('me/stored-courses', {
        //             courses: multipleMongooseToObject(courses),
        //         }),
        //     )
        //     .catch(next);

        // // [GET] all 
        // Course.countDocumentsDeleted()
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted()
            .then(courses => 
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
