import Header from "./Header.tsx";
import {Outlet} from "react-router-dom";

const Home = () => {

    return (
        <>
            <div>
                <Header/>
                <Outlet/>
            </div>
        </>
    );
};

export default Home;