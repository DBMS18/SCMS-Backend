
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
        const query  = `SELECT truck_number,capacity FROM truck WHERE store_id = ? AND status = "unlock" `;
        const out = await db.query(query,[store_id]);
        console.log(out[0]);
        return out[0];
    }
}

module.exports = TruckDAO;