import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
const port = 3000;

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "techsupport",
});

app.get("/", (req, res) => {
  res.send("Működik a szerver");
});



app.get("/pcs/unique", async (req, res) => {
  try {
    const [results] = await connection.query(
      `SELECT pc_name, pc_desc FROM szamitogep_tabla GROUP BY szamitogep_tabla.pc_name;`
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Nem sikerült lekérdezni a számítógépet" });
  }
});

app.get("/pcs", async (req, res) => {
  try {
    const [results] = await connection.query(
      `SELECT id, pc_name, pc_desc, component_id, component_name FROM szamitogep_tabla`
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Nem sikerült lekérdezni a számítógépet" });
  }
});



app.get("/components", async (req, res) => {
  try {
    const [results] = await connection.query(
      `SELECT id, component_name, component_desc, component_available FROM pc_components`
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Nem sikerült lekérdezni az alkatrészt" });
  }
});

app.post("/components", async (req, res) => {
  try {
    const { component_name, component_desc, component_available } = req.body;

    // Egyszerű validáció
    if (!component_name || component_available === undefined) {
      return res
        .status(400)
        .json({ error: "Hiányzó kötelező mezők (név vagy elérhetőség)" });
    }

    // Új rekord beszúrása
    const [result] = await connection.query(
      `INSERT INTO pc_components (component_name, component_desc, component_available)
       VALUES (?, ?, ?)`,
      [component_name, component_desc, component_available]
    );

    // Visszaküldjük az új komponens adatait
    res.status(201).json({
      id: result.insertId,
      component_name,
      component_desc,
      component_available,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Nem sikerült létrehozni az alkatrészt" });
  }
});



app.delete("/components/:id", async (req, res) => {
  const componentId = req.params.id
  try {
    const [result] = await connection.query(
      `DELETE FROM pc_components WHERE id = ?`,
      [componentId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Component not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
})



app.put("/components/available/:id", async (req, res) => {
  const componentId = req.params.id;
  try {
    const [result] = await connection.query(
      `UPDATE pc_components SET component_available = 1 WHERE id = ?`,
      [componentId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Component not found" });
    }
    res.json({ message: "Component availability changed (available) successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/components/unavailable/:id", async (req, res) => {
    const componentId = req.params.id;
    try {
        const [result] = await connection.query(
            'UPDATE pc_components SET component_available = 0 WHERE id = ?',
            [componentId]
        );
 
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Component not found" });
        }
 
        res.json({ message: "Component availability changed (unavailable) successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(port, () => {
  console.log(`A szerver működik a ${port} porton.`);
});
