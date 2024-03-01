import {createContext, PropsWithChildren, useCallback, useContext, useEffect, useReducer} from "react";
import {User} from "../types/models.ts";

type Session = {
    user: User | null;
}

type SessionContextProps = {
    session: Session
    login: (user: User) => void
    signOut: () => void
}

const DefaultSession: Session = {
    user: null
};


const SessionContext = createContext<SessionContextProps>({
    session: DefaultSession,
    login: () => {},
    signOut: () => {}
});

type Action = {
    type: 'set';
    payload: Session;
} | {
    type: 'login';
    payload: User | null;
} | {
    type: 'signOut';
    payload?: User | null;
}

const SKEY = 'session';
function getStorage() {
    const storedData = localStorage.getItem(SKEY);
    if (storedData) {
        return JSON.parse(storedData) as Session;
    }

    setStorage(DefaultSession);

    return DefaultSession;
}

const setStorage = (session: Session) => {
    localStorage.setItem(SKEY, JSON.stringify(session));
}

const reducer = (state: Session, {type, payload}: Action) => {
    let newer: Session = state;

    switch (type) {
        case 'set':
            newer = {...payload};
            break;
        case 'login':
            if (payload)
                newer = {...state, user: payload};
            break;
        case 'signOut':
            newer = {...state, user: null};
            break;
        default:
            return state;
    }

    setStorage(newer);
    return newer;
};

export const SessionProvider = ({children}: PropsWithChildren) => {
    const [session, dispatch] = useReducer(reducer, getStorage());

    const login = useCallback((user: User) => {
        dispatch({type: 'login', payload: user});
    }, []);

    const signOut = useCallback(() => {
        dispatch({type: 'signOut'});
    }, []);

    useEffect(() => {
        dispatch({type: 'set', payload: getStorage()})
    }, []);

    return (
        <SessionContext.Provider value={{session, login, signOut}}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext<SessionContextProps>(SessionContext);