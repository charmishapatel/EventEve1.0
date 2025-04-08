-- Insert data into Admin table
INSERT INTO Admin (adminName, email, password) VALUES
('John Doe', 'john.doe@example.com', 'hashed_password1'),
('Jane Smith', 'jane.smith@example.com', 'hashed_password2'),
('Alice Johnson', 'alice.johnson@example.com', 'hashed_password3'),
('Bob Brown', 'bob.brown@example.com', 'hashed_password4');

-- Insert data into Vendor table
INSERT INTO Vendor (adminID, vendorName, email, phoneNumber, status) VALUES
(1, 'Elegant Events', 'vendor1@example.com', '+1-234-567-8901', 'Approved'),
(2, 'Party Planners', 'vendor2@example.com', '+1-345-678-9012', 'Approved'),
(3, 'Grand Celebrations', 'vendor3@example.com', '+1-456-789-0123', 'Pending'),
(4, 'Royal Decor', 'vendor4@example.com', '+1-567-890-1234', 'Rejected');

-- Insert data into Services table
INSERT INTO Services (adminID, serviceName, description) VALUES
(1, 'Furniture Rental', 'Provides tables, chairs, and event furniture.'),
(2, 'Catering', 'Offers catering services for events.'),
(3, 'Live Music', 'Live band or DJ services.'),
(4, 'Decoration', 'Provides venue decorations for events.');

-- Insert data into Furniture table
INSERT INTO Furniture (serviceID, vendorID, furnitureName, price, description) VALUES
(1, 1, 'Luxury Sofa', 500.00, 'Premium quality sofa for events.'),
(1, 2, 'Banquet Chairs', 10.00, 'Elegant chairs for formal events.'),
(1, 3, 'Round Tables', 50.00, 'Decorated round tables for banquets.'),
(1, 4, 'Wedding Thrones', 700.00, 'Royal wedding thrones for couples.');

-- Insert data into Cake table
INSERT INTO Cake (serviceID, vendorID, cakeName, price, description) VALUES
(2, 1, 'Wedding Cake', 250.00, 'Three-tier wedding cake.'),
(2, 2, 'Birthday Cake', 40.00, 'Custom birthday cakes.'),
(2, 3, 'Cupcake Tower', 60.00, 'Assorted cupcake tower for parties.'),
(2, 4, 'Themed Cake', 120.00, 'Custom-themed cakes for any occasion.');

-- Insert data into Users table
INSERT INTO Users (userName, email, password, phoneNumber, address) VALUES
('Michael Scott', 'michael.scott@example.com', 'hashed_password5', '+1-678-901-2345', 'Scranton, PA'),
('Pam Beesly', 'pam.beesly@example.com', 'hashed_password6', '+1-789-012-3456', 'Scranton, PA'),
('Jim Halpert', 'jim.halpert@example.com', 'hashed_password7', '+1-890-123-4567', 'Scranton, PA'),
('Dwight Schrute', 'dwight.schrute@example.com', 'hashed_password8', '+1-901-234-5678', 'Schrute Farms, PA');

-- Insert data into Booking table
INSERT INTO Booking (userID, serviceID, serviceItemID, dateOfBooking, eventDate, quantity, status) VALUES
(1, 1, 1, CURRENT_DATE, '2025-06-15', 2, 'Confirmed'),
(2, 2, 2, CURRENT_DATE, '2025-07-10', 1, 'Pending'),
(3, 3, 3, CURRENT_DATE, '2025-08-05', 3, 'Cancelled'),
(4, 4, 4, CURRENT_DATE, '2025-09-01', 5, 'Confirmed');

-- Insert data into Delivery table
INSERT INTO Delivery (bookingID, vendorID, deliveryDate, pickupDate, quantity, deliveryCharges) VALUES
(1, 1, '2025-06-14', '2025-06-16', 2, 50.00),
(2, 2, '2025-07-09', '2025-07-11', 1, 30.00),
(3, 3, '2025-08-04', '2025-08-06', 3, 70.00),
(4, 4, '2025-08-31', '2025-09-02', 5, 90.00);

-- Insert data into Reports table
INSERT INTO Reports (adminID, totalRevenue, totalVendors, totalServiceItems, totalServices, reportDate) VALUES
(1, 5000.00, 10, 50, 5, '2025-01-01'),
(2, 7000.00, 15, 60, 8, '2025-02-01'),
(3, 6000.00, 12, 55, 7, '2025-03-01'),
(4, 8000.00, 20, 70, 10, '2025-04-01');

-- Insert data into Inventory table
INSERT INTO Inventory (serviceItemID, serviceID, vendorID, contractMonth, totalContracted, inStock) VALUES
(1, 1, 1, '2025-01-01', 20, 15),
(2, 2, 2, '2025-02-01', 30, 25),
(3, 3, 3, '2025-03-01', 40, 35),
(4, 4, 4, '2025-04-01', 50, 45);