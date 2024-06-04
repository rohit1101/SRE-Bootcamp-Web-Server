const pg = require("pg");

const { Pool } = pg;
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

exports.getHealthCheck = async (req, res) => {
  const check = {
    message: "OK",
    timestamp: Date.now(),
    uptime: process.uptime(),
  };

  try {
    const client = await pool.connect();
    client.release();
    res.status(200).json(check);
  } catch (error) {
    check.message = error;
    res.status(503).json(check);
  }
};

exports.getStudentById = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).send("Invalid Student ID");
  }

  const doesIdExists = await pool.query(
    "SELECT EXISTS(SELECT 1 FROM students WHERE id = $1)",
    [parseInt(id)]
  );

  doesIdExists.rows[0].exists
    ? pool
        .query(`Select * from students where id=$1;`, [parseInt(id)])
        .then((results) => res.status(200).send(results.rows[0]))
        .catch((e) => console.log("Error getStudentById request =>", e))
    : res.status(400).send("Student ID does not exist");
};

exports.getAllStudents = (req, res) => {
  return pool
    .query(`SELECT * FROM students`)
    .then((result) => res.send(result.rows))
    .catch((e) => console.log("error", e));
};

exports.addStudentEntry = (req, res) => {
  const { name, age, department } = req.body;
  let dbArgs = Object.keys(req.body);

  let dbVals = [];
  let query = "";

  name && dbVals.push(name);
  age && dbVals.push(age);
  department && dbVals.push(department);

  const updateStr = [...dbArgs].map((item, index) => item).join(",");
  query = `insert into students(${updateStr}) values($1,$2,$3) returning *;`;

  query
    ? pool
        .query(query, dbVals)
        .then((result) => res.send(result.rows[0]))
        .catch((e) => console.log("error", e))
    : res.status(400).send("Bad Request");
};

exports.updateStudentEntry = async (req, res) => {
  const { name, age, department } = req.body;
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).send("Invalid Student ID");
  }

  const doesIdExists = await pool.query(
    "SELECT EXISTS(SELECT 1 FROM students WHERE id = $1)",
    [parseInt(id)]
  );

  Boolean(doesIdExists.rows[0].exists)
    ? pool
        .query(
          "update students set id=$1,name=$2,age=$3,department=$4 where id=$5;",
          [parseInt(id), name, age, department, parseInt(id)]
        )
        .then(() =>
          res.status(200).send(`Student Entry modified with id:${id}`)
        )
        .catch((e) => console.log("Error PUT request =>", e))
    : res.status(400).send("Student ID does not exist");
};

exports.deleteStudentEntry = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).send("Invalid Student ID");
  }

  const doesIdExists = await pool.query(
    "SELECT EXISTS(SELECT 1 FROM students WHERE id = $1)",
    [parseInt(id)]
  );

  doesIdExists
    ? pool
        .query("delete from students where id=$1", [parseInt(id)])
        .then(() => res.status(200).send(`Deleted student entry with id:${id}`))
        .catch((e) => console.log("Error DELETE request =>", e))
    : res.status(400).send("Student ID does not exist");
};
