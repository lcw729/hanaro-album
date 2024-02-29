import {useSession} from "../contexts/session-context.tsx";
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";


const Header = () => {
    const {session: {user}, signOut} = useSession();
    const navigate = useNavigate();

    const logOut = useCallback(() => {
        signOut();
        navigate('');
    }, []);

    return (
        <div className="w-full">
            <nav
                className="w-full px-4 py-2 mx-auto bg-[#a7f3d0] border shadow-md rounded-xl border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
                <div className="container flex items-center justify-between mx-auto text-blue-gray-900">
                    <div
                        className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-gray-900 text-inherit antialiased">
                        Hanaro Album
                    </div>
                    <div className="hidden lg:block">

                    </div>
                    <div className="flex items-center gap-x-1">
                        {
                            user ? (
                                <div>
                                    <div>{user.id} {user.username}님</div>
                                    <button
                                        onClick={logOut}
                                        className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                                        type="button">
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;