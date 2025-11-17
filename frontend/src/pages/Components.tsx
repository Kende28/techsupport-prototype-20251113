import { useEffect, useState } from "react";

export function Components() {
  const [components, setComponents] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [available, setAvailable] = useState(1);

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
    e.preventDefault();
    const newComponent = {
      component_name: name,
      component_desc: desc,
      component_available: available,
    };
    try {
      const response = await fetch("http://localhost:3000/components", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComponent),
      });
      fetchComponents();
    } catch (error) {
      console.log(`Hiba: ${error}`);
    }
  };

  const handleDelete = async (componentId: number) => {
    const res = await fetch(`http://localhost:3000/components/${componentId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    fetchComponents();
  };

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
              <td>
                <span
                style={{cursor: "pointer"}}
                onClick={() => handleDelete(component.id)}
                >
                  🗑️
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container">
        <div className="column">
          <form onSubmit={handleSubmit}>
            <div className="row w-25">
              <label htmlFor="name">Név: </label>
              <br />
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <br />
            <div className="row w-25">
              <label htmlFor="desc">Leírás: </label>
              <br />
              <input
                id="desc"
                name="desc"
                type="text"
                required
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </div>
            <br />
            <div className="row w-25">
              <label htmlFor="available">Raktárban: </label>
              <br />
              <select
                id="available"
                name="available"
                value={available}
                onChange={(e) => setAvailable(parseInt(e.target.value))}
              >
                <option value={1}>Van</option>
                <option value={0}>Nincs</option>
              </select>
            </div>
            <br />
            <button type="submit">Hozzáad</button>
          </form>
        </div>
      </div>
    </>
  );
}
