import Header from "./Header.tsx";
import {Outlet} from "react-router-dom";

export const BASE_URL: string = 'https://jsonplaceholder.typicode.com'
export type Album = {
    id: number;
    title: string;
}

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