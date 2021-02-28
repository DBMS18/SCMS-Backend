const db = require('../../db/db')
class GuestQueryDAO{

    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async getUser(email){
        const querry = 'CALL login(?);';
        const out = await db.query(querry,[email]);
        return out;
    }

}

module.exports = GuestQueryDAO;