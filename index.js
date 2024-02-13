const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "goodreads.db");

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.get("/books/", async (request, response) => {
      const getBooksQuery = `
        SELECT * FROM book ORDER BY book_id`;

      console.log(getBooksQuery);
      //   const booksArray = await db.get(getBooksQuery);
      const booksArray = await db.all(getBooksQuery);
      console.log(booksArray);
    });

    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();
