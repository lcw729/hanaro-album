import {Outlet} from "react-router-dom";
import {useState} from "react";

const AlbumLayout = () => {
    const [currAlbum, setCurrAlbum] = useState<number | null>(null);

    const setOutletItem = (album: number) => {
        setCurrAlbum(album);
    };

    return (
        <>
            <div>
                <Outlet context={{setOutletItem, item: currAlbum}}/>
            </div>
        </>
    );
};

export default AlbumLayout;