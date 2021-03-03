const db = require('../../db/db')
class TruckDAO{
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

    static async readOneEntity(){
        
    }

    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }
    static async getUnlockTrucks(store_id){
        try {
            const query  = "SELECT truck_number,capacity FROM `truck` where status = 'unlock' AND store_id = ?";
            const out = await db.query(query,[store_id]);
            return out[0];
            
        } catch (error) {
            console.log(error);
        }
        
    }
}

module.exports = TruckDAO;