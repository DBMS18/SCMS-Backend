const db = require('../../db/db')
class StorekeeperDutyRecordDAO{

    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async createOneEntity(user_id,duty_id){

        const query  = `insert into storekeeper_dutyrecord (user_id,duty_id) values (?,?);`;

        var out = await db.query(query,[user_id,duty_id]);

        return "added";
    }

    static async readAllEntity(){
        
    }

    static async readOneEntity(){
        
    }

    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }

}

module.exports = StorekeeperDutyRecordDAO;