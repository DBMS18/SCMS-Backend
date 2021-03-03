const AdminDAO = require("../models/dao/adminDAO");


class AdminService {
    constructor() {}
    

    async itemsWithMostOrders(){
        try{
            var mostOrderList=await AdminDAO.getItemsWithMostOrders();
            return mostOrderList;
        }catch (error) {
            console.log(error)
        }
    }

    async customerOrderReport(){
        try{
            var customerOrderReportList=await AdminDAO.getCustomerOrderReport();
            return customerOrderReportList;
        }catch (error) {
            console.log(error)
        }
    }


    async salesReport(){
        try{
            var salesReportList=await AdminDAO.getSalesReport();
            return salesReportList;
        }catch (error) {
            console.log(error)
        }
    }
    async driverWorkedHours(){
        try{
            var curr = new Date; 
            var first = curr.getDate() - curr.getDay(); 
            var firstday = new Date(curr.setDate(first));
            var dd = String(firstday.getDate()).padStart(2, '0');
            var mm = String(firstday.getMonth() + 1).padStart(2, '0');
            var yyyy = firstday.getFullYear();
            var weekStartDate = yyyy + '-' + mm + '-' + dd;


            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            var dateNow = yyyy + '-' + mm + '-' + dd;
            var driverWorkedHoursList=await AdminDAO.getWorkingHoursDrivers(weekStartDate,dateNow);
            return driverWorkedHoursList;
        }catch (error) {
            console.log(error)
        }
    }
    async assistantWorkedHours(){
        try{
            var curr = new Date; 
            var first = curr.getDate() - curr.getDay(); 
            var firstday = new Date(curr.setDate(first));
            var dd = String(firstday.getDate()).padStart(2, '0');
            var mm = String(firstday.getMonth() + 1).padStart(2, '0');
            var yyyy = firstday.getFullYear();
            var weekStartDate = yyyy + '-' + mm + '-' + dd;


            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            var dateNow = yyyy + '-' + mm + '-' + dd;
            var assistantWorkedHoursList=await AdminDAO.getWorkingHoursAssistant(weekStartDate,dateNow);
            return assistantWorkedHoursList;
        }catch (error) {
            console.log(error)
        }
    }
    async truckWorkedHours(){
        try{
            var curr = new Date; 
            var first = curr.getDate() - curr.getDay(); 
            var firstday = new Date(curr.setDate(first));
            var dd = String(firstday.getDate()).padStart(2, '0');
            var mm = String(firstday.getMonth() + 1).padStart(2, '0');
            var yyyy = firstday.getFullYear();
            var weekStartDate = yyyy + '-' + mm + '-' + dd;


            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            var dateNow = yyyy + '-' + mm + '-' + dd;
            var truckWorkedHoursList=await AdminDAO.getWorkingHoursTruck(weekStartDate,dateNow);
            return truckWorkedHoursList;
        }catch (error) {
            console.log(error)
        }
    }
    async quarterlySalesReport(){
        try{
            var quarterlySalesReportList=await AdminDAO.getQuaterlySalesReport();
            return quarterlySalesReportList;
        }catch (error) {
            console.log(error)
        }
    }




}
module.exports = AdminService;