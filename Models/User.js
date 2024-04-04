const bcrypt = require('bcrypt');

class User {
    constructor(name, username, password) {
        this.name = name;
        this.username = username;
        this.password = password;
    }

    async hashPassword() {
        try {
            this.password = await bcrypt.hash(this.password, 10);
        } catch (error) {
            throw new Error('Error hashing password');
        }
    }

    async comparePassword(password) {
        try {
            return await bcrypt.compare(password, this.password);
        } catch (error) {
            throw new Error('Error comparing passwords');
        }
    }
}

module.exports = User;
