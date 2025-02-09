import {FC, CSSProperties} from 'react';
import { Link } from '../../atoms';
import { useTheme } from '@mui/material/styles';

const CreateOfferButton: FC = () => {
    const theme = useTheme();

    const style: CSSProperties = {
        textDecoration: 'none',
        backgroundColor: theme.palette.secondary.main,
        height: 'fit-content',
        padding: '8px 32px',
        borderRadius: '8px',
        display: 'inline-block',
        color: "white !important",
        textAlign: 'center',
    };

    return (
        <Link href={"/offers/form"} sx={style}>
            + Déposer une annonce
        </Link>
    );
};

export default CreateOfferButton;
