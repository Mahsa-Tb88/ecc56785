import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Welcome from "../pages/Welcome/Welcome";
import DetailsOfCall from "../pages/DetailsOfCall/DetailsOfCall";
import Inbox from "../pages/Inbox/Inbox";
import ListCalls from "../pages/ListCalls/ListCalls";
import ArchiveCalls from "../pages/ArchiveCalls/ArchiveCalls";
import Contacts from "../pages/Contacts/Contacts";
import Settings from "../pages/Settings/Settings";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Welcome /> },
      { path: "calls", element: <ListCalls /> },
      { path: "inbox", element: <Inbox /> },
      { path: "archive", element: <ArchiveCalls /> },
      { path: "detailsOfCall/:id", element: <DetailsOfCall /> },
      { path: "contacts", element: <Contacts /> },
      { path: "setting", element: <Settings /> },
      { path: "home", element: <Home /> },
    ],
  },
]);

export default router;
