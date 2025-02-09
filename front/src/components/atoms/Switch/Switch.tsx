import {SwitchProps, Switch as MuiSwitch} from "@mui/material";
import {FC} from "react";

const Switch: FC<SwitchProps> = ({...other}) => {
    return <MuiSwitch {...other} />
};

export default Switch;