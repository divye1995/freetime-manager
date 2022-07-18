import { NavLink, Outlet } from "react-router-dom";
import "./App.css";
import { HomeSolidIcon, SettingsSolidIcon } from "./components/Icons";
import { AppContextProvider } from "./providers/context";

function App() {
  return (
    <AppContextProvider>
      <div className="h-screen w-screen inline-flex flex-col md:flex-row">
        <nav className="px-8 inline-flex flex-row md:flex-col">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "px-8 py-4 " + (isActive ? "opacity-70" : "")
            }
          >
            <HomeSolidIcon />
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              "px-8 py-4 " + (isActive ? "opacity-70" : "")
            }
          >
            <SettingsSolidIcon />
          </NavLink>
        </nav>
        <div className="w-full flex flex-col md:pr-4 grow overflow-hidden">
          <Outlet />
        </div>
      </div>
    </AppContextProvider>
  );
}

export default App;
