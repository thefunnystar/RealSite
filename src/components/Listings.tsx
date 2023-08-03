import CardMain, { CardMainProps } from './CardMain';

type Listing = {
    slug: string;
    title: string;
    address: string;
    city?: string;
    state: string;
    zipcode: number;
    price: number;
    sale_type: string;
    home_type: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    photo_main: string;
};

type ListingsProps = {
    listings: Listing[];
};

const Listings: React.FC<ListingsProps> = ({ listings }) => {
    const getListings = () => {
        let result: JSX.Element[] = [];

        for (let i = 0; i < listings.length; i += 3) {
            result.push(
                <div className='row' key={i}>
                    <div className='col-1-of-3'>
                        <CardMain {...listings[i]} />
                    </div>
                    <div className='col-1-of-3'>
                        {listings[i + 1] ? <CardMain {...listings[i + 1]} /> : null}
                    </div>
                    <div className='col-1-of-3'>
                        {listings[i + 2] ? <CardMain {...listings[i + 2]} /> : null}
                    </div>
                </div>
            );
        }

        return result;
    };

    return (
        <div>
            {getListings()}
        </div>
    );
};

export default Listings;
