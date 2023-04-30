class data {
    constructor() {
        this.users = [
            {name:"Joe", age:30, city:"New York"},
            {name:"Rick", age:48, city:"London"}
          ]
    }

    AddUser(username, age, city) {
        let userobj = {name: username, age:age, city:city}

        this.users.push(userobj);
    }

    GetUsers() {
        return this.users;
    }
}

module.exports = data;