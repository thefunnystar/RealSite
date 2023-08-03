import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Card from '../components/Card';
import Pagination from '../components/Pagination';

interface Listing {
    title: string;
    address: string;
    city: string;
    state: string;
    zipcode: number;
    price: number;
    sale_type: string;
    home_type: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    photo_main: string;
    slug: string;
}

interface PaginationProps {
    itemsPerPage: number;
    count: number;
    visitPage: (page: number) => void;
    previous: () => void;
    next: () => void;
    active: number;
    setActive: React.Dispatch<React.SetStateAction<number>>;
}

const Listings = () => {
    const [listings, setListings] = useState<Listing[]>([]);
    const [count, setCount] = useState<number>(0);
    const [previous, setPrevious] = useState<string>('');
    const [next, setNext] = useState<string>('');
    const [active, setActive] = useState<number>(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get<{
                    results: Listing[];
                    count: number;
                    previous: string;
                    next: string;
                }>(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/listings/?page=1`);
                console.log("check this", res.data.results)
                setListings(res.data.results);
                setCount(res.data.count);
                setPrevious(res.data.previous);
                setNext(res.data.next);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    const displayListings = () => {
        const display = listings.map((listing, i) => (
            <Card
                key={i + listing.slug}
                title={listing.title}
                address={listing.address}
                city={listing.city}
                state={listing.state}
                zipcode={listing.zipcode}
                price={listing.price}
                sale_type={listing.sale_type}
                home_type={listing.home_type}
                bedrooms={listing.bedrooms}
                bathrooms={listing.bathrooms}
                sqft={listing.sqft}
                photo_main={listing.photo_main}
                slug={listing.slug}
            />
        ));

        let result: JSX.Element[] = [];

        for (let i = 0; i < display.length; i += 3) {
            result.push(
                <div key={i} className="row">
                    <div className="col-1-of-3">{display[i]}</div>
                    <div className="col-1-of-3">{display[i + 1] ? display[i + 1] : null}</div>
                    <div className="col-1-of-3">{display[i + 2] ? display[i + 2] : null}</div>
                </div>
            );
        }

        return result;
    };


    const visitPage = (page: number) => {
        axios
            .get<{
                results: Listing[];
                previous: string;
                next: string;
            }>(`/api/listings/?page=${page}`)
            .then((res: any) => {
                setListings(res.data.results);
                setPrevious(res.data.previous);
                setNext(res.data.next);
                setActive(page);
            })
            .catch((err: any) => {
                console.error(err);
            });
    };

    const previous_number = () => {
        axios
            .get<{
                results: Listing[];
                previous: string;
                next: string;
            }>(previous)
            .then((res: any) => {
                setListings(res.data.results);
                setPrevious(res.data.previous);
                setNext(res.data.next);
                if (previous) setActive(active - 1);
            })
            .catch((err: any) => {
                console.error(err);
            });
    };

    const next_number = () => {
        axios
            .get<{
                results: Listing[];
                previous: string;
                next: string;
            }>(next)
            .then((res: any) => {
                setListings(res.data.results);
                setPrevious(res.data.previous);
                setNext(res.data.next);
                if (next) setActive(active + 1);
            })
            .catch((err: any) => {
                console.error(err);
            });
    };

    return (
        <main className="listings">
            <Head>
                <title>RealSite - Listings</title>
                <meta name="description" content="Listings page" />
            </Head>
            <section className="listings__listings">{displayListings()}</section>
            <section className="listings__pagination">
                <div className="row">
                    <Pagination
                        itemsPerPage={3}
                        count={count}
                        visitPage={visitPage}
                        previous={previous_number}
                        next={next_number}
                        active={active}
                    />
                </div>
            </section>
        </main>
    );
};

export default Listings;
