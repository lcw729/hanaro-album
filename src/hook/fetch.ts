import {useEffect, useState} from "react";
import {useToggle} from "./toggle.ts";

export type FetchParams = {
    url: string | URL | globalThis.Request,
    options?: RequestInit,
    dependencies?: unknown[],
}

function useFetch<T>({
                         url,
                         options = {},
                         dependencies = []
                     }: FetchParams) {
    const [isLoading, setLoading] = useToggle(true);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
            const controller = new AbortController();
            options.signal = controller.signal;

            (async function () {
                console.log(url);
                if (!isLoading) setLoading();
                setError('');

                try {
                    const res = await fetch(url, options);
                    if (!res.ok) {
                        setError(res.status.toString());
                        return;
                    }

                    const data: T = (await res.json()) as T
                    setData(data);

                } catch (err) {
                    if (err instanceof Error) {
                        console.log(err)
                        if (err.name !== 'AbortError') setError(err.message);
                    }
                } finally {
                    if(isLoading) setLoading();
                }
                console.log('******');
            })();

            return () => controller.abort();
        }, [url, ...dependencies]
    );

    return {isLoading, data, error}
}

export default useFetch;