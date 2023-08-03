import { useState } from 'react';
import Head from 'next/head';
import ListingForm from '../components/ListingForm';
import Listings from '../components/Listings';
import Pagination from '../components/Pagination';

const Index: React.FC = () => {
    const [listings, setListings] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [listingsPerPage, setListingsPerPage] = useState<number>(3);

    const indexOfLastListing = currentPage * listingsPerPage;
    const indexOfFirstListing = indexOfLastListing - listingsPerPage;
    const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing);

    const visitPage = (page: number) => {
        setCurrentPage(page);
    };

    const previous_number = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const next_number = () => {
        if (currentPage !== Math.ceil(listings.length / 3)) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <main className="home">
            <Head>
                <title>RealSite - Index</title>
                <meta name="description" content="RealSite Index Page" />
            </Head>
            <section className="home__form">
                <ListingForm setListings={setListings} />
            </section>
            <section className="home__listings">
                <Listings listings={currentListings} />
            </section>
            <section className="home__pagination">
                <div className="row">
                    {listings.length !== 0 ? (
                        <Pagination
                            itemsPerPage={listingsPerPage}
                            count={listings.length}
                            visitPage={visitPage}
                            previous={previous_number}
                            next={next_number}
                            active={currentPage}
                        />
                    ) : null}
                </div>
            </section>
        </main>
    );
};

export default Index;
