import * as httpRequest from '@/libs/axios';
import { useQuery } from '@tanstack/react-query';
import { Event } from '../types';

const getBooking = async (courtId: string): Promise<Event[]> => {
    try {
        const response: Event[] = await httpRequest.get(`/booking?courtId=${courtId}`);
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const useGetBooking = (courtId: string) => {
    return useQuery({
        queryKey: ['booking', courtId],
        queryFn: () => getBooking(courtId),
    });
};
