import { TextField as MuiTextField, Typography } from '@mui/material';
import { FC } from 'react';
import { styled } from '@mui/system';
import {useTheme} from "@mui/material/styles";

interface CustomTextFieldProps {
    errorText?: string;

    [key: string]: any;
}

const StyledTextField = styled(MuiTextField)({
    marginBottom: '0px',
});

const TextField: FC<CustomTextFieldProps> = ({errorText, ...other}) => {
    const theme = useTheme();

    return (
        <>
            <StyledTextField
                {...other}
                error={!!errorText}
                sx={{
                    bgcolor: theme.palette.custom.input, // Fond personnalisé
                    color: 'white', // Couleur générale
                    '& .MuiInputBase-input': {
                        color: 'white', // Texte de l'input
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white', // Bordure normale
                        },
                        '&:hover fieldset': {
                            borderColor: 'white', // Bordure au survol
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white', // Bordure quand focus
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white', // Couleur du label au repos
                    },
                    '& .MuiInputLabel-root:hover': {
                        color: 'white', // Couleur du label au survol
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'white', // Couleur du label quand focus
                    },
                }}
            />

            <Typography
                component="p"
                variant="body2"
                sx={{
                    fontSize: '0.75rem',
                    margin: '3px 14px 0',
                    color: !!errorText ? '#d32f2f' : 'transparent',
                    userSelect: 'none',
                    height: '1em'
                }}
                dangerouslySetInnerHTML={{ __html: errorText || '' }}
            >
            </Typography>
        </>
    );
};

export default TextField;
