import  {pool}  from '../config/db.js'; 

/* 
This module manages creations of tables, insertion of data into tables 
and fetching results from the table

This module can be further scaled for handling database operations
*/



/*
This function handles creationf of queryTable if it doesn't exist. If
exists it returns false.  
*/
export const createQueryTable = async () => {
    try {
        // Check if the table exists
        const checkTableQuery = `
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'queries'
            );
        `;

        const result = await pool.query(checkTableQuery);

        // If table exist we return the status of creation of table.
        if (result.rows[0].exists) {
            console.log("Query table already exists. No need to create it.");
            return true;
        }
        else{
        // If table does not exist we create a new queries table
        const queryTable = `
            CREATE TABLE queries (
                id SERIAL PRIMARY KEY,
                source_address TEXT NOT NULL,
                destination_address TEXT NOT NULL,
                distance_km DOUBLE PRECISION NOT NULL,
                distance_miles DOUBLE PRECISION NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        await pool.query(queryTable);
        // Upon successful creation of the table we log status of successful creation
        console.log("Query Table created successfully");
        return false;
    }

    } catch (error) {
        console.error("Error checking  query table:", error.message);
    }
};

/*
The insertQuery function handles insertion operations of the new user requests
*/
export const insertQuery = async (source_address, destination_address, distance_km, distance_miles) => {
    
    // Checking if the queries table exist, if not exists it creates a new table
    const tableExists = await createQueryTable();
    
    console.log(`Debug: Source Address:${source_address} destination_addrees:${destination_address}  distance_km =", ${distance_km}, "distance miles:${distance_miles}`);
  
    //Insertion sql query for inserting the data into database
    const insertQuery = `INSERT INTO queries (source_address, destination_address, distance_km, distance_miles) VALUES ($1, $2, $3, $4)`;
    const values = [source_address, destination_address, distance_km, distance_miles];

    try {

        
        await pool.query(insertQuery, values); //Insertion operation into the queries table
        console.log('Query inserted successfully');
        
        return true; //if insertion is successful, returning true;
    } catch (error) {
        console.error('Error inserting query', error);
        return false;
    }

}

export const getHistoryOfQueries = async () => {
    const getQueries = `SELECT * FROM queries ORDER BY created_at DESC`;

    try {
        const { rows } = await pool.query(getQueries);
        const result = rows.map(row => {
            return {
                source_address: row.source_address,
                destination_address: row.destination_address,
                distance_km: row.distance_km,
                distance_miles: row.distance_miles,
                created_at: row.created_at
            }
        });
        return result;
    } catch (error) {
        console.error('Error getting queries', error);
        return throwError(error);
    }
    
}

