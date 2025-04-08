-- Insert Sample Data for Furniture
INSERT INTO Furniture (serviceID, vendorID, furnitureName, price, description)
VALUES 
(1, 1, 'Luxury Sofa', 500.00, 'Premium quality sofa for events.'),
(1, 2, 'Banquet Chairs', 10.00, 'Elegant chairs for formal events.'),
(1, 3, 'Round Tables', 50.00, 'Decorated round tables for banquets.'),
(1, 4, 'Wedding Thrones', 700.00, 'Royal wedding thrones for couples.');

-- Insert Sample Data for Cake
INSERT INTO Cake (serviceID, vendorID, cakeName, price, description)
VALUES 
(6, 1, 'Wedding Cake', 250.00, 'Three-tier wedding cake with custom design.'),
(6, 2, 'Birthday Cake', 40.00, 'Custom birthday cakes with various flavors.'),
(6, 3, 'Cupcake Tower', 60.00, 'Assorted cupcake tower for events.'),
(6, 4, 'Themed Cake', 120.00, 'Custom-themed cakes for any occasion.');

-- Insert Sample Data for Decoration
INSERT INTO Decoration (serviceID, vendorID, decorationName, price, description)
VALUES 
(4, 1, 'Floral Archway', 200.00, 'Beautiful floral archway for weddings.'),
(4, 2, 'Balloon Decorations', 50.00, 'Custom balloon decorations for parties.'),
(4, 3, 'Themed Backdrops', 150.00, 'Personalized themed backdrops for events.'),
(4, 4, 'Stage Decorations', 500.00, 'Premium stage decorations for grand events.');

-- Insert Sample Data for Karaoke
INSERT INTO Karaoke (serviceID, vendorID, bandName, price, description)
VALUES 
(3, 1, 'Live DJ', 300.00, 'Professional DJ with custom playlists.'),
(3, 2, 'Acoustic Band', 500.00, 'Live acoustic band for elegant events.'),
(3, 3, 'Rock Band', 800.00, 'Energetic rock band for concerts and parties.'),
(3, 4, 'Jazz Band', 700.00, 'Smooth jazz band for formal gatherings.');

-- Insert Sample Data for Catering
INSERT INTO Catering (serviceID, vendorID, mealName, price, description)
VALUES 
(2, 1, 'Buffet Package', 20.00, 'Delicious buffet with multiple cuisines.'),
(2, 2, 'Vegetarian Meals', 15.00, 'Exclusive vegetarian meal package.'),
(2, 3, 'Gourmet Platter', 50.00, 'Premium gourmet food platter.'),
(2, 4, 'Dessert Bar', 30.00, 'Assorted desserts and sweets.');

-- Insert Sample Data for Flower
INSERT INTO Flower (serviceID, vendorID, flowerName, price, description)
VALUES 
(5, 1, 'Rose Bouquet', 25.00, 'Elegant rose bouquet for special occasions.'),
(5, 2, 'Orchid Arrangement', 40.00, 'Beautiful orchid flower arrangements.'),
(5, 3, 'Mixed Floral Basket', 35.00, 'Assorted fresh flowers in a basket.'),
(5, 4, 'Table Centerpieces', 50.00, 'Floral centerpieces for weddings.');
