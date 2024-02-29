import useFetch from "../hook/fetch.ts";
import {useSession} from "../contexts/session-context.tsx";
import {useCallback} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

export const BASE_URL: string = 'https://jsonplaceholder.typicode.com'

type Album = {
    id: number,
    title: string
}
const Albums = () => {
    const {session: {user}} = useSession();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchParamAlbumId = searchParams.get('albumId');
    const {
        isLoading,
        data: data
    } = useFetch<Album[]>({url: `${BASE_URL}/albums?userId=${user?.id}`})

    const goToAlbumDetail = useCallback(() => {
        const album = data?.find((item) => {
            return item.id === Number(searchParamAlbumId);
        });

        if (album) {
            navigate(`/albums/${album.id}`,
                {state: {albumTitle: album.title}});
        } else {
            alert('앨범을 선택해주세요.');
        }
    }, [data, searchParamAlbumId]);

    // 앨범명 클릭 시, searchParams 변경
    // 새로고침해도 선택된 앨범 유지
    const handlerAlbumClick = useCallback((albumId: string) => {
        setSearchParams({"albumId": albumId});
    }, [setSearchParams]);

    return (
        <>
            <div className="flex flex-row px-10 justify-between">
                <div className="text-3xl font-bold py-10">앨범 목록</div>
                <button onClick={() => goToAlbumDetail()}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-6 rounded">
                    앨범 상세보기
                </button>
            </div>
            {
                ((!isLoading) && data) ?
                    (
                        <div className="flex flex-col text-left font-sans px-10">{
                            data.map((item) => (
                                    <div key={item.id}
                                         onClick={() => handlerAlbumClick(item.id.toString())}
                                         className={((searchParamAlbumId && (searchParamAlbumId === item.id.toString()))) ?
                                             "bg-amber-100 p-4 font-bold rounded"
                                             : "bg-white p-2"
                                         }>
                                        {item.id}. {item.title}
                                    </div>
                                )
                            )
                        }
                        </div>
                    ) : (
                        <div className="text-lg font-bold py-10">
                            앨범 목록을 가져오고 있습니다.
                        </div>
                    )
            }
        </>
    );
};

export default Albums;