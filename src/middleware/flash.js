export function flashMiddleware(req, res, next) {
  const flash = req.cookies.flash;
  if (flash) {
    res.locals.flash = { type: 'info', text: flash };
    res.clearCookie('flash');
    console.log('Flash message:', flash);
  } else {
    res.locals.flash = null;
  }
  next();
}
