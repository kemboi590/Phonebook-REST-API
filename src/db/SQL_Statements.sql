-- Contacts table
CREATE TABLE Users(
	FirstName VARCHAR(255) NOT NULL,
	LastName VARCHAR(255) NOT NULL,
	hashedPassword VARCHAR(100)

)

ALTER TABLE Users 
ADD UserID INT IDENTITY(1,1) PRIMARY KEY


TRUNCATE TABLE Users
INSERT INTO Users (FirstName,LastName,Password) 
VALUES
('Brian','Kemboi','Pass1'),
('Sarah','Wanjiru','Pass2'),
('Vincent','Ndegwa','Pass3')

SELECT * FROM Users

CREATE TABLE Contacts (
    ContactID INT IDENTITY(1,1) PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    MobileNumber VARCHAR(50),
	GroupID INT 
);


TRUNCATE TABLE Contacts
ALTER TABLE Contacts 
ADD  FOREIGN KEY (GroupID) REFERENCES Groups(GroupID)

ALTER TABLE Contacts ADD GroupID INT
INSERT INTO Contacts VALUES ('Kevin', 'Kimani', '34455666',1),
('sam', 'fjhd', '34454566',2),
('dfdf', 'edfef', '34423666',3)



-- Groups table
CREATE TABLE Groups (
    GroupID INT IDENTITY(1,1) PRIMARY KEY,
    GroupName VARCHAR(50) NOT NULL
);


-- Inserting groups
INSERT INTO Groups (GroupName)
VALUES ('Ruby'),	--group1
       ('Win'),		 --group2
       ('Score');	--group3
	


INSERT INTO Contacts VALUES ('Kevin', 'Kimani', '34455666',1),
('sam', 'fjhd', '34454566',2),
('dfdf', 'edfef', '34423666',3)




   SELECT * FROM Groups
UPDATE Contacts SET FirstName ='Mutai' WHERE ContactID = 4


--DELETE FROM Contacts WHERE ContactID = 1


SELECT * FROM Contacts