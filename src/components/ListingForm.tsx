import React, { useState } from 'react';
import axios from 'axios';

interface ListingFormProps {
    setListings: (listings: any[]) => void;
}

const ListingForm: React.FC<ListingFormProps> = ({ setListings }) => {
    const [formData, setFormData] = useState({
        sale_type: 'For Sale',
        price: '$0+',
        maximum_price: 'Any',
        home_type: 'House',
        bedrooms: '0+',
        bathrooms: '0+',
        sqft: '1000+',
        open_house: false,
    });

    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.checked });
    };

    const { sale_type, price, maximum_price, home_type, bedrooms, bathrooms, sqft, open_house } = formData;

    const [loading, setLoading] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        setLoading(true);

        axios
            .post(
                `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/listings/search`,
                { sale_type, price, home_type, bedrooms, bathrooms, sqft, open_house },
                config
            )
            .then((res: any) => {
                setLoading(false);
                console.log(res.data);
                setListings(res.data);
                window.scrollTo(0, 0);
            })
            .catch((err: any) => {
                console.log(err);
                setLoading(false);
                window.scrollTo(0, 0);
            });
    };

    return (
        <form className='listingform' onSubmit={onSubmit}>
            <div className='row'>
                <div className='col-1-of-5'>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='sale_type'>Sale or Rent</label>
                        <select className='listingform__select' name='sale_type' onChange={onChange} value={sale_type}>
                            <option>For Sale</option>
                            <option>For Rent</option>
                        </select>
                    </div>
                </div>

                <div className='col-1-of-5'>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='price'>Minimum Price</label>
                        <select className='listingform__select' name='price' onChange={e => onChange(e)} value={price}>
                            <option>$0+</option>
                            <option>$200,000+</option>
                            <option>$300,000+</option>
                            <option>$500,000+</option>
                            <option>$1,000,000+</option>
                            <option>$1,500,000+</option>
                            <option>Any</option>
                        </select>
                    </div>
                </div>

                <div className='col-1-of-5'>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='maximum_price'>Maximum Price</label>
                        <select className='listingform__select' name='maximum_price' onChange={e => onChange(e)} value={maximum_price}>
                            <option>Any</option>
                            <option>$1,500,000+</option>
                            <option>$1,000,000+</option>
                            <option>$500,000+</option>
                            <option>$300,000+</option>
                            <option>$200,000+</option>
                            <option>$0+</option>
                        </select>
                    </div>
                </div>

                <div className='col-1-of-5'>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='home_type'>Home Type</label>
                        <select className='listingform__select' name='home_type' onChange={e => onChange(e)} value={home_type}>
                            <option>House</option>
                            <option>Condo</option>
                            <option>Townhouse</option>
                        </select>
                    </div>
                </div>

                <div className='col-1-of-5'>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='bedrooms'>Bedrooms</label>
                        <select className='listingform__select' name='bedrooms' onChange={e => onChange(e)} value={bedrooms}>
                            <option>0+</option>
                            <option>1+</option>
                            <option>2+</option>
                            <option>3+</option>
                            <option>4+</option>
                            <option>5+</option>
                        </select>
                    </div>
                </div>

                <div className='col-1-of-5'>
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='bathrooms'>Baths</label>
                        <select className='listingform__select' name='bathrooms' onChange={e => onChange(e)} value={bathrooms}>
                            <option>0+</option>
                            <option>1+</option>
                            <option>2+</option>
                            <option>3+</option>
                            <option>4+</option>
                        </select>
                    </div>
                </div>

                <div className="col-1-of-5">
                    <div className='listingform__section'>
                        <label className='listingform__label' htmlFor='sqft'>Sqft</label>
                        <select className='listingform__select' name='sqft' onChange={e => onChange(e)} value={sqft}>
                            <option>1000+</option>
                            <option>1200+</option>
                            <option>1500+</option>
                            <option>2000+</option>
                            <option>Any</option>
                        </select>
                    </div>
                </div>

                <div className="col-1-of-5">
                    <div className='listingform__altsection'>
                        <label className='listingform__label' htmlFor='open_house'>Open Houses</label>
                        <input
                            className='listingform__checkbox'
                            name='open_house'
                            type='checkbox'
                            onChange={onCheckboxChange}
                            checked={open_house}
                        />
                    </div>
                </div>
                <div className='fixable-element'>
                    {loading ? (
                        <div className='listingform__loader'>
                            {/*<Loader
                type="Oval"
                color="#424242"
                height={50}
                width={50}
              />*/}
                            Loading...
                        </div>
                    ) : (
                        <button className='listingform__button listingform__button--primary'>Filter</button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default ListingForm;
