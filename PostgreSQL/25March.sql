CREATE TABLE cart (
  cartid SERIAL PRIMARY KEY,
  userid INTEGER, -- optional if login coming later
  itemid INTEGER,
  name VARCHAR(255),
  price NUMERIC(10,2),
  imageurl VARCHAR(255),
  quantity INTEGER DEFAULT 1
);

ALTER TABLE Vendor
ALTER COLUMN status SET DEFAULT 'Pending';

ALTER TABLE Vendor
ADD COLUMN password VARCHAR(255);

ALTER TABLE Users
ALTER COLUMN phoneNumber DROP NOT NULL,
ALTER COLUMN address DROP NOT NULL;


-- Image column 
ALTER TABLE Furniture ADD COLUMN imageURL TEXT;
ALTER TABLE Cake ADD COLUMN imageURL TEXT;
ALTER TABLE Decoration ADD COLUMN imageURL TEXT;
ALTER TABLE Karaoke ADD COLUMN imageURL TEXT;
ALTER TABLE Catering ADD COLUMN imageURL TEXT;
ALTER TABLE Flower ADD COLUMN imageURL TEXT;


-- update images
UPDATE Flower
SET imageURL = '/images/rose.jpg'
WHERE flowerName ILIKE '%rose%';

UPDATE Flower
SET imageURL = '/images/orchid arrangements.jpg'
WHERE flowerName ILIKE '%orchid%';

UPDATE Flower
SET imageURL = '/images/mixed floral basket.jpg'
WHERE flowerName ILIKE '%mixed floral%';

UPDATE Flower
SET imageURL = '/images/table centerpieces.jpg'
WHERE flowerName ILIKE '%centerpieces%';



UPDATE Cake SET imageURL = '/images/themed cake.jpg' WHERE cakeName ILIKE '%themed%';
UPDATE Cake SET imageURL = '/images/wedding cake.jpg' WHERE cakeName ILIKE '%wedding%';
UPDATE Cake SET imageURL = '/images/birthday cake.jpg' WHERE cakeName ILIKE '%birthday%';
UPDATE Cake SET imageURL = '/images/cupcake tower.jpg' WHERE cakeName ILIKE '%cupcake%';
UPDATE Cake SET imageURL = '/images/dessert bar.jpg' WHERE cakeName ILIKE '%dessert%';

-- Step 4: Populate image URLs for Decoration
UPDATE Decoration SET imageURL = '/images/stage decorations.jpg' WHERE decorationName ILIKE '%stage%';
UPDATE Decoration SET imageURL = '/images/table centerpieces.jpg' WHERE decorationName ILIKE '%table%';
UPDATE Decoration SET imageURL = '/images/theme backdrop.jpg' WHERE decorationName ILIKE '%theme%';
UPDATE Decoration SET imageURL = '/images/balloon decorations.jpg' WHERE decorationName ILIKE '%balloon%';
UPDATE Decoration SET imageURL = '/images/floral archway.jpg' WHERE decorationName ILIKE '%archway%';

-- Step 5: Populate image URLs for Furniture
UPDATE Furniture SET imageURL = '/images/round chairs.jpg' WHERE furnitureName ILIKE '%round%';
UPDATE Furniture SET imageURL = '/images/banquet chairs.jpg' WHERE furnitureName ILIKE '%banquet%';
UPDATE Furniture SET imageURL = '/images/luxury sofa.jpg' WHERE furnitureName ILIKE '%sofa%';
UPDATE Furniture SET imageURL = '/images/wedding thrones.jpg' WHERE furnitureName ILIKE '%thrones%';

-- Step 6: Populate image URLs for Catering
UPDATE Catering SET imageURL = '/images/vegetarian meals.jpg' WHERE mealName ILIKE '%vegetarian%';
UPDATE Catering SET imageURL = '/images/buffet package.jpg' WHERE mealName ILIKE '%buffet%';
UPDATE Catering SET imageURL = '/images/gourmet platter.jpg' WHERE mealName ILIKE '%gourmet%';

-- Step 7: Populate image URLs for Karaoke / Live Music
UPDATE Karaoke SET imageURL = '/images/acoustic band.jpg' WHERE bandName ILIKE '%acoustic%';
UPDATE Karaoke SET imageURL = '/images/jazz band.jpg' WHERE bandName ILIKE '%jazz%';
UPDATE Karaoke SET imageURL = '/images/rock band.jpg' WHERE bandName ILIKE '%rock%';
UPDATE Karaoke SET imageURL = '/images/live dj.jpg' WHERE bandName ILIKE '%dj%';


UPDATE services 
SET imageurl = '/images/livemusic.jpg' 
WHERE servicename = 'Live Music';

-- deleting dublicate data
DELETE FROM Furniture
WHERE furnitureID IN (
    SELECT furnitureID FROM (
        SELECT furnitureID,
               ROW_NUMBER() OVER (
                   PARTITION BY furnitureName, price, vendorID
                   ORDER BY furnitureID
               ) AS row_num
        FROM Furniture
    ) AS duplicates
    WHERE duplicates.row_num > 1
);



-- cake fixed
UPDATE Cake
SET serviceID = 6;


--rename 
ALTER TABLE Furniture RENAME COLUMN imageurl TO imageurl1;
ALTER TABLE Decoration RENAME COLUMN imageurl TO imageurl1;



-- 2 images

ALTER TABLE Decoration ADD COLUMN imageurl2 TEXT;
ALTER TABLE Decoration ADD COLUMN imageurl3 TEXT;


ALTER TABLE Furniture ADD COLUMN imageurl2 TEXT;
ALTER TABLE Furniture ADD COLUMN imageurl3 TEXT;


UPDATE Decoration
SET imageurl1 = '/images/stagedecoration1.jpg',
    imageurl2 = '/images/stagedecoration2.jpg',
    imageurl3 = '/images/stagedecoration3.jpg'
WHERE decorationname = 'Stage Decorations';




-- CAKE TABLE
ALTER TABLE Cake RENAME COLUMN imageurl TO imageurl1;
ALTER TABLE Cake ADD COLUMN imageurl2 TEXT;
ALTER TABLE Cake ADD COLUMN imageurl3 TEXT;

-- KARAOKE TABLE
ALTER TABLE Karaoke RENAME COLUMN imageurl TO imageurl1;
ALTER TABLE Karaoke ADD COLUMN imageurl2 TEXT;
ALTER TABLE Karaoke ADD COLUMN imageurl3 TEXT;

-- CATERING TABLE
ALTER TABLE Catering RENAME COLUMN imageurl TO imageurl1;
ALTER TABLE Catering ADD COLUMN imageurl2 TEXT;
ALTER TABLE Catering ADD COLUMN imageurl3 TEXT;

-- FLOWER TABLE
ALTER TABLE Flower RENAME COLUMN imageurl TO imageurl1;
ALTER TABLE Flower ADD COLUMN imageurl2 TEXT;
ALTER TABLE Flower ADD COLUMN imageurl3 TEXT;