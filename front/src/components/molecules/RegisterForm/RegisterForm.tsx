import { Button, CircularProgress, Container } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { TextField, Typography } from "../../atoms";
import { RegisterRequestModel } from "../../../typings/Auth";
import axiosService from "../../../services/AxiosService";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import {useTheme} from "@mui/material/styles";

const RegisterForm: FC = () => {
	const [pseudo, setPseudo] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState({
		pseudo: '',
		email: '',
		password: '',
		confirmPassword: '',
		general: ''
	});
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();
	const theme = useTheme();

	const validateForm = (): boolean => {
		return validatePassword() && validateConfirmPassword();
	};

	const validatePassword = (): boolean => {
		const isPasswordValid = password.length >= 8;
		setErrors(prevErrors => ({
			...prevErrors,
			password: isPasswordValid ? '' : 'Le texte mot de passe doit contenir au moins 8 caractères.'
		}));
		return isPasswordValid;
	};

	const validateConfirmPassword = (): boolean => {
		const arePasswordsIdentical = password === confirmPassword;
		setErrors(prevErrors => ({
			...prevErrors,
			confirmPassword: arePasswordsIdentical ? '' : 'La confirmation doit être identique au mot de passe'
		}));
		return arePasswordsIdentical;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		setErrors({ pseudo: '', email: '', password: '', confirmPassword: '', general: '' });

		if (!validateForm()) {
			setLoading(false);
			return;
		}

		const data: RegisterRequestModel = { pseudo: pseudo, email, password };

		try {
			const response = await axiosService.post("/register", data);
			const responseData = response?.data;
			if (!responseData?.user || !responseData?.token) throw new Error();

			login(responseData.user, responseData.token, () => {
				window.location.href = '/';
			});
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const apiErrors = error.response?.data.errors ?? { general: error.message };
				setErrors(prevErrors => ({
					...prevErrors,
					pseudo: apiErrors.pseudo ? apiErrors.pseudo[0] : '',
					email: apiErrors.email ? apiErrors.email[0] : '',
					password: apiErrors.password ? apiErrors.password[0] : '',
					general: apiErrors.general ?? ''
				  }));
			} else {
				console.error('Erreur inconnue:', error);
				setErrors(prevErrors => ({
					...prevErrors,
					general: 'Une erreur à été retournée, veuillez-rééssayer.'
				}));
			}
		} finally {
			setLoading(false);
		}
	};

	const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setConfirmPassword(value);
		if (value === password && errors.confirmPassword) {
			setErrors(prevErrors => ({ ...prevErrors, confirmPassword: '' }));
		}
	};

	return (
		<Container maxWidth="sm" style={{ marginTop: '50px' }}>
			<Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main }}>
				Créer mon compte
			</Typography>
			<form onSubmit={handleSubmit}>
				<TextField
					label="Nom"
					variant="outlined"
					fullWidth
					margin="normal"
					type="text"
					value={pseudo}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setPseudo(e.target.value)}
					required
					errorText={errors.pseudo}
					disabled={loading}
				/>
				<TextField
					label="Email"
					variant="outlined"
					fullWidth
					margin="normal"
					type="email"
					value={email}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
					required
					errorText={errors.email}
					disabled={loading}
				/>
				<TextField
					label="Mot de passe"
					variant="outlined"
					fullWidth
					margin="normal"
					type="password"
					value={password}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
					required
					errorText={errors.password}
					disabled={loading}
				/>
				<TextField
					label="Confirmation du mot de passe"
					variant="outlined"
					fullWidth
					margin="normal"
					type="password"
					value={confirmPassword}
					onChange={handleConfirmPasswordChange}
					required
					errorText={errors.confirmPassword}
					disabled={loading}
				/>
				<Button
					variant="contained"
					color="primary"
					type="submit"
					fullWidth
					sx={{ marginTop: '20px' }}
					disabled={loading}
				>
					{loading ? <CircularProgress size={24} color="inherit" /> : 'Créer mon compte'}
				</Button>
				{errors.general && (
					<Typography variant="body1" style={{ marginTop: '16px', color: 'red', textAlign: 'center' }}>
						{errors.general}
					</Typography>
				)}
			</form>
		</Container>
	);
};


export default RegisterForm;