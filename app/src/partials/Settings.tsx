import { PropsWithChildren } from "react";
import { Link, Outlet } from "react-router-dom";
import { BasicTemplate } from "../components/BasicTemplate";

function SettingsV1() {
  return (
    <BasicTemplate title="Settings">
      <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
        <Link to="/settings">Tasks</Link> |
        <Link to="/settings/heirarchy">Heirarchy</Link>
      </nav>
      <Outlet />
    </BasicTemplate>
  );
}

export default SettingsV1;
