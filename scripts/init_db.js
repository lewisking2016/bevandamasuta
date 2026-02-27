const mysql = require('mysql2/promise');

async function updateDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || '145.239.19.134',
            user: process.env.DB_USER || 'vnsbhpwh_bevanda',
            password: process.env.DB_PASSWORD || 'lewisking2005',
            database: process.env.DB_NAME || 'vnsbhpwh_bevandamasuta_db',
        });

        console.log("Connected to MySQL Database: " + (process.env.DB_NAME || 'bevandamasuta_db'));

        // Drop the old table to ensure a clean schema creation for the new fields
        // (Assuming this is a fresh project and overriding is fine)
        await connection.query("DROP TABLE IF EXISTS contacts");
        console.log("Old 'contacts' table dropped.");

        const createTableQuery = `
      CREATE TABLE contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        country_code VARCHAR(10) NOT NULL,
        phone_number VARCHAR(50) NOT NULL,
        service_interest VARCHAR(100) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

        await connection.query(createTableQuery);
        console.log("Table 'contacts' is initialized with the new expanded schema.");

        await connection.end();
        console.log("Database schema update complete.");
        process.exit(0);

    } catch (error) {
        console.error("Error setting up the database:", error);
        process.exit(1);
    }
}

updateDatabase();
