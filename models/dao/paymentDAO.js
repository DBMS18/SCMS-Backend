class PaymentDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
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