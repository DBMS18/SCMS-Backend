
class CustomerModel{
   

    constructor(nic,email,password,first_name,last_name){
        this.nic = nic;
        this.email = email;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;

    }

    getNIC() {
        return this.nic;        
    }
    getEmail() {
        return this.email;        
    }
    getPassword() {
        return this.password;        
    }
    getFirstName() {
        return this.first_name;        
    }
    getLastName() {
        return this.last_name;        
    }
    

    setNIC(nic) {
        this.nic = nic;                
    }
    setEmail(email) {
        this.email = email;                
    }
    setPassword(password) {
        this.password = password;                
    }
    setFirstName(first_name) {
        this.first_name = first_name;                
    }
    setlastName(last_name) {
        this.last_name = last_name;                
    }
    

}

module.exports = CustomerModel;