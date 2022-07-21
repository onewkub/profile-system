import { AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

type AxiosResponseAwaited<T> = T extends PromiseLike<AxiosResponse<infer U>>
    ? U
    : T;

export enum Status {
    idle,
    loading,
    success,
    error,
}

export const isLoading = (status: Status) => status === Status.loading;

const useApiRequest = <
    F extends (...arg: any) => Promise<AxiosResponse<T> | any>,
    T = AxiosResponseAwaited<ReturnType<F>>,
>(
    serviceAPI: F,
    useToaster: { success: boolean; error: boolean } = {
        success: false,
        error: true,
    },
) => {
    const [response, setResponse] = useState<T>();
    const [status, setStatus] = useState<Status>(Status.idle);
    const [error, setError] = useState<any>();

    const action = useCallback(
        async (...params: Parameters<F>) => {
            try {
                setStatus(Status.loading);
                setError(undefined);
                let result;
                if (useToaster.success) {
                    result = await toast.promise(serviceAPI(...params), {
                        pending: 'Request is pending',
                        success: 'Request resolved 👌',
                        error: 'Request rejected 🤯',
                    });
                } else {
                    result = await toast.promise(serviceAPI(...params), {
                        error: 'Request rejected 🤯',
                    });
                }
                setResponse(result.data);
                setStatus(Status.success);
                return result.data as T;
            } catch (error) {
                setStatus(Status.error);
                setError(error);
                throw error;
            }
        },
        [serviceAPI, useToaster.success],
    );

    return [action, response, status, error, setResponse] as const;
};

export default useApiRequest;
