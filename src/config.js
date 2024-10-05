module.exports = {
    SERVER_URL: process.env.NODE_ENV === 'production' ? 'https://carbonbot-api.herokuapp.com' : 'http://localhost:1337',
    LIMIT: 15,
    TRUNCATE_POST: 300
};
