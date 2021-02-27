const db = require('../../db/db')
class OrderStoreDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async createOneEntity(orderId,storeId,dateNow){
        const query  = "INSERT INTO `customer` (`customer_id`, `email`, `first_name`, `last_name`, `password`) VALUE (?, 'abc@gmail', 'kamal', 'amal', 'fbcfbncfb')";
        const out = await db.query(query,[orderId]);
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