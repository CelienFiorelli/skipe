import { FC } from "react";
import {useTheme} from "@mui/material/styles";

const Home : FC = () => {
    const theme = useTheme();

    return (
        <div style={{color: theme.palette.primary.main}}>Ma HOME de base :)</div>
    )
}

export default Home;