import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "../pages/Signup";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/app" element={<Navigate to="/home" replace />} />
            </Route>
            {/* DEFAULT */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            {/* FALLBACK */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}