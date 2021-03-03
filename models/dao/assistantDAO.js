const db = require('../../db/db')


class AssistantDAO{
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
    static async getUnlocHalfLockkAssistant(store_id){
        const query  = `SELECT * FROM assistant WHERE store_id = ? AND status = "unlock" or status = "halflock" AND assistant_id not in (SELECT assistant_id from duty_record where status = 'set-off');`;
        const out = await db.query(query,[store_id]);
        console.log(out[0]);
        return out[0];
        // return unlock or half unlock drivers in that store
    }

    static async getWeekHours(assistant_id,weekStartDate,dateNow){
        const query  = `SELECT SUM(time) as working_hours FROM duty_record join route using (route_id) WHERE date > ? AND date <= ? AND status = "arrived" AND assistant_id = ?`;
        const out = await db.query(query,[weekStartDate,dateNow,assistant_id]);
       
        return out[0];
    }


}

module.exports =AssistantDAO;