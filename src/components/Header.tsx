import {useSession} from "../contexts/session-context.tsx";
import {useNavigate} from "react-router-dom";


const Header = () => {
    const {session: {user}, signOut} = useSession();
    const navigate = useNavigate();

    const onSignOut = () => {
        console.log('onSignOut');
        signOut();
        navigate('/');
    };

    return (
        <div className="w-full">
            <nav className="w-full bg-green-800 px-10 py-5  top-0">
                <div className="flex flex-row items-center justify-between mx-auto text-blue-gray-900">
                    <div
                        className="py-1.5 font-sans text-3xl text-white font-bold">
                        Hanaro Album
                    </div>

                    {
                        user ? (
                            <div className="flex flex-row justify-center items-center">
                                <div className="font-sans font-bold text-white mr-5">
                                    [ID: {user.id}] {user.username}님
                                </div>
                                <button
                                    onClick={onSignOut}
                                    className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                                    type="button">
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        ) : null
                    }
                </div>
            </nav>
        </div>
    );
};

export default Header;