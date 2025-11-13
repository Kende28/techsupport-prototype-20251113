import { useEffect, useState } from "react";

export function Components() {
  const [components, setComponents] = useState([]);

  const fetchComponents = async () => {
    try {
      const res = await fetch("http://localhost:3000/components");
      const data = await res.json();
      setComponents(data);
    } catch (err) {
      console.log(`Hiba: ${err}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const neComponent = {
        component_name: name,
        component_desc: desc,
        component_available: available
    }
    try {
        const response = await fetch('http://')
    } catch (error) {
        console.log(`Hiba: ${error}`)
    }
  }

  const handleAvailable = async (componentId: number) => {
    const res = await fetch(
      `http://localhost:3000/components/available/${componentId}`,
      {
        method: "PUT",
      }
    );
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    fetchComponents();
  };

  const handleUnavailable = async (componentId: number) => {
    const res = await fetch(
      `http://localhost:3000/components/unavailable/${componentId}`,
      {
        method: "PUT",
      }
    );
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    fetchComponents();
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  return (
    <>
      <h1>Alkatrész lista</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Név</th>
            <th scope="col">Leírás</th>
            <th scope="col">Raktárban</th>
          </tr>
        </thead>
        <tbody>
          {components.map((component) => (
            <tr key={component.id}>
              <td>{component.id}</td>
              <td>{component.component_name}</td>
              <td>{component.component_desc}</td>
              <td>
                {component.component_available ? "Van" : "Nincs"}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleAvailable(component.id)}
                >
                  ✔️
                </span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleUnavailable(component.id)}
                >
                  ✖️
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container">
        <div className="row">
            <form onSubmit={handleSubmit()}>

            </form>
        </div>
      </div>
    </>
  );
}
