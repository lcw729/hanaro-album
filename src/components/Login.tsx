import {FormEvent, useEffect, useRef, useState} from "react";
import {useToggle} from "../hook/toggle.ts";
import {useNavigate} from "react-router-dom";
import {User, useSession} from "../contexts/session-context.tsx";
import {BASE_URL} from "./Albums.tsx";

const Login = () => {
    const [maxUserId] = useState<number>(10);
    const [isUserIdValid, toggle] = useToggle(false);
    const navigate = useNavigate();
    const {session: {user}, login} = useSession();
    const userIdRef = useRef<HTMLInputElement | null>(null);

    // 이미 로그인된 사용자의 경우 /albums로 리다렉트.
    useEffect(() => {
        if (user) {
            alert('이미 로그인하셨습니다.');
            navigate('/albums');
        }
    }, [user, navigate]);

    const signIn = (e: FormEvent) => {
        e.preventDefault();

        if (!userIdRef.current?.value) // ID를 입력하지 않은 경우
            alert("ID를 입력하세요.");
        else if (Number(userIdRef.current.value) <= 0
            || Number(userIdRef.current.value) > maxUserId) { // ID가 1 ~ 10이 아닌 경우
            if (isUserIdValid) toggle(); // ID 범위 안내 문구 생성
        } else {
            if (!isUserIdValid) toggle(); // ID 범위 안내 문구 제거

            (async function () {

                try {
                    console.log('fetch!!!!')
                    const res = await fetch(
                        `${BASE_URL}/users/${userIdRef.current?.value.toString()}`);

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
                <form onSubmit={signIn} className="flex flex-row">
                    <label className="text-lg font-bold">
                        ID:
                        <input type="number" ref={userIdRef} className="border-2 border-gray-300 p-1 rounded mx-5"
                               placeholder="ID를 입력하세요."/>
                    </label>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="submit">Sign In
                    </button>
                </form>
                {isUserIdValid ? null :
                    (<div className="text-lg font-bold py-10">
                        UserID는 1~{maxUserId}번만 가능합니다.
                    </div>)
                }
            </div>
        </>
    );
}

export default Login;