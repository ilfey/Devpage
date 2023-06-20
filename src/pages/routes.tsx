import { RouteObject } from "react-router-dom";
import IndexPage from "./IndexPage";
import ErrorPage from "./ErrorPage";
import RootPage from "./RootPage";

export const routes: Array<RouteObject> = [
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <IndexPage />,
      },
    ],
  },
]