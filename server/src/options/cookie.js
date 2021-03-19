const cookieOptions = {
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 30 * 1000,
  secure: false,
  //sameSite: 'None',
  domain: '.www.kanban.kro.kr',
  path: '/',
};

module.exports = cookieOptions;
