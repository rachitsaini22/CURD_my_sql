import mysql from "mysql2";
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "nodejs",
});

connection.connect((err) => {
  if (err) {
    console.error("Geting this error:", err);
  } else {
    console.log("Database connected");
  }
});

export {connection};
