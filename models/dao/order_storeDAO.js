const db = require('../../db/db')
class OrderStoreDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    //tharinda
    static async createOneEntity(order_id,store_id,dateNow){
        const query  = "INSERT INTO `order_store` (`store_id`, `order_id`, `store_date`) VALUE (?, ?, ?)";
        const out = await db.query(query,[store_id,order_id,dateNow]);
        return "Pass";
    }

    

    static async readAllEntity(){
        
    }

    static async readOneEntity(){
        
    }

    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }
    static async getAllOrdersInMyStore(storeId){
        
    }
}

module.exports =OrderStoreDAO;