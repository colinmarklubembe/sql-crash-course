import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

export async function getNotes() {
  const [rows] = await pool.query("SELECT * FROM notes");
  return rows;
}

export async function getNote(id) {
  const [rows] = await pool.query("SELECT * FROM notes WHERE id = ?", [id]);
  return rows[0];
}

export async function createNote(title, contents) {
  const [result] = await pool.query(
    "INSERT INTO notes (title, contents) VALUES (?, ?)",
    [title, contents]
  );

  const id = result.insertId;
  const addedResult = await getNote(id);
  return addedResult;
}

export async function updateNote(id, title, contents) {
  await pool.query("UPDATE notes SET title = ?, contents = ? WHERE id = ?", [
    title,
    contents,
    id,
  ]);

  const updatedResult = await getNote(id);
  return updatedResult;
}
