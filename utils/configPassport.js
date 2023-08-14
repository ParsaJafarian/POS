const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');
const bcrypt = require('bcrypt');

const useStrategy = (passport) => passport.use(
    new LocalStrategy({ usernameField: 'num', passwordField: 'password' },
        async function verify(num, password, done) {
            try {
                //Get user from database and check if exists
                const q = "SELECT * FROM employees WHERE num = ?";
                const results = await db.query(q, [num]);
                const employee = results[0][0];
                if (!employee) {
                    return done(null, false, { message: 'Incorrect employee num or password' });
                }
                //Validate password
                const validPassword = await bcrypt.compare(password, employee.password);
                if (!validPassword) {
                    return done(null, false, { message: 'Incorrect employee num or password' });
                }
                return done(null, employee);
            } catch (err) {
                return done(err);
            };
        })
);

const serialize = (passport) => {
    passport.serializeUser((employee, done) => {
        process.nextTick(() => {
            done(null, { enumber: employee.num });
        });
    });
};

const deserialize = (passport) => {
    passport.deserializeUser(async (employee, done) => {
        process.nextTick(async () => {
            done(null, employee);
        });
    });
};

//Configure passport with an express app
const configPassport = (passport) => {
    useStrategy(passport);
    serialize(passport);
    deserialize(passport);
};

module.exports = configPassport;


