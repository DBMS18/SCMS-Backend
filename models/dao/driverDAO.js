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
       
        return out[0];
    }

    static async getWeekHours(driver_id,week_start,current_date){
        const query  = `SELECT SUM(time) FROM duty_record join route using (route_id) WHERE date > ? AND date <= ? AND status = "arrived" AND driver_id = ?`;
        const out = await db.query(query,[week_start,current_date,driver_id]);
       
        return out[0];
    }

}

module.exports =DriverDAO;