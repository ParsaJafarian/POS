const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');
const bcrypt = require('bcrypt');

const useStrategy = (passport) => passport.use(new LocalStrategy(
    async function verify(employeeNumber, password, done) {
        try {
            //Get user from database and check if exists
            const q = "SELECT * FROM users WHERE number = ?";
            const employee = await db.query(q, [employeeNumber]);
            if (!employee) {
                return done(null, false, { message: 'Incorrect enumber or password' });
            }
            //Validate password
            const hash = await bcrypt.hash(password, employee.salt);
            if (!bcrypt.compareSync(password, hash)) {
                return done(null, false, { message: 'Incorrect enumber or password' });
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
            done(null, { id: employee.id, enumber: employee.number });
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


