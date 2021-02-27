
-- --//----------------------Procedure---------------
-- DROP PROCEDURE IF EXISTS registerUser CASCADE;

-- delimiter $$
-- CREATE PROCEDURE create_duty(
--     storeId VARCHAR(10),
--     routeId VARCHAR(10),
--     driverId VARCHAR(10),
--     assistentId VARCHAR(10),
--     truckNumber VARCHAR(10),
--     startTime time,
--     endTime time
-- )

-- BEGIN
-- 	DECLARE duty_id varchar(10);
--     UPDATE driver SET status ='lock' WHERE driver_id = driverId;
--     UPDATE assistent SET status ='lock' WHERE assistent_id = assistentId;
--     -- or
--     UPDATE assistent SET status ='halflock' WHERE assistent_id = assistentId;
--     UPDATE truck SET status ='lock' WHERE truck_number = truckNumber;
--     INSERT INTO duty_record (store_id,route_id,driver_id,assistent_id,truck_number, start_time,end_time) VALUES (storeId,routeId, driverId,assistentId , truckNumber, startTime,endTime);
-- 	SELECT LAST_INSERT_ID();
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







