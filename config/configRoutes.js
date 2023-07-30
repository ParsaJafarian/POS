const configRoutes = (app) => {
    const loginRouter = require('../routes/login');
    const registerRouter = require('../routes/register');

    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
};

module.exports = configRoutes;