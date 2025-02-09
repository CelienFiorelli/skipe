import { FC } from 'react';
import {Button} from "../../atoms"
import { useTheme } from '@mui/material/styles';
import {AxiosResponse} from "axios";
import axiosService from "../../../services/AxiosService";

interface DeleteButtonProps {
    url: string;
}

const DeleteButton: FC<DeleteButtonProps> = ({ url }) => {
    const theme = useTheme();

    const toggleFavorite = async () => {
        const response: AxiosResponse = await axiosService.delete(url);
        console.log(response)
    };

    return (
        <Button
            onClick={toggleFavorite}
            sx={{ backgroundColor: theme.palette.custom.danger, color:"white"}}
        >
            Suppression
        </Button>
    );
};

export default DeleteButton;
