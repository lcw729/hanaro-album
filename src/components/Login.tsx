import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSession} from "../contexts/session-context.tsx";
import {BASE_URL} from "../constants/api.ts";
import {User} from "../types/models.ts";

const MAX_USER_ID = 10;

const Login = () => {
    // 입력값의 변화를 실시간 감지 및 안내 메시지 출력을 위해 useRef가 아닌 useState 사용
    const [isUserIdValid, setUserIdValid] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>('');
    const {login} = useSession();
    const navigate = useNavigate();

    // 입력값 변경을 처리하는 함수
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setUserId(value);

        // 입력값의 유효성 검사를 실행하고 결과를 상태에 저장
        const isValid = Number(value) > 0 && Number(value) <= MAX_USER_ID;
        setUserIdValid(isValid);
    };

    const onLogIn = (e: FormEvent) => {
        e.preventDefault();

        if (!userId) // ID를 입력하지 않은 경우
            alert("ID를 입력하세요.");
        else {
            (async function () {

                try {
                    const res = await fetch(
                        `${BASE_URL}/users/${userId}`);

                    if (!res.ok) { // 에러 발생
                        alert(`에러가 발생했습니다. ${res.status.toString()}`);
                        return;
                    }

                    const data: User = (await res.json()) as User;
                    login(data); // 로그인
                    navigate(`/albums`);

                } catch (err) {
                    if (err instanceof Error) {
                        alert(`에러가 발생했습니다. (${err})`);
                    }
                }
            })();
        }
    }

    return (
        <>
            <div className="flex flex-col p-10 items-start">
                <form onSubmit={onLogIn} className="flex flex-row items-center">
                    <label className="text-lg font-bold" htmlFor="userId">ID: </label>
                    <input id="userId" type="number" className="border-2 border-gray-300 p-1 rounded mx-5"
                           placeholder="ID를 입력하세요."
                           value={userId}
                           onChange={handleInputChange}/>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            disabled={!isUserIdValid} // 부적합한 userId 입력 시, 버튼 비활성화
                            type="submit">Sign In
                    </button>
                </form>
                {!isUserIdValid &&
                    (<div className="text-lg font-bold py-10">
                            UserID는 1~{MAX_USER_ID}번만 가능합니다.
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default Login;