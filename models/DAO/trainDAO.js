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
        let train_list =[];
        const query ="SELECT * FROM train LEFT OUTER JOIN train_store ON train.train_id = train_store.train_id where train_store.store_id=?;";
        const out = await db.query(query,[store_id]);
        train_list = out.rows;
        
        console.log('Got all trains of one order');
        return train_list;
        
    }



}
module.exports=TrainDAO;