import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';

export interface CardMainProps {
    title: string;
    photo_main: string;
    address: string;
    city?: string;
    state: string;
    zipcode: number;
    price: number;
    bedrooms: number;
    bathrooms: number;
    sale_type: string;
    home_type: string;
    sqft: number;
    slug: string;
}

const numberWithCommas = (x: number): string => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const CardMain: React.FC<CardMainProps> = ({
                                               title,
                                               photo_main,
                                               address,
                                               city,
                                               state,
                                               zipcode,
                                               price,
                                               bedrooms,
                                               bathrooms,
                                               sale_type,
                                               home_type,
                                               sqft,
                                               slug,
                                           }) => {
    console.log('check', slug);

    return (
        <div className='card' key={slug}>
            <h3 className='card__title'>{title}</h3>
            <div className='card__header'>
                <Image
                    className='card__header__photo'
                    src={`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}${photo_main}`}
                    width={200}
                    height={200}
                    alt='House'
                />
            </div>
            <p className='card__location'>
                {address}, {city === undefined ? '' : city}, {state}, {zipcode}
            </p>
            <div className='row'>
                <div className='col-2-of-3'>
                    <p className='card__info'>Price: ${numberWithCommas(price)}</p>
                    <p className='card__info'>Bedrooms: {bedrooms}</p>
                    <p className='card__info'>Bathrooms: {bathrooms}</p>
                </div>
                <div className='col-1-of-3'>
                    <p className='card__saletype'>{sale_type}</p>
                    <p className='card__hometype'>{home_type}</p>
                    <p className='card__sqft'>Sqft: {sqft}</p>
                </div>
            </div>
            <Link href={`/listings/${slug}`} className='card__link'>
                View Listing
            </Link>
        </div>
    );
};

CardMain.propTypes = {
    title: PropTypes.string.isRequired,
    photo_main: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string,
    state: PropTypes.string.isRequired,
    zipcode: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    sale_type: PropTypes.string.isRequired,
    home_type: PropTypes.string.isRequired,
    sqft: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
};

export default CardMain;
