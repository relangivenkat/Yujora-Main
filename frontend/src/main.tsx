import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TestEventForm from "./pages/TestEventForm";
import SponsorView from "./pages/SponsorView";
import EventDetails from "./pages/EventDetails";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/create-event",
    element: <TestEventForm />,
  },
  {
    path: "/sponsor",
    element: <SponsorView />,
  },
  {
    path: "/sponsor/event/:id",
    element: <EventDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
