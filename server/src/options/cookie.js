const cookieOptions = {
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 30 * 1000,
  secure: true,
  SameSite: none,
  domain: '.www.kanban.kro.kr',
  path: '/',
};

module.exports = cookieOptions;
