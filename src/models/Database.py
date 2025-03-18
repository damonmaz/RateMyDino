import mysql.connector  # type: ignore
from models import secret_db as sdb

class Database:

    def get_connection():
        try:
            conn = mysql.connector.connect(
                host=sdb.db_host,
                user=sdb.db_user,
                password=sdb.db_password,
                database=sdb.db_name
            )
            if conn.is_connected():
                return conn
            else:
                raise ConnectionError("Database connection failed.")

        except mysql.connector.Error as err:
            raise ConnectionError(f"Connection error: {err}")