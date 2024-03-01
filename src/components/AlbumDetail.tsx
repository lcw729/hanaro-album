import {useLocation, useNavigate, useParams} from "react-router-dom";
import useFetch from "../hook/fetch.ts";
import {useEffect, useState} from "react";
import {BASE_URL} from "../constants/api.ts";

type Photo = {
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string,
}

/*
// 앨범 상세 타입 추가 (예시)
type AlbumDetailType = {
    id: number,
    title: string,
    photos: Photo[],
};
 */

const AlbumDetail = () => {
        const navigate = useNavigate();
        const {id: selectedAlbumId} = useParams();
        const {isLoading, data, error} = useFetch<Photo[]>({url: `${BASE_URL}/photos?albumId=${selectedAlbumId}`});
        const [selectedPhoto, setPhotoId] = useState<Photo | undefined>();
        // const { isLoading: isAlbumLoading, data: albumDetail } = useFetch<AlbumDetailType>({ url: `${BASE_URL}/albums/${selectedAlbumId}` });

        /*
           사용자가 직접적으로 /albums/:id URL로 접근하는 경우, 앨범 Title을 가져오는 방법
           1) API를 보내 앨범 정보를 가져온다.
              + 페이지 독립성 증가
              + 직접 접근 용이
              - 네트워크 비용 증가
           2) 앨범 목록 페이지에서 navigate state로 전달한다.
              + 즉시 데이터 사용 가능
              + 네트워크 비용 감소
              - 직접 접근 시 문제 발생 가능
                -> 앨범 목록 페이지로 리다이렉트해서 선택하도록 해야함.
           3) useParams, searchParams 사용한다.
              - 앨범 제목의 길이를 가늠하기 어렵다.

           => 제시된 레이아웃에 기반하여 구현하기 위해 2번 방법 사용
           => 사용자가 앨범 ID만으로 직접 접근하는 것을 보안적 측면에서 방지
        */

        const location = useLocation();
        const albumTitle = location.state?.albumTitle || null;

        // 앨범 상세 페이지로 직접 접근 시도 시, 앨범 목록 페이지로 리다이렉트
        useEffect(() => {
            if (!albumTitle) {
                console.log(albumTitle);
                navigate("/albums");
            }
        }, [navigate]);


        return (
            <>
                <div className="flex flex-row px-10 justify-between">
                    {/*<div className="title">앨범: { isAlbumLoading ? 'Loading...' : albumDetail?.title || ''}</div>*/}
                    <div className="title">앨범: {albumTitle || ''}</div>
                    <button onClick={() => {
                        navigate(`/albums?albumId=${selectedAlbumId}`);
                    }}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-6 rounded">
                        뒤로가기
                    </button>
                </div>
                <div className="flex flex-row justify-start items-center rounded bg-amber-100 mx-10 p-10">
                    <div className="text-lg font-bold px-2">이미지 제목:</div>
                    {
                        selectedPhoto?.title ? (
                            <h5 className="text-lg font-bold">{selectedPhoto?.title} </h5>
                        ) : <h5 className="text-lg font-bold text-blue-700">이미지를 선택하세요. </h5>
                    }
                </div>
                {
                    isLoading ? (
                        <h5 className="info-text">앨범 이미지를 가져오고 있습니다.</h5>
                    ) : (error ? (
                            <h5 className="info-text">에러가 발생했습니다. {error}</h5>
                        ) : (
                            <div className="grid grid-cols-3 place-items-center h-screen"> {
                                (data && data.length > 0) ? (
                                    data.map((item) => (
                                        <img className="max-w-fit p-5 items-center"
                                             onClick={() => setPhotoId(item)}
                                             alt={item.title}
                                             key={item.id}
                                             src={item.thumbnailUrl}/>))
                                ) : null
                            }</div>
                        )
                    )
                }
            </>
        );
    }
;

export default AlbumDetail;