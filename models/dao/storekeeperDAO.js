
const db = require('../config/order-model.js');
const OrderModel =require('../models/order-model.js');

class StorekeeperDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async getAllorders(store_id){
        let order_lis = []
        //gets the all  from the database
        //execute query and create order and push then to list
        const query  = `SELECT section_id, section_name FROM project_section WHERE project_id = $1`;
        const out = await db.query(query,[store_id]);
        order_lis = out.rows;
        return order_lis;
    }

    static async markAsOrderRecevied(store_id){
        let order_lis;
        //gets the all  from the database
        //execute query and create order and push then to list
        const query  = `SELECT section_id, section_name FROM project_section WHERE project_id = $1`;
        const out = await db.query(query,[projectID]);
        order_lis = out.rows[0];
        return order_lis;
    }
}
module.exports = StorekeeperDAO;