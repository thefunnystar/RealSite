import { useState, useEffect } from 'react';
// @ts-ignore
import Head from 'next/head';
// @ts-ignore
import axios from 'axios';
// @ts-ignore
import { useRouter } from 'next/router';
// @ts-ignore
import Link from 'next/link';
// @ts-ignore
import Image from "next/image";

interface Listing {
    title: string;
    city: string;
    state: string;
    zipcode: string;
    photo_main: string;
    photo_1?: string;
    photo_2?: string;
    photo_3?: string;
    home_type: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    description: string;
    realtor: number;
    sale_type: string;
    address: string;
}

interface Realtor {
    name: string;
    phone: string;
    email: string;
    description: string;
    photo: string;
}

const ListingDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    const [listing, setListing] = useState<Listing | undefined>(undefined);
    const [realtor, setRealtor] = useState<Realtor | undefined>(undefined);
    const [price, setPrice] = useState<string>('0');

    const numberWithCommas = (x: number) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const res = await axios.get<Listing>(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/listings/${id}`);
                setListing(res.data);
                setPrice(numberWithCommas(res.data.price));
            } catch (err) {
                console.error(err);
            }
        };

        if (id) {
            fetchListing();
        }
    }, [id]);

    useEffect(() => {
        const fetchRealtor = async () => {
            if (!listing) return;
            try {
                const res = await axios.get<Realtor>(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/realtors/${listing.realtor}`);
                setRealtor(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        if (listing?.realtor) {
            fetchRealtor();
        }
    }, [listing?.realtor]);

    const displayInteriorImages = () => {
        let images: JSX.Element[] = [];

        if (listing?.photo_1 || listing?.photo_3) {
            images.push(
                <div key={1} className="row">
                    <div className="col-1-of-3">
                        {listing?.photo_1 ? (
                            <div className="listingdetail__display">
                                <Image
                                    className="listingdetail__display__image"
                                    src={listing.photo_1}
                                    alt=""
                                />
                            </div>
                        ) : null}
                    </div>
                    <div className="col-1-of-3">
                        {listing?.photo_3 ? (
                            <div className="listingdetail__display">
                                <Image
                                    className="listingdetail__display__image"
                                    src={listing.photo_3}
                                    alt=""
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            );
        }

        return images;
    };

    return (
        <div className="listingdetail">
            {listing && realtor ? (
                <>
                    <Head>
                        <title>RealSite - Listing | {listing.title}</title>
                        <meta name="description" content="Listing detail" />
                    </Head>
                    <div className="listingdetail__header">
                        <h1 className="listingdetail__title">{listing.title}</h1>
                        <p className="listingdetail__location">
                            {listing.city}, {listing.state}, {listing.zipcode}
                        </p>
                    </div>
                    <div className="row">
                        <div className="listingdetail__breadcrumb">
                            <Link href="/">Home</Link> / {listing.title}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3-of-4">
                            <div className="listingdetail__display">
                                <Image
                                    className="listingdetail__display__image"
                                    src={listing.photo_main}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="col-1-of-4">
                            <div className="listingdetail__display">
                                <Image
                                    className="listingdetail__display__image"
                                    src={realtor.photo}
                                    alt=""
                                />
                            </div>
                            <h3 className="listingdetail__realtor">{realtor.name}</h3>
                            <p className="listingdetail__contact">{realtor.phone}</p>
                            <p className="listingdetail__contact">{realtor.email}</p>
                            <p className="listingdetail__about">{realtor.description}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1-of-2">
                            <ul className="listingdetail__list">
                                <li className="listingdetail__list__item">
                                    Home Type: {listing.home_type}
                                </li>
                                <li className="listingdetail__list__item">
                                    Price: ${price}
                                </li>
                                <li className="listingdetail__list__item">
                                    Bedrooms: {listing.bedrooms}
                                </li>
                                <li className="listingdetail__list__item">
                                    Bathrooms: {listing.bathrooms}
                                </li>
                                <li className="listingdetail__list__item">
                                    Square Feet: {listing.sqft}
                                </li>
                            </ul>
                        </div>
                        <div className="col-1-of-2">
                            <ul className="listingdetail__list">
                                <li className="listingdetail__list__item">
                                    Sale Type: {listing.sale_type}
                                </li>
                                <li className="listingdetail__list__item">
                                    Address: {listing.address}
                                </li>
                                <li className="listingdetail__list__item">
                                    City: {listing.city}
                                </li>
                                <li className="listingdetail__list__item">
                                    State: {listing.state}
                                </li>
                                <li className="listingdetail__list__item">
                                    Zipcode: {listing.zipcode}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <p className="listingdetail__description">{listing.description}</p>
                    </div>
                    {displayInteriorImages()}
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default ListingDetail;
