
class UserModel{
   

    constructor(userName,nic,email,password,name,addressline1,addressline2,city,zip){
        this.userName = userName;
        this.nic = nic;
        this.email = email;
        this.password = password;
        this.name = name;
        this.addressline1 = addressline1;
        this.addressline2 = addressline2;
        this.city  = city; 
        this.zip = zip;

    }

    getUserName() {
        return this.userName;        
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
    getName() {
        return this.name;        
    }
    getAddressLine1() {
        return this.addressline1;        
    }
    getAddressLine2() {
        return this.addressline2;        
    }
    getCity() {
        return this.city;        
    }
    getZip() {
        return this.zip;        
    }

    setUserName(userName) {
        this.userName = userName;                
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
    setName(name) {
        this.name = name;                
    }
    setAddressLine1(addressline1) {
        this.addressline1 = addressline1;                
    }
    setAddressLine2(addressline2) {
        this.addressline2 = addressline2;                
    }
    setCity(city) {
        this.city = city;                
    }
    setZip(zip) {
        this.zip = zip;                
    }

    

}