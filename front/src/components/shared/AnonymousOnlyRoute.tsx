import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AnonymousOnlyRoute = ({ children }: { children: ReactNode }) => {
	const { isConnected } = useAuth();

	if (isConnected()) {
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
};

export default AnonymousOnlyRoute;