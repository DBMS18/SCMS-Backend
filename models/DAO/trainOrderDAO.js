const db = require('../../db/db');
class TrainOrderDAO{
    constructor(){

    }

    static async createNewRecord(order_id,train_id,dateNow){
    
        const query  = 'INSERT INTO train_order(`order_id`,`train_id`,`assigned_date`) VALUES (?,?,?);';
        await db.query(query,[order_id,train_id,dateNow]);
        return 'Sucessfully added the record';
    }   

    static async deleteRecord(order_id,train_id){
        const query = 'DELETE from train_order WHERE (`order_id`=? AND `train_id`=?);';
        await db.query(query,[order_id,train_id]);
        console.log("record deleted sucessfully");
        return 'Sucessful';
    }
    static async updateRecord(order_id,train_id,dateNow){
        const query ='UPDATE train_order SET `train_id` = ?, `assigned_date`= ? WHERE order_id = ?;';
        await db.query(query,[order_id,train_id,dateNow]);
        console.log("sucessfully updated the train");
        return 'Sucessful';
    }


}
module.exports =TrainOrderDAO;