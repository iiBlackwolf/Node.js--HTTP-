class data {
    constructor() {
        this.users = [
            {name:"Joe", age:30, city:"New York"},
            {name:"Rick", age:48, city:"London"}
          ]
    }

    AddUser(username, age = 0, city = 'Unknown') {
        if(!username) {
            throw new Error("Username is required!");
        }
        let userobj = {name: username, age:age, city:city}

        this.users.push(userobj);
    }

    GetUsers() {
        return this.users;
    }
}

module.exports = data;