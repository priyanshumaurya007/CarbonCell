class UserDTO {
    constructor(name, username, password) {
        this.name = name;
        this.username = username;
        this.password = password;
    }

    static fromRequest(req) {
        const { name, username, password } = req.body;
        return new UserDTO(name, username, password);
    }

    isValid() {
        return !!this.name && !!this.username && !!this.password;
    }
}

module.exports = UserDTO;
