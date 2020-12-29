INSERT INTO UserDesignations (Designation) VALUES ('ADMIN'), ('MANAGER'), ('SALESMAN'), ('DELIVERYMAN'), ('CUSTOMER'), ('VENDOR');
INSERT INTO AccessStatus (Status) VALUES ('ALLOWED'), ('RESTRICTED');
INSERT INTO MessageStatus (Status) VALUES ('SEEN'), ('UNSEEN');
INSERT INTO OrderStatus (Status) VALUES ('UNAPPROVED'), ('APPROVED'), ('CANCELED'), ('ACCEPTED'), ('RETURNED');
INSERT INTO SaleTypes (Type) VALUES ('ONLINE'), ('OFFLINE');
INSERT INTO ProductStatus (Status) VALUES ('AVAILABLE'), ('UNAVAILABLE');
INSERT INTO RegistrationStatus (Status) VALUES ('PENDING'), ('APPROVED'), ('CANCELED');

INSERT INTO Logins (Username, Email, Mobile, Password, AccessStatusID, UserDesignationID, RegistrationStatusID) VALUES ('1', 'admin@gmail.com', '+8801234567890', '1111', 1, 1, 2);
INSERT INTO Logins (Username, Email, Mobile, Password, AccessStatusID, UserDesignationID, RegistrationStatusID) VALUES ('2', 'manager@gmail.com', '+8801234567890', '2222', 1, 2, 2);
INSERT INTO Logins (Username, Email, Mobile, Password, AccessStatusID, UserDesignationID, RegistrationStatusID) VALUES ('3', 'salesman@gmail.com', '+8801234567890', '3333', 1, 3, 2);
INSERT INTO Logins (Username, Email, Mobile, Password, AccessStatusID, UserDesignationID, RegistrationStatusID) VALUES ('4', 'deliveryman@gmail.com', '+8801234567890', '4444', 1, 4, 2);
INSERT INTO Logins (Username, Email, Mobile, Password, AccessStatusID, UserDesignationID, RegistrationStatusID) VALUES ('5', 'customer@gmail.com', '+8801234567890', '5555', 1, 5, 2);
INSERT INTO Logins (Username, Email, Mobile, Password, AccessStatusID, UserDesignationID, RegistrationStatusID) VALUES ('6', 'vendor@gmail.com', '+8801234567890', '6666', 1, 6, 2);