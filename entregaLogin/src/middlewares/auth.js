export function auth(req, res, next) {
    if (req.session.email && req.session.password) {
        next();
    } else {
        res.redirect('/login');
    }
}