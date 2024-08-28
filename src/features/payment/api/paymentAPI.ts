import * as httpRequest from '@/libs/axios';
import { useQuery } from '@tanstack/react-query';
import { Payment } from '../types';

const getPayment = async (): Promise<Payment[]> => {
    try {
        const response: Payment[] = await httpRequest.get('/badminton-booking/api/payment');
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const useGetPayment = () => {
    return useQuery({
        queryKey: ['booking'],
        queryFn: () => getPayment(),
        staleTime: Infinity,
    });
};
