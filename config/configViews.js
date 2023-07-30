
// Configures the views for the application using ejs-mate and express app
configViews = (app) => {
    const ejsMate = require('ejs-mate');
    const path = require('path');
    
    app.engine('ejs', ejsMate);
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
};

module.exports = configViews;