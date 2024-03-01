import {useEffect, useState} from "react";

export type FetchParams = {
    url: string | URL | globalThis.Request,
    options?: RequestInit,
    dependencies?: unknown[]
}

function useFetch<T>({
                         url,
                         options = {},
                         dependencies = []
                     }: FetchParams) {
    // warning: useToggle을 쓰면, 상태가 제대로 반영되지 않을 수 있다.
    const [isLoading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
            const controller = new AbortController();
            const fetchOptions = {...options, signal: controller.signal};

            (async function () {
                setLoading(true);
                setError('');

                try {
                    const res = await fetch(url, fetchOptions);
                    if (!res.ok) {
                        setError(res.status.toString());
                        return;
                    }

                    const data: T = (await res.json()) as T;
                    setData(data);

                } catch (err) {
                    if (err instanceof Error) {
                        if (err.name !== 'AbortError') setError(err.message);
                    }
                } finally {
                    setLoading(false);
                }
            })();

            return () => controller.abort();
        }, [url, ...dependencies]
    );

    return {isLoading, data, error}
}

export default useFetch;