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
        const query  = `SELECT * FROM assistant WHERE store_id = ? AND status = "unlock" or status = "halflock"`;
        const out = await db.query(query,[store_id]);
        console.log(out[0]);
        return out[0];
        // return unlock or half unlock drivers in that store
    }


}

module.exports =AssistantDAO;