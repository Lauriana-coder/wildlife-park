import sqlite3 from 'sqlite3'; // Import SQLite3 library for database operations

const db = new sqlite3.Database('./database.db'); // Create or connect to the database file

db.serialize(() => { // Run all queries in order, one at a time

    db.run(`CREATE TABLE IF NOT EXISTS habitats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT
    )`); // Create habitats table if it doesn't exist

    db.run(`CREATE TABLE IF NOT EXISTS exhibits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        habitat_id INTEGER,
        animal TEXT,
        description TEXT
    )`); // Create exhibits table if it doesn't exist

    db.run(`CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        message TEXT
    )`); // Create contact messages table

    db.run(`INSERT OR IGNORE INTO habitats (id, name, description) VALUES 
        (1, 'Savannah Plains', 'Experience the vast open grasslands of Africa'),
        (2, 'Tropical Rainforest', 'Discover the lush canopy of the Amazon'),
        (3, 'Reptile World', 'Get up close with amazing cold-blooded creatures')`); // Insert habitat data

    db.run(`INSERT OR IGNORE INTO exhibits (habitat_id, animal, description) VALUES
        (1, 'Lion', 'The king of the savannah'),
        (1, 'Giraffe', 'The tallest animal on Earth'),
        (2, 'Toucan', 'Famous for its colourful beak'),
        (2, 'Jaguar', 'The apex predator of the rainforest'),
        (3, 'Nile Crocodile', 'One of the largest reptiles in the world'),
        (3, 'Komodo Dragon', 'The worlds largest living lizard')`); // Insert exhibit data
        
    console.log('Database tables created'); // Confirm tables were created
});

export default db; // Export database connection for use in other files