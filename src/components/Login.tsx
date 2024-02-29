import {FormEvent, useRef, useState} from "react";
import {useToggle} from "../hook/toggle.ts";
import {useNavigate} from "react-router-dom";
import {User, useSession} from "../contexts/session-context.tsx";

const UserURL: string = 'https://jsonplaceholder.typicode.com/users'
const Login = () => {
    const [maxUserId] = useState<number>(10);
    const [isUserIdValid, toggle] = useToggle(false);
    const navigate = useNavigate();
    const {session:{user},login} = useSession();
    const userIdRef = useRef<HTMLInputElement | null>(null);

    console.log(user);
    const signIn = (e: FormEvent) => {
        e.preventDefault();

        if (!userIdRef.current?.value) // 입력하지 않은 경우
            alert("ID를 입력하세요.");
        else if (Number(userIdRef.current.value) <= 0 || Number(userIdRef.current.value) > maxUserId) { // 1 ~ 10이 아닌 경우
            if (isUserIdValid) toggle(); // 안내 문구 생성
        } else {
            if (!isUserIdValid) toggle(); // 안내 문구 제거

            (async function () {

                try {
                    console.log('fetch!!!!')
                    const res = await fetch(
                        `${UserURL}/${userIdRef.current?.value.toString()}`);

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
            <div onSubmit={signIn}>
                <form>
                    <input type="number" ref={userIdRef}/>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            type="submit">Sign In
                    </button>
                </form>
            </div>
            <div>
                {isUserIdValid ? null : (<h5>UserID는 1~{maxUserId}번만 가능합니다.</h5>)}
            </div>
        </>
    );
}

export default Login;