import { useRef, useState } from "react";
import { Popover, Button, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography } from "../../atoms";
import "./NameWithPopover.css";

interface NameWithPopoverProps {
	name: string;
	logoutCallback: () => void;
}

const NameWithPopover: React.FC<NameWithPopoverProps> = ({ name, logoutCallback }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const triggerRef = useRef<HTMLDivElement>(null);

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
	) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		triggerRef.current?.focus();
	};

	const open = Boolean(anchorEl);
	const id = open ? "profile-popover" : undefined;

	return (
		<Box className="sidebar-header" display="flex" alignItems="center" padding="1rem" boxShadow="0px 3px 4px -1px rgba(0,0,0,0.9)" onClick={handleClick}>
			<AccountCircleIcon fontSize="large" />
			<Typography variant="h6" sx={{ ml: "1rem" }}>
				{name}
			</Typography>

			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
			>
				<Box p={2} display="flex" flexDirection="column" alignItems="center">
					<Button variant="contained" color="error" onClick={logoutCallback}>
						Déconnexion
					</Button>
				</Box>
			</Popover>
		</Box>
	);
};

export default NameWithPopover;
