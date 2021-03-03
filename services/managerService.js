
// const { raw } = require('express');

const managerDAO = require("../models/DAO/managerDAO.js");
const RouteDAO = require("../models/DAO/routeDAO.js");
const StoreDAO = require("../models/DAO/storeDAO.js");
const trainOrderDAO =require("../models/DAO/trainOrderDAO.js");
const trainDAO = require("../models/DAO/trainDAO.js");
const orderDAO = require("../models/DAO/orderDAO.js");





class ManagerService{
    constructor(){
        try {
            // sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    // async createUser(id) {
    //     //gets the information from the database
    //     let userInfo = await UserModel.findOne({where: {id: id}});
    //     return new User(userInfo);
    // }
    async getDashboardDetails(manager_id){
        try { 
          
            var details = [];
            var detailsJsonList = await managerDAO.getDetails(manager_id); //getting manager details
            console.log("manager Service");
            detailsJsonList.forEach(row => {
                let manager_id = row.manager_id;
                let manager_name = row.user_name;

                var oneRecord = {manager_id,manager_name};
                details.push(oneRecord);
                 
            });
            return details;
            // [
            //     {
            //         manager_id: 1,
            //         user_name: Saman156   
            //     }
            // ]
                      
        } catch (error) {
            
        }        
        
    }
    async getOrdersPendingToAssignTrains(){
        try {       
            var OrdersList = [];
            var pendingList = await orderDAO.getPendingOrders(); //getting manager details
            for (let i = 0; i < pendingList.length; i++) {
                let order = pendingList[i];
                let order_id=order.order_id;
                var store_city = await StoreDAO.getStoreCityByRouteId(order.route_id);
                
                //console.log(store_city);
                var city = store_city[0].city;
                var store_id = store_city[0].store_id;
                //console.log(store_id);
                let date = order.date;
                let total_capacity = order.total_amount;
                let expected_date =order.expected_date;


                var train_list = await trainDAO.getTrainsListByStoreId(store_id);

                
                var OneOrder = {order_id,store_id,city, date,expected_date, total_capacity, train_list};
                OrdersList.push(OneOrder);
                
            }
            return OrdersList;
                      
        } catch (error) {
            
        }        
    }

    
    async addTrainOrderRecord(order_id,train_id){
        try {
            //get today date
            var datetime = new Date();
            var dateNow= datetime.toISOString().slice(0,10);
            
            await trainOrderDAO.createNewRecord(order_id,train_id,dateNow); //getting manager details
            await orderDAO.changeStateToAssigned(order_id);
            return "Sucessfully added the record";  
                      
        } catch (error) {
            
        }        
        
    }

   
    async updateTrainOrderRecord(order_id,train_id){
        try {
            //get today date
            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); 
            var yyyy = today.getFullYear();
            var dateNow = yyyy + '-' + mm + '-' + dd;
            
            await trainOrderDAO.updateRecord(order_id,train_id,dateNow); //getting manager details
            return "Sucessfully update the record";  
                      
        } catch (error) {
            
        }        
        
    }

    async getAllRecordsAssigned(){
 
        try {
            var datetime = new Date();
            var date= datetime.toISOString().slice(0,10);
            var details = [];
            var AssignedList = await orderDAO.getAssignedOrders(); //getting manager details
            

            for (let i = 0; i < AssignedList.length; i++) {
                var record = AssignedList[i];
                let order_id=record.order_id;
                
                var store_city = await StoreDAO.getStoreCityByRouteId(record.route_id);
                var city = store_city[0].city;
                var store_id = store_city[0].store_id;
                
                let date = record.date;
                let total_capacity = record.total_amount;
                let expected_date =record.expected_date;


                var train_list = await trainDAO.getTrainsListByStoreId(store_id);

                let train_id= record.train_id;
                var OneOrder = { order_id,store_id,city, date,expected_date, total_capacity, train_list,train_id}
                details.push(OneOrder);
                
            }
            console.log(details);
            return details;
                      
        } catch (error) {
            
        }        
    }
    async deleteRecord(order_id,train_id){
        try {
  
            await trainOrderDAO.deleteRecord(order_id,train_id); //getting manager details
            await orderDAO.changeStateToFree(order_id);
            
            return "Sucessfully deleted the record";  
                      
        } catch (error) {
            console.log(error);
        }        
    }
    async getAlltrainsWithRemainingCapacity(){
        try {
            let trainsList = await trainDAO.getAllTrains();
            var trainsListWithRemaining =[];
            for (let i = 0; i < trainsList.length; i++) {
                var train = trainsList[i];
                console.log(train);
                var totalVolume= await trainDAO.getTotalVolume(train.train_id);
                //console.log(totalVolume);
                console.log(totalVolume[0].sum_total);
                var remaining =parseInt(train.capacity)- parseInt(totalVolume[0].sum_total);
                console.log(remaining);
                var trainNew={train,remaining};
                trainsListWithRemaining.push(trainNew);
                
            }
            //console.log(trainsListWithRemaining);
            return trainsListWithRemaining;
        } catch (error) {
            console.log(error);
        }

    }
}

module.exports = ManagerService;
