import { useNavigate, useParams} from "react-router-dom";
import useFetch from "../hook/fetch.ts";

const URL: string = 'https://jsonplaceholder.typicode.com/photos?albumId='

type Photo = {
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string,
}
const AlbumDetail = () => {
    const {id: selectedAlbumId} = useParams();
    const navigate = useNavigate();
    const {data, error} = useFetch<Photo[]>({url: `${URL}${selectedAlbumId}`});
    if (error) {
        alert(`에러가 발생했습니다. (${error})`)
    }

    const goBack = () => {
        navigate(`/albums?albumId=${selectedAlbumId}`);
    }

    return (
        <>
            <button onClick={() => goBack()}>뒤로가기</button>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px'}}>
                {
                    data ? (
                        data.map((item) => (
                            <img key={item.id} src={item.thumbnailUrl}/>))
                    ) : null
                }
            </div>
        </>
    );
};

export default AlbumDetail;