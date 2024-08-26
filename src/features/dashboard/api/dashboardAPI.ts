import * as httpRequest from '@/libs/axios';
import { useQuery } from '@tanstack/react-query';
import { Dashboard } from '../types';

const getDashboard = async (): Promise<Dashboard> => {
    try {
        const response: Dashboard = await httpRequest.get('/badminton-booking/api/dashboard');
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const useGetDashboard = () => {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: () => getDashboard(),
        staleTime: Infinity,
    });
};
