const db = require('../../db/db');
class ManagerDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async getDetails(manager_id){
        console.log(manager_id);
        console.log('DAO')
        try {
            //let details = [];
            //gets the name and id of the loged manager
            //execute query and create order and push then to list
            const query  = `SELECT user_id, first_name FROM users WHERE user_id = ?`;
            const out = await db.query(query,[manager_id]);
            //details = out.rows;
            console.log(out[0]);
            return out[0];
        } catch (error) {
            console.log(error);
        }
       
    }

    // static async createOneEntity(){

    // }

    // static async readAllEntity(){
    //     let order_lis = []
    //     //gets the all  from the database
    //     //execute query and create order and push then to list
    //     const query  = `SELECT section_id, section_name FROM project_section WHERE project_id = $1`;
    //     const out = await db.query(query,[store_id]);
    //     order_lis = out.rows;
    //     return order_lis;
    // }

    // static async readOneEntity(){
    //     let order_lis;
    //     //gets the all  from the database
    //     //execute query and create order and push then to list
    //     const query  = `SELECT section_id, section_name FROM project_section WHERE project_id = $1`;
    //     const out = await db.query(query,[projectID]);
    //     order_lis = out.rows[0];
    //     return order_lis;
    // }

    // static async updateOneEntity(){
        
    // }

    // static async deleteOneEntity(){
        
    // }

    // static async changeOrderStatus(orderId,newState){
    //     // return success msg
    // }
    // static async getAllUnReceviedOrders(){
    //     // return "Assign to train" orders
    // }
    // static async getOrdersBefore(date){
    //     //return orders list
    // }
    // static async getTodayOrders(){
    //     // SELECT *FROM players WHERE DATE(us_reg_date) BETWEEN '2000-07-05' AND '2011-11-10';
    //     // SELECT *FROM players WHERE us_reg_date >= '2000-07-05' AND us_reg_date < '2011-11-10' + interval 1 day

    // }

}
module.exports =ManagerDAO;