import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button, Typography } from "../../atoms";
import ApiAuthorizationTest from "../../test/ApiAuthorizationTest";
import {useTheme} from "@mui/material/styles";

const Profile = () => {
	const { user, logout, isConnected } = useAuth();
	const theme = useTheme();

	return (
		<div>
			{isConnected() ? (
				<>
					<Typography variant="h5" gutterBottom color={theme.palette.primary.main}>
						Salut {user?.name}
					</Typography>
					<p style={{color: theme.palette.primary.main}}>Email: {user?.email}</p>
					<p style={{color: theme.palette.primary.main}}>Email vérifié : {user?.email_verified_at != null ? "oui" : "non"}</p>

					<Button
						variant="contained"
						color="error"
						onClick={logout}
						style={{ marginTop: '20px' }}
					>
						Déconnexion
					</Button>
				</>
			) : (
				<Navigate to="/auth/login" />
			)}
			<ApiAuthorizationTest />
		</div>
	);
};

export default Profile;