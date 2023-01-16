-- Active: 1671552620566@@127.0.0.1@5432@ankasa@public
CREATE TABLE users(
    id VARCHAR(255) NOT NULL PRIMARY KEY
);

CREATE TABLE airlines(
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    airlines_names VARCHAR(255) NOT NULL,
    logo VARCHAR(255) NOT NULL,
    phonenumber BIGINT NOT NULL ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP
);

CREATE TABLE tickets(
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    id_airlines VARCHAR(255) NOT NULL REFERENCES airlines(id),
    departure_city VARCHAR(100) NOT NULL,
    arrival_city VARCHAR(100)NOT NULL,
    departure_time TIMESTAMP,
    arrive_time TIMESTAMP,
    price INT NOT NULL ,
    status INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    update_at TIMESTAMP
);

ALTER TABLE tickets 
  ADD COLUMN gate INT,
  ADD COLUMN terminal VARCHAR(100),
  ADD COLUMN class VARCHAR(100),
  ADD COLUMN code INT;


CREATE TABLE booking(
    id VARCHAR(255) NOT NULL,
    id_airlines VARCHAR(255) NOT NULL REFERENCES airlines(id),
    id_users VARCHAR(255)NOT NULL REFERENCES users(id),
    id_tickets VARCHAR(255)NOT NULL REFERENCES tickets(id),
    passenger_tittle VARCHAR(30) NOT NULL,
     passenger_name VARCHAR(100) NOT NULL,
     passenger_country VARCHAR(30) NOT NULL,
     payment INT DEFAULT '0',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    update_at TIMESTAMP
);

-- INSERT USERS SEMENTARA
INSERT INTO users (id) VALUES ('123456');

-- insert buat Airlines
INSERT INTO airlines(id,airlines_names,logo,phonenumber,update_at) VALUES ('122','Garuda Indonesia','ini link logo','0982772',current_timestamp);

-- INSERT SEMENTARA BUAT BOOKING
INSERT INTO tickets(id,id_airlines,departure_city,arrival_city,departure_time,arrive_time,price,status,update_at,
gate,terminal,class,code) VALUES('8763','12123','IDN','SGR',date '2022-12-23' + time '12:00',date '2022-12-23' + time '19:00',
'290','1',current_timestamp,'220','B','Economy','BC-223');

-- INSERT BUAT BOOKING/ORDER
INSERT INTO booking(id,id_airlines,id_users,id_tickets,passenger_tittle,passenger_name,passenger_country,
payment,update_at) VALUES('2','12123','123456','8765','MR','Rizky Syahputra','INDONESIA','1',CURRENT_TIMEstamp);


--GET ALL DATA TICKET pake where
SELECT ti.id,ti.id_airlines, ti.departure_city,ti.arrival_city,ti.departure_time,ti.arrive_time,ti.price,ti.status,
ai.airlines_names as airlines_names,ai.logo as logo FROM tickets as ti JOIN airlines as ai ON ti.id_airlines = ai.id
WHERE arrive_time between '2022-12-23 12:00:00' AND '2022-12-24 09:00:00';

--Get All Ticket BY ID USER
SELECT bo.id,bo.payment,ai.airlines_names as airlines_names,ti.departure_city as departure_city
,ti.arrival_city as arrival_city,ti.departure_time as departure_time,ti.code as code FROM booking as bo JOIN airlines as ai ON bo.id_airlines = ai.id
 JOIN tickets as ti ON bo.id_tickets = ti.id WHERE bo.id_users = '123456'; 


--Get Detail Ticket By ID BOOKING
SELECT bo.id,ti.code as code , ti.class as class ,ti.terminal as terminal,
ti.gate as gate,ti.departure_time as departure_time,ti.departure_city
as departure_city,ti.arrival_city as arrival_city FROM booking as bo JOIN
airlines as ai ON bo.id_airlines = ai.id JOIN tickets as ti ON bo.id_tickets = ti.id;

SELECT  ti.departure_time,ti.arrive_time,inteval(timestap,ti.arrive_time) AS Difference FROM tickets as ti;