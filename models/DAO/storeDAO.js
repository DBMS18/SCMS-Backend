const db = require('../../db/db')
class StoreDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }
    static async getStoreCityByRouteId(route_id){
        let idCity =[];
        const query ="SELECT store_id,city FROM store INNER JOIN route ON store.store_id=route.store_id where route.route_id=?;";
        const out = await db.query(query,[route_id]);
        idCity = out.rows;
        return idCity;
    }


}
module.exports=StoreDAO;