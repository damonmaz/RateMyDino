import mysql.connector
import secret_db as sdb

try:
    # Connect to MySQL
    conn = mysql.connector.connect(
        host=sdb.db_host,
        user=sdb.db_user,
        password=sdb.db_password,
        database=sdb.db_name
    )
    print("Connected to MySQL database!")

    # Create cursor
    cursor = conn.cursor()

    # Insert a user
    insert_query = """
    INSERT INTO USER (email, pwd, firstName, lastName)
    VALUES (%s, %s, %s, %s);
    """
    user_data = ("testuser@example.com", "securepassword", "Test", "User")
    cursor.execute(insert_query, user_data)
    conn.commit()
    print("User added successfully!")

    # Select the user
    select_query = "SELECT * FROM USER WHERE email = %s;"
    cursor.execute(select_query, (user_data[0],))
    for user in cursor.fetchall():
        print("Selected User:", user)

    # Delete the user
    delete_query = "DELETE FROM USER WHERE email = %s;"
    cursor.execute(delete_query, (user_data[0],))
    conn.commit()
    print("User deleted successfully!")

    # Close connection
    cursor.close()
    conn.close()

except mysql.connector.Error as err:
    print(f"Error: {err}")
