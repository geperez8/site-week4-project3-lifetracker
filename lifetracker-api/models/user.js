const db = require("../db")
const bcrypt = require("bcrypt")
const {BCRYPT_WORK_FACTOR} = require("../config")
const {UnauthorizedError, BadRequestError} = require("../utils/errors")

class User {
    static async login(credentials){
        // user should submit their email and passowrd 
        // if any of these fields are missing, throw an error
        //
        const requiredFields = ["password", "email"]

        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })
        // lookup the user in the db by email
        const user = await User.fetchUserByEmail(credentials.email)
        // if a user s found, compare the submitted password
        // with the password in the db
        // if there us a match, return the user
        //
        if (user) {
            const isValid = await bcrypt.compare(credentials.password, user.password)

            if (isValid) {
                return user
            }
        }

        // if any of this goes wrong throw an error

        throw new UnauthorizedError("Invalid email/password combo")
    }

    static async register(credentials){
        // user should submit their email, pw rsvp status, and # of guests
        // if any of these fields are missing, throw an error
        const requiredFields = ["password", "first_name", "last_name", "email", "username"]

        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        if (credentials.email.indexOf("@") <= 0){
            throw new BadRequestError("Invalid email.")
        }
        //
        // make sure no user already exists in the system with the email
        // if one does, throw an error
        const existingUser = await User.fetchUserByEmail(credentials.email)

        if(existingUser){
            throw new BadRequestError(`Duplicate email: ${credentials.email}`)
        }

        if (!email){
            throw new BadRequestError("No email provided")
        }

        const query = `SELECT * FROM users WHERE username = $1`

        const usernameResult = await db.query(query, [username])

        const username = usernameResult.rows[0]

        const lowercasedEmail = credentials.email.toLowerCase()

        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)
        //
        // create a new user in the db with all their info
        // return the user
        const result = await db.query(`
        INSERT INTO users (
            password,
            first_name,
            last_name,
            email,
            location,
            date
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING password, first_name, last_name, email, location, date;`,
        [hashedPassword, credentials.first_name, credentials.last_name, lowercasedEmail, credentials.location, credentials.date])

        const user = result.rows[0]

        return user
    }

    static async fetchUserByEmail(email){
        if (!email){
            throw new BadRequestError("No email provided")
        }

        const query = `SELECT * FROM users WHERE email = $1`

        const result = await db.query(query, [email.toLowerCase()])

        const user = result.rows[0]

        return user


    }
}

module.exports = User