import * as httpRequest from '@/libs/axios';
import { useQuery } from '@tanstack/react-query';
import { Booking } from '../types';

const getBooking = async (): Promise<Booking[]> => {
    try {
        const response: Booking[] = await httpRequest.get('/badminton-booking/api/booking');
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const useGetBooking = () => {
    return useQuery({
        queryKey: ['booking'],
        queryFn: () => getBooking(),
        staleTime: Infinity,
    });
};
