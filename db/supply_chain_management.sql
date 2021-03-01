
-- --//----------------------Procedure---------------


-- delimiter $$
-- CREATE PROCEDURE create_duty(
--     storeId VARCHAR(10),
--     routeId VARCHAR(10),
--     driverId VARCHAR(10),
--     assistantId VARCHAR(10),
--     truckNumber VARCHAR(10),
--     assistant_status varchar(10),
--     startTime time,
--     endTime time
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
--     INSERT INTO duty_record (store_id,route_id,driver_id,assistant_id,truck_number, start_time,end_time) VALUES (storeId,routeId, driverId,assistantId , truckNumber, startTime,endTime);
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

-- delimiter $$
-- CREATE PROCEDURE mark_duty_off(
--     dutyId VARCHAR(10)
-- )

-- BEGIN
--     UPDATE duty_record SET status ='arrived' WHERE duty_id = dutyId;
--     UPDATE truck SET status ='unlocklock' WHERE truck_number = (select truck_number from duty_record where duty_id = dutyId);
-- END;
-- $$


-- --//----------------------Function---------------

-- delimiter $$
-- CREATE FUNCTION generate_endtime (routeId integer,startTime time)
--     RETURNS time
-- READS SQL DATA
-- BEGIN
-- 	DECLARE end_time time;
--     SELECT ADDTIME(startTime,'SELECT route_time FROM route WHERE route_id = routeId');
--     RETURN end_time;
-- END
-- $$

-- --//------------------------Views--------------------------

-- create view driver as select user_id as driver_id,frist_name,store_id,status from user join role using (role_id) where role_name = 'driver' ;
-- create view assistant as select user_id as assistant_id,frist_name,store_id,status from user join role using (role_id) where role_name = 'assistant' ;

-- create view storekeeper as select user_id as storekeeper_id,frist_name,store_id from user join role using (role_id) where role_name = 'storekeeper' ;






