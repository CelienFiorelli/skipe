import {CardWithPictureWithoutAction} from "../../atoms";
import {Typography} from "@mui/material";
import {Offer} from "../../../typings/Offer";
import {FC} from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useTheme} from '@mui/material/styles';
import {ChatButton, FavoriteButton} from "../../molecules";
import {useNavigate} from "react-router-dom";
import { dateFormat } from "../../../services/FormatterService";

interface OfferCardProps {
    offer: Offer;
}

const OfferCard: FC<OfferCardProps> = ({offer}) => {

    const theme = useTheme();
    const navigate = useNavigate();

    const handleClick = (offer: Offer) => {
        navigate('/offers/form', { state: { offer } });
    }

    const detail = (offer: Offer) => {
        return (
            <Typography component={'div'} style={{display: 'flex', justifyContent: "space-between"}}>
                <Typography variant={'body1'} component={'div'}>
                    <Typography variant={'h5'}>{offer.title}</Typography>
                    <Typography sx={{display: 'flex', gap: '8px'}}><CalendarMonthIcon/>Le {dateFormat(offer.createdAt)}
                    </Typography>
                    <Typography sx={{display: 'flex', gap: '8px'}}><LocationOnIcon/>{offer.cityName}</Typography>
                    <Typography sx={{display: 'flex', gap: '8px'}}><AccountCircleIcon/>{offer.author.name}</Typography>
                </Typography>
                <Typography variant={'body1'} component={'div'} style={{
                    backgroundColor: theme.palette.background.default, borderBottomRightRadius: '8px', padding: '2px 0',
                    display: "flex", justifyContent: "space-between", flexDirection: 'column'
                }}>
                    <FavoriteButton/>
                    <ChatButton/>
                </Typography>
            </Typography>
        )
    }

    return (
        <CardWithPictureWithoutAction
            sx={{backgroundColor: theme.palette.primary.main, padding: '4px', borderRadius: '8px', cursor: 'pointer'}}
            cardSize={{height: 500}} pictureHeight={385} cardContentStyle={{padding: '0'}}
            title={detail(offer)} pictureStyle={{borderRadius: '8px', borderBottomRightRadius: '0'}}
            onClick={() => handleClick(offer)}
        />
    )
}

export default OfferCard;