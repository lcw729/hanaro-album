import useFetch from "../hook/fetch.ts";
import {useSession} from "../contexts/session-context.tsx";
import {useCallback, useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Album, BASE_URL} from "./Home.tsx";

const Albums = () => {
    const {session: {user}} = useSession();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchParamAlbumId = searchParams.get('albumId');
    const {isLoading, data: data, error} = useFetch<Album[]>(
        {
            url: `${BASE_URL}/albums?userId=${user?.id}`});

    // 로그인하지 않은 사용자를 로그인 페이지로 리다렉트.
    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }
    }, [user, navigate]);

    const goToAlbumDetail = useCallback(() => {
        const album = data?.find((item) => {
            return item.id === Number(searchParamAlbumId);
        });

        if (album) {
            navigate(`/albums/${album.id}`,
                {state: {"albumTitle": album.title}});
        } else {
            alert('앨범을 선택해주세요.');
        }
    }, [data, searchParamAlbumId, navigate]);

    // 앨범명 클릭 시, searchParams 변경
    // 새로고침해도 선택된 앨범 유지
    const handlerAlbumClick = useCallback((album: Album) => {
        setSearchParams({"albumId": album.id.toString()});
    }, [setSearchParams]);

    return (
        <>
            <div className="flex flex-row px-10 justify-between">
                <div className="title">앨범 목록</div>
                <button onClick={goToAlbumDetail}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-6 rounded">
                    앨범 상세보기
                </button>
            </div>
            <div className="flex flex-col items-start px-10">
                {
                    isLoading ? (
                        <h5 className="info-text">앨범 목록을 가져오고 있습니다.</h5>
                    ) : (error ? (
                            <h5 className="info-text">에러가 발생했습니다. {error}</h5>
                        ) : ((data && data.length > 0) ? (
                                <div className="flex flex-col text-left font-sans px-10">{
                                    data.map((item) => (
                                        <div key={item.id}
                                             onClick={() => handlerAlbumClick(item)}
                                             className={((searchParamAlbumId && (searchParamAlbumId === item.id.toString()))) ?
                                                 "bg-amber-100 p-4 font-bold rounded"
                                                 : "bg-white p-2"
                                             }>
                                            {item.id}. {item.title}
                                        </div>
                                    ))
                                }</div>
                            ) : null
                        )
                    )
                }
            </div>
        </>
    );
};

export default Albums;