import pool from "../config/db.config.js";


//Fetch Table
export async function fetchTable(req, res) {
  const { page = 1 } = req.query; 
  const pageSize = 15; 
  const offset = (page - 1) * pageSize; 

  try {
   
    const result = await pool.query(
      'SELECT * FROM people ORDER BY id LIMIT $1 OFFSET $2', 
      [pageSize, offset]
    );

   
    const countResult = await pool.query('SELECT COUNT(*) FROM people');
    const totalCount = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalCount / pageSize);

    res.json({
      data: result.rows,
      totalPages,
      currentPage: Number(page),
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//Fetch LineChart
export async function fetchLineChart(req, res) {
  try {
    const isVaccinated = req.query.is_vaccinated;

    if (isVaccinated !== "true" && isVaccinated !== "false") {
      return res.status(400).json({ error: "Invalid or missing 'is_vaccinated' query parameter." });
    }

    const query = `
      SELECT COUNT(*) AS count, EXTRACT(YEAR FROM AGE(birthdate))::int AS age
      FROM people
      WHERE is_vaccinated = $1
      GROUP BY age
      ORDER BY age;
    `;

    const result = await pool.query(query, [isVaccinated === "true"]);
    const formatted = result.rows.map(row => ({
      count: parseInt(row.count, 10),
      age: row.age,
    }));

    res.json({ data: formatted });
  } catch (error) {
    console.error("Error fetching vaccination counts by age:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


//Fetch BarChart
export async function fetchBarChart(req, res) {

  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) AS count,
        gender,
        EXTRACT(YEAR FROM AGE(birthdate))::int AS age
      FROM people
      GROUP BY age, gender
      ORDER BY age;
    `);

    res.json({ data: result.rows });
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//Add New Census
export async function newCensus(req, res) {
  const { name, is_vaccinated, birthdate, gender } = req.body;
  console.log(birthdate)
  if (!name || is_vaccinated === undefined || !birthdate || !gender) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO people (name, is_vaccinated, birthdate, gender)
       VALUES ($1, $2, $3::date, $4)
       RETURNING *`,
      [name, is_vaccinated, birthdate, gender]
    );

    res.status(201).json({ message: 'Vote submitted successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting vote:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}