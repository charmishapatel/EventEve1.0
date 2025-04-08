-- Create Event Management Database


 
-- Create Admin Table
CREATE TABLE Admin (
    adminID SERIAL PRIMARY KEY,
    adminName VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL -- Added password field
);
 
 
-- Create Vendor Table
CREATE TABLE Vendor (
    vendorID SERIAL PRIMARY KEY,
    adminID INT REFERENCES Admin(adminID) ON DELETE SET NULL,
    vendorName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    status VARCHAR(50) CHECK (status IN ('Pending', 'Approved', 'Rejected'))
);
 
-- Create Services Table
CREATE TABLE Services (
    serviceID SERIAL PRIMARY KEY,
    adminID INT REFERENCES Admin(adminID) ON DELETE SET NULL,
    serviceName VARCHAR(255) NOT NULL,
    description TEXT
   
);
 
-- Create Service Subclasses
CREATE TABLE Furniture (
    furnitureID SERIAL PRIMARY KEY,  -- Unique identifier for each furniture item
    serviceID INT REFERENCES Services(serviceID) ON DELETE CASCADE,  -- Links to the Services table
    vendorID INT REFERENCES Vendor(vendorID) ON DELETE SET NULL,  -- Links to the Vendor table
    furnitureName VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT
);
 
 
CREATE TABLE Cake (
    cakeID SERIAL PRIMARY KEY,  -- Unique identifier for each furniture item
    serviceID INT REFERENCES Services(serviceID) ON DELETE CASCADE,  -- Links to the Services table
    vendorID INT REFERENCES Vendor(vendorID) ON DELETE SET NULL,  -- Links to the Vendor table
    cakeName VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT
);
 
 
CREATE TABLE Decoration (
    decorationID SERIAL PRIMARY KEY,  -- Unique identifier for each furniture item
    serviceID INT REFERENCES Services(serviceID) ON DELETE CASCADE,  -- Links to the Services table
    vendorID INT REFERENCES Vendor(vendorID) ON DELETE SET NULL,  -- Links to the Vendor table
    decorationName VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT
);
 
CREATE TABLE Karaoke (
    bandID SERIAL PRIMARY KEY,  -- Unique identifier for each furniture item
    serviceID INT REFERENCES Services(serviceID) ON DELETE CASCADE,  -- Links to the Services table
    vendorID INT REFERENCES Vendor(vendorID) ON DELETE SET NULL,  -- Links to the Vendor table
    bandName VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT
);
 
CREATE TABLE Catering (
    mealID SERIAL PRIMARY KEY,  -- Unique identifier for each furniture item
    serviceID INT REFERENCES Services(serviceID) ON DELETE CASCADE,  -- Links to the Services table
    vendorID INT REFERENCES Vendor(vendorID) ON DELETE SET NULL,  -- Links to the Vendor table
    mealName VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT
);
 
CREATE TABLE Flower (
    flowerID SERIAL PRIMARY KEY,  -- Unique identifier for each furniture item
    serviceID INT REFERENCES Services(serviceID) ON DELETE CASCADE,  -- Links to the Services table
    vendorID INT REFERENCES Vendor(vendorID) ON DELETE SET NULL,  -- Links to the Vendor table
    flowerName VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT
);
 
-- Create Client Table
CREATE TABLE Users (
    userID SERIAL PRIMARY KEY,
    userName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    address TEXT NOT NULL
);
 
-- Create Booking Table
CREATE TABLE Booking (
    bookingID SERIAL PRIMARY KEY,
    userID INT REFERENCES Users(userID) ON DELETE CASCADE,
    serviceID INT REFERENCES Services(serviceID) ON DELETE CASCADE,
    serviceItemID INT NOT NULL,  -- Stores specific item ID (furnitureID, bandID, cakeID, etc.)
    dateOfBooking DATE NOT NULL DEFAULT CURRENT_DATE,
    eventDate DATE NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    status VARCHAR(50) CHECK (status IN ('Pending', 'Confirmed', 'Cancelled'))
);
 
 
-- Create Delivery Table
CREATE TABLE Delivery (
    deliveryID SERIAL PRIMARY KEY,
    bookingID INT REFERENCES Booking(bookingID) ON DELETE CASCADE,
    vendorID INT REFERENCES Vendor(vendorID) ON DELETE SET NULL,  -- Links to the Vendor table
    deliveryDate DATE NOT NULL,
    pickupDate DATE NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    deliveryCharges DECIMAL(10,2) NOT NULL
);
 
-- Create Reports Table
CREATE TABLE Reports (
    reportID SERIAL PRIMARY KEY,
    adminID INT REFERENCES Admin(adminID) ON DELETE CASCADE,
    totalRevenue DECIMAL(15,2) NOT NULL,
    totalVendors INT NOT NULL,
    totalServiceItems INT NOT NULL,
    totalServices INT NOT NULL,
    reportDate DATE NOT NULL DEFAULT CURRENT_DATE
);
 
-- Create Client Services Relationship Table
CREATE TABLE User_Services (
    userID INT REFERENCES Users(userID) ON DELETE CASCADE,
    serviceID INT REFERENCES Services(serviceID) ON DELETE CASCADE,
    PRIMARY KEY (userID, serviceID)
);
 
-- Inventory
CREATE TABLE Inventory (
    inventoryID SERIAL PRIMARY KEY,
    serviceItemID INT NOT NULL,  -- Stores specific item ID (furnitureID, cakeID, etc.)
    serviceID INT REFERENCES Services(serviceID) ON DELETE CASCADE,  -- Links to the Services table
    vendorID INT REFERENCES Vendor(vendorID) ON DELETE SET NULL,  -- Links to the Vendor table
    contractMonth DATE NOT NULL,  -- Represents the contract period (Month-Year)
    totalContracted INT NOT NULL,  -- Total quantity contracted per month
    inStock INT NOT NULL,  -- Current stock available
    CONSTRAINT chk_stock CHECK (inStock >= 0) -- Ensures stock doesn't go negative
);