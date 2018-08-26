
class Users {
    constructor () {
      this.users = [];
    }

    //adds a user to the users-array
    addUser (id, name, room) {
      var user = {id, name, room};
      this.users.push(user);
      return user;
    }

    //removes a user from the users-array
    removeUser (id) {
      var user = this.getUser(id);
  
      if (user) {
        this.users = this.users.filter((user) => user.id !== id);
      }
  
      return user;
    }

    //gets a user from the users-array
    getUser (id) {
      return this.users.filter((user) => user.id === id)[0]
    }

    //gets all the users from the users-array
    getUserList (room) {
      var users = this.users.filter((user) => user.room === room);
      var namesArray = users.map((user) => user.name);
  
      return namesArray;
    }

  }
  
  module.exports = {
      Users
    };

  