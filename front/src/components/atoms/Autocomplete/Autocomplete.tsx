import {Autocomplete as MuiAutocomplete, AutocompleteProps} from "@mui/material";
import {FC} from "react";

const Autocomplete: FC<AutocompleteProps<any, any, any, any>> = ({...other}) => {
    return <MuiAutocomplete {...other}/>;
};

export default Autocomplete;