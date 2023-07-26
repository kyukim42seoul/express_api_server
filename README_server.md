DB table

- users
  - user_id(INT)
  - user_name(VARCHAR(20))

DB(MySQL) QUERY

CREATE TABLE [table_name] ([field_name] [field_type], ...);

INSERT INTO [table_name] ([field1], [field2]) VALUE ([field1_value], [field2_value]);

SELECT [field] FROM [database];

SHOW ...

데이터 타입

문자형

CHAR() : 0 ~ 255 고정문자 길이
VARCHAR() : 0 ~ 65535 가변 문자 길이
INNYTEXT : 0 ~ 255 문자길이
TEXT : 0 ~ 65535 문자길이
BLOB : 0 ~ 65535 문자길이
MEDIUMTEXT : 0 ~ 16777215 문자길이
MEDIUMBLOB : 0 ~ 16777215 문자길이
LONGTEXT : 0 ~ 4294967295 문자길이
LONGBLOB : 0 ~ 4294967295 문자길이

숫자형

INT : 4Byte : -2147483648 ~ 2147483647 : 0 ~ 4294967295
TINYNT : 1Byte : -128 ~ 127 : 0 ~ 255 정수형, UNSIGNED
FLOAT : 4Byte : -3.402823466×1038 ~ 3.402823466×1038
DOUBLE : 8Byte : -1.7976931348623157×10308 ~ 1.7976931348623157×10308

날짜형

DATE : 3Byte : YYYY-MM-DD
DATETIME : 8Byte : YYYY-MM-DD HH:MM:SS
TIMESTAMP : 4Byte : YYYYMMDDHHMMSS
TIME : 3Byte : HH:MM:SS
