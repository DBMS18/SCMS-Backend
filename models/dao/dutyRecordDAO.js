
class DutyRecordDAO{

    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async createOneEntity(store_id, route_id, driver_id, assistent_id, truck_number, endTime){

    }

    static async readAllEntity(){
        
    }

    static async readOneEntity(){
        
    }

    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }
    static async getLastCreatedDutyId(store_id, time_slot_id, driver_id, assistent_id, truck_number){

    }
    static async getSetoffDuty(store_id, dateNow){

    }
    // static async markDutyFinished(duty_id, status, timeNote){


    // }
}

module.exports = DutyRecordDAO;