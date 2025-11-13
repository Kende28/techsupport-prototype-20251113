import { NavLink, Outlet } from "react-router";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

function App() {
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <NavLink to="/">Főoldal</NavLink>
          <NavLink to="/pcs">Számítógépek</NavLink>
          <NavLink to="/components">Alkatrészek</NavLink>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
