import './Layout.css';
import { Container } from "@mui/material";
import Navbar from "../../organisms/Header/Header";
import Footer from "../../organisms/Footer/Footer";
import { Outlet } from "react-router-dom";
import { FC } from "react";

const Layout: FC = () => {
    return (
        <>
            <Navbar />
                <Container>
                    <div className="main-content">
                        <Outlet />
                    </div>
                </Container>
            <Footer />
        </>
    )
}

export default Layout;
