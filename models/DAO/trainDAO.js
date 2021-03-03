const db = require('../../db/db')
class TrainDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async createOneEntity(){

    }
    static async getTrainsListByStoreId(store_id){
        const query ="SELECT * FROM train LEFT OUTER JOIN train_store ON train.train_id = train_store.train_id where train_store.store_id=?;";
        const out = await db.query(query,[store_id]);
        
        console.log('Got all trains of one order');
        return out[0];
        
    }
    static async getTotalVolume(train_id){
        const query= 'SELECT sum(total_capacity) from orders LEFT outer join train_order on orders.order_id=train_order.order_id WHERE train_order.train_id=?;';
        const out = await db.query(query,[train_id]);
        var totalVolume=out[0][0];
        return totalVolume;

    }
    static async getAllTrains(){
        
        const query ="SELECT * FROM train;";
        const out = await db.query(query,[store_id]);
        return out[0];
    }



}
module.exports=TrainDAO;