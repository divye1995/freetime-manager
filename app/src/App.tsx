import { Link, Outlet } from "react-router-dom";
import "./App.css";
import ViewV1 from "./partials/View";
import { StoreProvider } from "./providers/context";

function App() {
  return (
    <StoreProvider>
      <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
        <Link to="/">Home</Link> |<Link to="/settings">Settings</Link>
      </nav>
      <Outlet />
    </StoreProvider>
  );
}

export default App;
