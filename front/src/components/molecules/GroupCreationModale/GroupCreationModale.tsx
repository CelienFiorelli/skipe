import { ChangeEvent, FC, useState } from "react";
import { Modal, Box, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Typography } from "../../atoms";

interface GroupCreationModaleProps {
	open: boolean;
	loading: boolean;
	error: boolean;
	setOpen: (state: boolean) => void;
	onGroupCreation: (name: string, memberIdList: string) => void;
}

const GroupCreationModale: FC<GroupCreationModaleProps> = ({ open, loading, error, setOpen, onGroupCreation }) => {
	const [name, setName] = useState("");
	const [memberIdList, setMemberIdList] = useState("");
	const handleClose = () => setOpen(false);
	
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
		e.preventDefault();
		onGroupCreation(name, memberIdList);
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<Box
				sx={{
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: 600,
					bgcolor: "background.paper",
					boxShadow: 24,
					p: 3,
					borderRadius: 2,
					position: "relative",
				}}
			>
				<IconButton
					onClick={handleClose}
					sx={{ position: "absolute", top: 8, right: 8 }}
					aria-label="fermer"
				>
					<CloseIcon />
				</IconButton>
				<Typography variant="h6" mb={2}>
					Créer un groupe
				</Typography>
				<form onSubmit={onSubmit}>
					<TextField
						fullWidth
						label="Nom"
						variant="outlined"
						margin="dense"
						value={name}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
						required
					/>
					<TextField
						fullWidth
						label="Membres à ajouter"
						variant="outlined"
						margin="dense"
						value={memberIdList}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setMemberIdList(e.target.value)}
						required
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						sx={{ mt: 2, width: "100%" }}
						loading={loading}
					>
						Créer
					</Button>
					{error && (
						<Typography variant="body1" type={'error'} style={{ marginTop: '16px' }}>Un problème est survenu</Typography>
					)}
				</form>
			</Box>
		</Modal>
	);
};

export default GroupCreationModale;