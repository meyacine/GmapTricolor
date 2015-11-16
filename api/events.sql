CREATE EVENT VertOrange 
ON  SCHEDULE EVERY 32 SECOND 
DO 
UPDATE light_stops SET state = 'O' WHERE state = 'G';   

CREATE EVENT OrangeRouge
ON  SCHEDULE EVERY 4 SECOND 
DO 
UPDATE light_stops SET state = 'R' WHERE state = 'O';   

CREATE EVENT RougeVert
ON  SCHEDULE EVERY 36 SECOND 
DO
UPDATE light_stops SET state = 'G' WHERE state = 'R';   

SHOW PROCESSLIST;

SET GLOBAL event_scheduler = ON;

# see http://dev.mysql.com/doc/refman/5.1/en/events-configuration.html