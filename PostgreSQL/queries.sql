-- images coloumn
ALTER TABLE Services ADD COLUMN imageUrl VARCHAR(255);

-- images url 
UPDATE Services 
SET imageUrl = '/images/furniture.jpg' WHERE serviceName = 'Furniture Rental';

UPDATE Services 
SET imageUrl = '/images/catering.jpg' WHERE serviceName = 'Catering';

UPDATE Services 
SET imageUrl = '/images/live_music.jpg' WHERE serviceName = 'Live Music';

UPDATE Services 
SET imageUrl = '/images/decoration.jpg' WHERE serviceName = 'Decoration';

-- new insert services
INSERT INTO Services (adminID, serviceName, description, imageurl)
VALUES 
(1, 'Flower', 'Provides fresh flowers and floral arrangements.', '/images/flower.jpg'),
(2, 'Cake', 'Offers custom cakes for various occasions.', '/images/cake.jpg');

-- furniture name updated 
UPDATE Services 
SET serviceName = 'Furniture' WHERE serviceId = '1';

-- Altering column name in Services table
ALTER TABLE Services RENAME COLUMN servicename TO serviceName;

-- Deleting extra from cake 
DELETE FROM cake
WHERE cakeid BETWEEN 5 AND 8;


