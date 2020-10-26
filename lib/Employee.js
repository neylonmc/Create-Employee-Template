//Define and export the Employee class

//Employee Class
class Employee {

    constructor(name, id, email) {
        this.name = name; 
        this.id = id; 
        this.email = email;
    }

    getName() {
        return this.name; 
    }

    getId() {
        return this.id; 
    }

    getEmail() {
        return this.email; 
    }

    getRole() {
        return "Employee"; 
    }
}

//Export Employee module 
module.exports = Employee; 
