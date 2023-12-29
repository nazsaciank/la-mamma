import { useState } from "react";

export function useLoading(initialLoading: boolean = false) {
    const [loading, setLoading] = useState(initialLoading);

    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    return { loading, startLoading, stopLoading };
}
