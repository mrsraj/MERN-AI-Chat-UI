import { useAuth } from "../context/ChatContext";
import { Navigate } from "react-router-dom";

function ProtectedRouter({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRouter;