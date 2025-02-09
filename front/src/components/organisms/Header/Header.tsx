import { Link } from "react-router-dom";
import { FC } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from "@mui/material";

const Header: FC = () => {
	const { isConnected, user } = useAuth();

    return (
        <nav className="main-navbar">
            <ul>
                <li><Link to="/"><h3>Accueil</h3></Link></li>
                <li><Link to="/offers"><h3>Liste des offres</h3></Link></li>
                <li><Link to="/conversations"><h3>Messages</h3></Link></li>
            </ul>
            {!isConnected() ?
                <div className="header-auth-buttons">
                    <Link to="/auth/login">
                        <h3>
                            Connexion
                        </h3>
                    </Link>
                </div>
                :

                <Link to="/profile">
                    <Box display='flex' alignItems='center'>
                        <AccountCircleIcon style={{marginRight: '0.5rem'}}/>
                        <h3>Bienvenue, {user?.name}</h3>
                    </Box>
                </Link>
            }
        </nav>
    );
}

export default Header;
