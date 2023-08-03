import { ReactNode } from 'react';
import Navbar from '../components/Navbar';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
    <>
        <Navbar />
        {children}
    </>
);

export default Layout;
