import * as httpRequest from '@/libs/axios';
import { useQuery } from '@tanstack/react-query';
import { Event } from '../types';

const getBooking = async (): Promise<Event[]> => {
    try {
        const response: Event[] = await httpRequest.get('/badminton-booking/api/booking');
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
