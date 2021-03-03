
-- --//----------------------Procedure---------------
-- DROP PROCEDURE IF EXISTS registerUser CASCADE;

-- delimiter $$
-- CREATE PROCEDURE create_duty(
--     storeId VARCHAR(10),
--     routeId VARCHAR(10),
    -- driverId VARCHAR(10),
    -- assistentId VARCHAR(10),
    -- truckNumber VARCHAR(10),
    -- startTime time,
    -- endTime time
-- )

-- BEGIN
-- 	DECLARE duty_id varchar(10);
--     UPDATE driver SET status ='lock' WHERE driver_id = driverId;
--     UPDATE assistent SET status ='lock' WHERE assistent_id = assistentId;
--     -- or
--     UPDATE assistent SET status ='halflock' WHERE assistent_id = assistentId;
--     UPDATE truck SET status ='lock' WHERE truck_number = truckNumber;
    -- INSERT INTO duty_record (store_id,route_id,driver_id,assistent_id,truck_number, start_time,end_time) VALUES (storeId,routeId, driverId,assistentId , truckNumber, startTime,endTime);
	-- SELECT LAST_INSERT_ID();
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