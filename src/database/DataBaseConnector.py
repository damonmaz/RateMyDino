import mysql.connector # type: ignore
from database import secret_db as sdb


def get_db_connection():
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
            raise ConnectionError("Database connection was not successful.")

    except mysql.connector.Error as err:
        raise ConnectionError(f"Error: {err}")