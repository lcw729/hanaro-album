import {useLocation, useNavigate, useParams} from "react-router-dom";
import useFetch from "../hook/fetch.ts";
import {BASE_URL} from "./Albums.tsx";
import {useEffect} from "react";

type Photo = {
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string,
}
const AlbumDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const albumTitle = location.state?.albumTitle || null;
    const {id: selectedAlbumId} = useParams();
    const {isLoading, data, error} = useFetch<Photo[]>({url: `${BASE_URL}/photos?albumId=${selectedAlbumId}`});

    // 앨범 상세 페이지로 직접 접근 시도 시, 앨범 목록 페이지로 리다이렉트
    useEffect(() => {
        if (!location.state?.albumTitle) {
            navigate("/albums");
        }
    }, [navigate, location.state]);

    if (error) {
        alert(`에러가 발생했습니다. (${error})`)
    }

    const goBack = () => {
        navigate(`/albums?albumId=${selectedAlbumId}`);
    }

    return (
        <>
            <div className="flex flex-row px-10 justify-between">
                <div className="text-3xl font-bold py-10">앨범: {albumTitle}</div>
                <button onClick={() => goBack()}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-6 rounded">
                    뒤로가기
                </button>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px'}}>
                {
                    isLoading ? (
                        <h5>앨범 이미지를 가져오고 있습니다.</h5>
                    ) : (error ? (
                            <h5>에러가 발생했습니다. {error}</h5>
                        ) : (
                            (data && data.length > 0) ? (
                                data.map((item) => (
                                    <img alt={item.title} key={item.id} src={item.thumbnailUrl}/>))
                            ) : (<h5>이미지가 없습니다.</h5>)

                        )
                    )
                }
            </div>
        </>
    );
};

export default AlbumDetail;