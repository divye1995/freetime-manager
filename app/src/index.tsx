import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewV1, { ViewV2 } from "./partials/View";
import SettingsV1 from "./partials/Settings";
import TaskSuggestionList from "./partials/TaskSuggestionList";
import TaskHierarchyEditor from "./partials/TaskHierarchyEditor";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<ViewV2 />} />
        <Route path="settings" element={<SettingsV1 />}>
          <Route index element={<TaskSuggestionList />} />
          <Route path="heirarchy" element={<TaskHierarchyEditor />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
