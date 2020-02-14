const withAuth = function(req, res, next) {
  if (req.cookies.user) {
    next()
  } else {
    res.status(401).send()
  }
}

module.exports = withAuth
