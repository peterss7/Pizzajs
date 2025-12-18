import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../features/app/pages/Login";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/app" element={<Navigate to="/home" replace />} />
            </Route>
            {/* DEFAULT */}
            <Route path="/" element={<Navigate to="/about" replace />} />
            {/* FALLBACK */}
            <Route path="*" element={<Navigate to="/about" replace />} />
        </Routes>
    );
}