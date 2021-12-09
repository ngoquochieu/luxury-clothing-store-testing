module.exports = function(req, res, next) {
    if(req.session.isAuth) {
        // res.redirect(req.path);
        next();
    }else {
        res.redirect('/action/login');
    }
}