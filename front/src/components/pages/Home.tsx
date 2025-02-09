import { FC } from 'react';
import {useTheme} from "@mui/material/styles";

const Home : FC = () => {
    const theme = useTheme();

    return (
        <div style={{color: theme.palette.primary.main}}>Ceci est la HOME provisoire</div>
    )
}

export default Home;