import {AxiosResponse} from "axios";
import {FC, useEffect, useState} from "react";
import axiosService from "../../../services/AxiosService";
import {Offer} from "../../../typings/Offer";
import {OfferCard} from "../../organisms";
import {Typography} from "../../atoms";
import {useTheme} from "@mui/material/styles";
import {CreateOfferButton} from "../../molecules";
import {useAuth} from "../../../contexts/AuthContext";

const Offers: FC = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const theme = useTheme();
    const { isConnected } = useAuth();

    const handleOffers = async () => {
        setLoading(true);

        try {
            const response: AxiosResponse = await axiosService.get("offers");
            setOffers(response.data.offers);
            setError(null);
        } catch (err) {
            setError("Une erreur s'est produite lors du chargement des offres.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Appeler handleOffers une fois au montage du composant
    useEffect(() => {
        handleOffers();
    }, []);

    return (
        <Typography component={'div'}>

            <Typography component={'div'} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
                color={theme.palette.primary.main}>
                <h1>Listing des offres</h1>
                {isConnected() && <CreateOfferButton/>}
            </Typography>

            {loading && <p style={{color: "white"}}>Chargement des offres...</p>}
            {error && <p style={{color: "red"}}>{error}</p>}

            {
                !loading && !error &&
                <Typography component={'div'} sx={{display: 'flex', flexWrap: 'wrap', gap: '4.5em', justifyContent: 'center'}}>
                    {offers.map((offer) => (
                        <OfferCard offer={offer} key={offer.id}/>
                    ))}
                </Typography>
            }
        </Typography>
    );
};

export default Offers;
