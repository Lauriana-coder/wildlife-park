import sqlite3 from 'sqlite3'; // Import SQLite3 library for database operations

const db = new sqlite3.Database('./database.db'); // Create or connect to the database file

db.serialize(() => { // Run all queries in order, one at a time

    db.run(`CREATE TABLE IF NOT EXISTS habitats ( // Create habitats table if it doesn't exist
        id INTEGER PRIMARY KEY AUTOINCREMENT, // Unique ID for each habitat
        name TEXT, // Name of the habitat
        description TEXT // Description of the habitat
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS exhibits ( // Create exhibits table if it doesn't exist
        id INTEGER PRIMARY KEY AUTOINCREMENT, // Unique ID for each exhibit
        habitat_id INTEGER, // Links exhibit to a habitat
        animal TEXT, // Name of the animal
        description TEXT // Description of the animal
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS contact_messages ( // Create contact messages table
        id INTEGER PRIMARY KEY AUTOINCREMENT, // Unique ID for each message
        name TEXT, // Name of the person who contacted
        email TEXT, // Email of the person
        message TEXT // The message content
    )`);

    db.run(`INSERT OR IGNORE INTO habitats (id, name, description) VALUES 
        (1, 'Savannah Plains', 'Experience the vast open grasslands of Africa'),
        (2, 'Tropical Rainforest', 'Discover the lush canopy of the Amazon'),
        (3, 'Reptile World', 'Get up close with amazing cold-blooded creatures')`); // Insert habitat data if not already present

    db.run(`INSERT OR IGNORE INTO exhibits (habitat_id, animal, description) VALUES
        (1, 'Lion', 'The king of the savannah'),
        (1, 'Giraffe', 'The tallest animal on Earth'),
        (2, 'Toucan', 'Famous for its colourful beak'),
        (2, 'Jaguar', 'The apex predator of the rainforest'),
        (3, 'Nile Crocodile', 'One of the largest reptiles in the world'),
        (3, 'Komodo Dragon', 'The worlds largest living lizard')`); // Insert exhibit data if not already present
        
    console.log('Database tables created'); // Confirm tables were created
});

export default db; // Export database connection for use in other files