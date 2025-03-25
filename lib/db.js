const Database = require("better-sqlite3");

// SQLite 데이터베이스 연결
const db = new Database("./database/portfolio.db", { verbose: console.log });

// 포트폴리오 테이블 생성 (없으면 생성)
const createTableQuery = `
CREATE TABLE IF NOT EXISTS portfolio (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
db.exec(createTableQuery);

// 데이터가 이미 있는지 확인
const checkDataQuery = "SELECT COUNT(*) as count FROM portfolio";
const row = db.prepare(checkDataQuery).get();

// if (row.count === 0) {
//   // 데이터가 없을 때만 삽입
//   const insertDataQuery = `
//   INSERT INTO portfolio (title, description) VALUES
//     ('Project 1', 'This is the first project.'),
//     ('Project 2', 'This is the second project.'),
//     ('Project 3', 'This is the third project.'),
//     ('Project 4', 'This is the first project.'),
//     ('Project 5', 'This is the second project.'),
//     ('Project 6', 'This is the third project.')
//   `;
//   db.exec(insertDataQuery);
// }

module.exports = db;
