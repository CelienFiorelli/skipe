export type Category = {
    id: number;
    label: string;
}

export type OfferFormCreate = {
    title: string;
    description: string;
    is_visible: boolean;
    is_donation: boolean;
    city_name: string;
    longitude: number;
    latitude: number;
    userId?: number;
}

export type Offer = {
    author : {
        id : number;
        name : string;
    }
    cityName : string;
    createdAt : string;
    description : string;
    id : number;
    isDonation : boolean;
    isUpdated : boolean;
    latitude : number;
    longitude : number;
    title : string
}