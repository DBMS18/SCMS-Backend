
-- --//----------------------Procedure---------------


-- delimiter $$
-- CREATE PROCEDURE create_duty(
--     storeId VARCHAR(10),
--     routeId VARCHAR(10),
--     driverId VARCHAR(10),
--     assistantId VARCHAR(10),
--     truckNumber VARCHAR(10),
--     startTime time
-- )

-- BEGIN
-- 	DECLARE duty_id varchar(10);
--     UPDATE driver SET status ='lock' WHERE driver_id = driverId;
--     UPDATE truck SET status ='lock' WHERE truck_number = truckNumber;
--     IF ((select status from assistant where assistant_id = assistantId) = 'halflock') then
-- 		UPDATE assistant SET status ='lock' WHERE assistant_id = assistantId;
--     ELSE
-- 		UPDATE assistant SET status ='halflock' WHERE assistant_id = assistantId;
--     END IF;
--     INSERT INTO duty_record (store_id,route_id,driver_id,assistant_id,truck_number, start_time) VALUES (storeId,routeId, driverId,assistantId , truckNumber, startTime);
-- 	SELECT LAST_INSERT_ID();
-- END;
-- $$


-- delimiter $$
-- CREATE PROCEDURE state_change(
-- 	storeId varchar(20),
--     startTime time,
--     today date,
--     driverId varchar(20),
--     assistantId varchar(20)
-- )
-- BEGIN
--     UPDATE driver SET status ='unlock' WHERE store_id = storeId and driver_id <> driverId and driver_id not in (select driver_id from duty_record where status = "set-off" and date = today);
--     UPDATE assistant SET status ='unlock' WHERE store_id = storeId and assistant_id <> assistantId and assistant_id not in (select assistant_id from duty_record where status = "set-off" and date = today);
-- END;
-- $$

--or

-- delimiter $$
-- CREATE PROCEDURE state_change(
-- 	storeId varchar(20),    
--     today date
-- )
-- BEGIN
--     UPDATE driver SET status ='unlock' WHERE store_id = storeId  and driver_id not in (select driver_id from duty_record where status = "set-off" and date = today);
--     UPDATE assistant SET status ='unlock' WHERE store_id = storeId and assistant_id not in (select assistant_id from duty_record where status = "set-off" and date = today);
-- END;
-- $$


-----------------------------------------


-- delimiter $$
-- CREATE PROCEDURE mark_duty_off(
--     dutyId VARCHAR(10)
-- )

-- BEGIN
--     UPDATE duty_record SET status ='arrived' WHERE duty_id = dutyId;
--     UPDATE truck SET status ='unlock' WHERE truck_number = (select truck_number from duty_record where duty_id = dutyId);
-- END;
-- $$


-- --//----------------------Function---------------

-- delimiter $$
-- CREATE FUNCTION driver_week_hours( driverId VARCHAR(10), startDate date, currentDate date) 
--    returns integer
--    BEGIN 
-- 	declare total integer ;
-- 	SELECT SUM(time) as total FROM duty_record join route using (route_id) WHERE date > startDate AND date <= currentDate AND status = "arrived" AND driver_id = driverId;
--     return total;
--    END;
-- $$

-- delimiter $$
-- CREATE FUNCTION assistant_week_hours( assistentId VARCHAR(10), startDate date, currentDate date) 
--    returns integer
--    BEGIN 
-- 	declare total integer ;
-- 	SELECT SUM(time) as total FROM duty_record join route using (route_id) WHERE date > startDate AND date <= currentDate AND status = "arrived" AND assistant_id = assistentId ;
--     return total;
--    END;
-- $$

-- CREATE FUNCTION truck_week_hours( truckNumber VARCHAR(10), startDate date, currentDate date) 
--    returns integer
--    BEGIN 
-- 	declare total integer ;
-- 	SELECT SUM(time) as total FROM duty_record join route using (route_id) WHERE date > startDate AND date <= currentDate AND status = "arrived" AND truck_number = truckNumber;
--     return total;
--    END;
-- $$

-- --for available routes

-- SELECT route_id,route_name FROM (order_store left outer join orders using (order_id)) left outer join route using (route_id) WHERE store_id = ? AND status ="stored";

---order_id should indexing 


-- --//------------------------Views--------------------------

-- create view driver as select user_id as driver_id,first_name,store_id,status from users join role using (role_id) where role_name = 'driver' ;

-- create view assistant as select user_id as assistant_id,first_name,store_id,status from users join role using (role_id) where role_name = 'assistant' ;

-- create view storekeeper as select user_id,first_name,store_id from users join role using (role_id) where role_name = 'storekeeper' ;



-- SELECT SUM(time) FROM `duty_record` join 'route' using (route_id) WHERE date > weekstart AND date <= currentdate AND status = "arrived" AND driver_id = 123


