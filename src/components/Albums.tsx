import useFetch from "../hook/fetch.ts";
import {useSession} from "../contexts/session-context.tsx";
import {useCallback, useEffect, useState} from "react";
import { useNavigate, useSearchParams} from "react-router-dom";

// const UserURL: string = 'https://jsonplaceholder.typicode.com/users'

type Album = {
    id: number,
    title: string
}
const Albums = () => {
    const {session:{user}} = useSession();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchParamAlbumId = searchParams.get('albumId');
    const {
        data: data
    } = useFetch<Album[]>({url: `https://jsonplaceholder.typicode.com/albums?userId=${user?.id}`})
    const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);

    useEffect(() => {
        console.log('re-rendering');
        if (searchParamAlbumId) {
            setSelectedAlbum(Number(searchParamAlbumId));
        }
    }, [searchParamAlbumId]);

    useEffect(() => {

    }, []);

    const goToAlbumDetail = useCallback(() => {
        if (selectedAlbum) {
            console.log(selectedAlbum)
            navigate(`/albums/${selectedAlbum}`);
        } else {
            alert('앨범을 선택해주세요.');
        }
    }, [selectedAlbum]);

    return (
        <>
            <button onClick={goToAlbumDetail}>앨범 상세보기</button>
            <div>
                {
                data ? (
                    <div className="flex">{
                        data.map((item) => (
                                <div key={item.id}
                                     onClick={() => setSelectedAlbum(item.id)}
                                     style={{border: selectedAlbum === item.id ? '2px solid blue' : 'none'}}>
                                    {item.id}. {item.title}
                                </div>
                            )
                        )
                    }
                    </div>
                ) : null
            }</div>
        </>
    );
};

export default Albums;