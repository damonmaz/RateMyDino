import os
import mysql.connector  # type: ignore
dbhost = os.environ.get("db_host")
dbuser = os.environ.get("db_user")
dbpwd = os.environ.get("db_password")
dbname = os.environ.get("db_name")

class Database:

    def get_connection():
        try:
            conn = mysql.connector.connect(
                host=dbhost,
                user=dbuser,
                password=dbpwd,
                database=dbname
            )
            if conn.is_connected():
                return conn
            else:
                raise ConnectionError("Database connection failed.")

        except mysql.connector.Error as err:
            raise ConnectionError(f"Connection error: {err}")