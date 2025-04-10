import { useQuery } from "@tanstack/react-query";

const useGetData = (key, queryFn, options = {}) => {
    const { data, isPending, isFetching, isLoading, status, isError, refetch, isSuccess } = useQuery({
        queryKey: key,
        queryFn: queryFn,
        enabled: options.enabled,
        ...options,
    });
    return { data, isPending, status, isError, isLoading, refetch, isSuccess, isFetching };
};

export { useGetData };
