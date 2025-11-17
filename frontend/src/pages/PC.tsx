import { useEffect, useState } from "react";

export function PC() {
  const [pcs, setPCs] = useState([]);

  const fetchPCs = async () => {
    try {
      const res = await fetch("http://localhost:3000/pcs");
      const data = await res.json();
      setPCs(data);
    } catch (err) {
      console.log(`hiba: ${err}`);
    }
  };

  useEffect(() => {
    fetchPCs();
  }, []);

  return (
    <>
      <h1>Számítógép lista</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Név</th>
            <th scope="col">Leírás</th>
            <th scope="col">Alkatrész ID</th>
            <th scope="col">Alkatrész név</th>
          </tr>
        </thead>
        <tbody>
          {pcs.map((pc) => (
            <tr key={pc.id}>
              <td>{pc.id}</td>
              <td>{pc.pc_name}</td>
              <td>{pc.pc_desc}</td>
              <td>{pc.component_id}</td>
              <td>{pc.component_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
