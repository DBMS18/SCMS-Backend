const db = require('../../db/db')
class ProductDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async createOneEntity(){

    }

    static async readAllEntity(keyword){
        const query  = `select * from product where type like ?`;
        const out = await db.query(query,['%'+keyword+'%']);
        return out[0];
    }

    static async readOneEntity(){
        
    }

    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }
    static async getProductById(productId){
        //retrun product name 
    }

    static async getAmountById(product_id){

    }
    static async changeAmountById(product_id,newAmount){
        
    }

  
}

module.exports =ProductDAO;