const db = require('../../db/db')
class StoreDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }
    static async getStoreCityByRouteId(route_id){

        const query ="SELECT store.store_id,store.city FROM store INNER JOIN route ON store.store_id=route.store_id where route.route_id=?;";
        const out = await db.query(query,[route_id]);
        console.log(route_id);
        return out[0];
    }


}
module.exports=StoreDAO;