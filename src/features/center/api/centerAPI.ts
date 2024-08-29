import * as httpRequest from '@/libs/axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Center, CenterReq } from '../types';

const getListCenter = async (): Promise<Center[]> => {
    const ownerId = localStorage.getItem('ownerId') ?? "2"
    try {
        const response: Center[] = await httpRequest.get(`/center/owner?ownerId=${ownerId}&pageNumber=1&size=1000`);
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getCenter = async (id: string): Promise<Center | null> => {
    if (!id) return null;

    try {
        const response: Center = await httpRequest.get(`/center/${id}`);
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const createCenter = async (data: CenterReq): Promise<Center> => {
    try {
        const response: Center = await httpRequest.post('/center', data);
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const updateCenter = async (data: CenterReq): Promise<Center> => {
    try {
        const response: Center = await httpRequest.put(`/center`, data);
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const useGetListCenter = () => {
    return useQuery({
        queryKey: ['centers'],
        queryFn: () => getListCenter(),
    });
};

export const useGetCenter = (id: string) => {
    return useQuery({
        queryKey: ['center', id],
        queryFn: () => getCenter(id),
        enabled: !!id,
    });
};

export const useCreateCenterMutation = (
    handleFn: {
        onError?: (error: unknown, variables: CenterReq, context: unknown) => void;
        onSuccess?: (data: Center, variables: CenterReq, context: unknown) => void;
        onMutate?: (variables: CenterReq) => Promise<Center>;
    },
    retry?: number,
) => {
    return useMutation({
        mutationFn: createCenter,
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
        retry,
    });
};

export const useUpdateCenterMutation = (
    handleFn: {
        onError?: (error: unknown, variables: CenterReq, context: unknown) => void;
        onSuccess?: (data: Center, variables: CenterReq, context: unknown) => void;
        onMutate?: (variables: CenterReq) => Promise<Center>;
    },
    retry?: number,
) => {
    return useMutation({
        mutationFn: (data: CenterReq) => updateCenter(data),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
        retry,
    });
};