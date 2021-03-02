const db = require('../../db/db')
class PaymentDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async getNewPaymentID(){
        const querry = 'select payment_id from payment order by payment_id DESC limit 1;';
        const out = await db.query(querry);
        return out[0][0].payment_id;
    }

    static async makeOneTimePayment(paid_amount,payment_method,dateNow,timeNow){

    }

    static async readAllEntity(){
        
    }

    static async readOneEntity(paymentId){
        
    }

    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }

    static async getPaymentId(paid_amount,payment_method,dateNow,timeNow){
        // return id
    }

    static async getAmountById(orderId){
        // return mount
    }


  
}

module.exports = PaymentDAO;