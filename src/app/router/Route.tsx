import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import NotFoundPage from "../../feature/error/NotFoundPage";
import KanbanPage from "../../feature/kanban/KanbanPage";
import ProjetctPage from "../../feature/project/ProjetctPage";
import App from "../layout/App";
import ClientPage from "../../feature/client/ClientPage";

const sideBarRoutes: RouteObject[] = [
    { path: '/task', element: <KanbanPage /> },
    { path: '/client', element: <ClientPage /> },
    { path: '/project', element: <ProjetctPage /> },
];

const otherRoutes: RouteObject[] = [
    { path: '/not-found', element: <NotFoundPage /> },
    { path: '*', element: <Navigate to="/not-found" replace /> },
];

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <Navigate to="/client" replace /> },
            ...sideBarRoutes,
            ...otherRoutes,
        ],
    },
];

export const router = createBrowserRouter(routes);