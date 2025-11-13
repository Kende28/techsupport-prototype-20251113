import { useEffect, useState } from "react";

export function Main() {
  const [pcs, setPCs] = useState([]);
  const [components, setComponents] = useState([]);

  const fetchAll = async () => {
    try {
      const pcsRes = await fetch("http://localhost:3000/pcs/unique");
      const componentsRes = await fetch("http://localhost:3000/components");

      const pcsData = await pcsRes.json();
      const componentsData = await componentsRes.json();

      setPCs(pcsData);
      setComponents(componentsData);
    } catch (error) {
      console.log(`Hiba: ${error}`);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <>
      <h1>Főoldal</h1>
      <div className="row">
        <div className="col-sm-6">
          <h3>Számítógépek</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Név</th>
                <th scope="col">Leírás</th>
              </tr>
            </thead>
            <tbody>
              {pcs.map((pc, id) => (
                <tr key={id}>
                  <td>{pc.pc_name}</td>
                  <td>{pc.pc_desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-sm-6">
          <h3>Alkatrészek</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Név</th>
                <th scope="col">Leírás</th>
              </tr>
            </thead>
            <tbody>
              {components.map((component) => (
                <tr key={component.id}>
                  <td>{component.component_name}</td>
                  <td>{component.component_desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
