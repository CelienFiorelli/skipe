import { FC, useState, MouseEvent } from 'react';
import {Button} from "../../atoms"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Coeur vide
import FavoriteIcon from '@mui/icons-material/Favorite'; // Coeur plein
import { useTheme } from '@mui/material/styles';

interface FavoriteButtonProps {
    defaultFilled?: boolean;
    [key: string]: any;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({ defaultFilled = false, ...other }) => {
    const theme = useTheme();
    const [isFilled, setIsFilled] = useState(defaultFilled);

    const toggleFavorite = (e: MouseEvent) => {
        e.stopPropagation();
        setIsFilled(!isFilled);
    };

    return (
        <Button
            onClick={toggleFavorite}
            {...other}
            sx={{ color: theme.palette.secondary.main }}
        >
            {isFilled ? (
                // S'il est favori alors on affiche un coeur en entier
                <FavoriteIcon sx={{ color: theme.palette.secondary.main, fontSize: '25px'}} />
            ) : (
                // Sinon, que les bordures
                <FavoriteBorderIcon sx={{ color: theme.palette.secondary.main, fontSize: '25px'}} />
            )}
        </Button>
    );
};

export default FavoriteButton;
