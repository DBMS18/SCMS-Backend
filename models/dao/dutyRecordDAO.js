const db = require('../../db/db')
class DutyRecordDAO{

    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async createOneEntity(store_id, route_id, driver_id, assistent_id, truck_number,dateNow, starting,ending){
        const query  = `CALL create_duty(?,?,?,?,?,?,?,?)`;
        const out = await db.query(query,[store_id, route_id, driver_id, assistent_id, truck_number,dateNow, starting,ending]);
        console.log(out[0]);
        return out[0];
    }

    static async readAllEntity(){
        
    }

    static async readOneEntity(){
        
    }

    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }
    static async markDutyOff(duty_id){
        const query  = `CALL mark_duty_off(?)`;
        await db.query(query,[duty_id]);
        
        return "Success";
    }


    // static async getLastCreatedDutyId(store_id, time_slot_id, driver_id, assistent_id, truck_number){

    // }
    // static async getSetoffDuty(store_id, dateNow){

    // }
    // static async markDutyFinished(duty_id, status, timeNote){


    // }
}

module.exports = DutyRecordDAO;