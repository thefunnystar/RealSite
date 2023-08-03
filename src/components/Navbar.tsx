import Link from 'next/link';

const Navbar: React.FC = () => {

    return (
        <>
            <nav className='navbar'>
                <div className='navbar__left'>
                    <div className='navbar__l'>
                        <li className='navbar__left__item'>
                        </li>
                        <li className='navbar__left__item'>
                            <Link href='/listings' className={`navbar__left__item__link`}>
                                Listings
                            </Link>
                        </li>
                    </div>
                    <div className='navbar__center'>
                        <Link href='/'>RealSite</Link>
                    </div>
                    <div className='navbar__right__auth'>
                        <Link href={`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/admin/`} className='navbar__right__auth__link'>
                            Login
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
