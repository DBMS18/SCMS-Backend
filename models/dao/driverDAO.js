const db = require('../../db/db')


class DriverDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async createOneEntity(){

    }

    static async readAllEntity(){
        
    }

    static async readOneEntity(driverId){
        
    }

    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }
    static async getNameById(driverId){

    }
    static async getUnlockDrivers(store_id){
        const query  = `SELECT * FROM driver WHERE store_id = ? AND status = "unlock"`;
        const out = await db.query(query,[store_id]);
        console.log(out[0]);
        return out[0];
    }


}

module.exports =DriverDAO;