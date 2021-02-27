const db = require('../../db/db')
class RouteDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async createOneEntity(){

    }

    static async readAllEntity(){
        
    }

    static async readOneEntity(routeId){
        
    }

    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }


    //get store id by route id
    static async getStoreIdByRouteId(routeId){
        
        return  3;
    }

    static async getSpendTime(route_id){
        // return duration time
    }
}

module.exports = RouteDAO;