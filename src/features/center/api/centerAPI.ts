import * as httpRequest from '@/libs/axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Center, CenterReq } from '../types';

const getListCenter = async (): Promise<Center[]> => {
    try {
        const response: Center[] = await httpRequest.get('/badminton-booking/api/center/owner');
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getCenter = async (id: string): Promise<Center | null> => {
    if (!id) return null;

    try {
        const response: Center = await httpRequest.get(`/badminton-booking/api/center/${id}`);
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const createCenter = async (data: CenterReq): Promise<Center> => {
    try {
        const response: Center = await httpRequest.post('/badminton-booking/api/center', data);
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const updateCenter = async (id: number, data: CenterReq): Promise<Center> => {
    try {
        const response: Center = await httpRequest.put(`/badminton-booking/api/center/${id}`, data);
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const useGetListCategory = () => {
    return useQuery({
        queryKey: ['centers'],
        queryFn: () => getListCenter(),
        staleTime: Infinity,
    });
};

export const useGetCenter = (id: string) => {
    return useQuery({
        queryKey: ['center', id],
        queryFn: () => getCenter(id),
        staleTime: Infinity,
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
        onError?: (error: unknown, variables: { id: number; data: CenterReq }, context: unknown) => void;
        onSuccess?: (data: Center, variables: { id: number; data: CenterReq }, context: unknown) => void;
        onMutate?: (variables: { id: number; data: CenterReq }) => Promise<Center>;
    },
    retry?: number,
) => {
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: CenterReq }) => updateCenter(id, data),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
        retry,
    });
};