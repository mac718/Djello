function RouterHelpers() {
  this.handleErr = (err, next) => {
    if (err) {
      console.error(err)
      return next(err)
    }
  }
}

module.exports = RouterHelpers
