import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, loggedIn }) {
  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
