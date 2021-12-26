const config = {
    APP_DOMAIN: process.env.APP_DOMAIN || 'http://localhost',
    PORT: process.env.PORT || 3000,
    DB: process.env.DB || 'db.sqlite',
    CAESAR_SHIFT: process.env.CAESAR_SHIFT || 3,
};

module.exports = config;
