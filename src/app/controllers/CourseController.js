const Course = require('../models/Course')
const { mongooseToObject } = require('../../utils/utils')

class CourseController {
    // [GET] /course/:slug
    show(req, res, next) {
        //query database
        Course.findOne({ slug: req.params.slug })
        .then(courses => {
            res.render('courses/show', {
                courses: mongooseToObject(courses)
            });
        })
        .catch( error => next(error))
    }

    // [GET] courses/create
    create(req, res) {
        res.render('courses/create')
    }

    // Create course
    // [POST] courses/store
    store(req, res) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`
        const course = new Course(formData);
        course.save(function (err) {
            if (err) return handleError(err);
        });
        res.redirect('/me/stored/courses');
    }

    // [GET] courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
        .then(course => 
            res.render('courses/edit', {
                course: mongooseToObject(course),
            })
        )
        .catch(next)
    }

    // [PUT] course/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    // [DELETE] course/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [PATCH] course/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] course/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new CourseController();
