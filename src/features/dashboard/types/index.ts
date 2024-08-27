import { Center } from "@/features/center/types";

export type Report = {
    title: string;
    total: number;
    isIncrease: boolean;
    percentage: number;
};

export type Chart = {
    labels: string[];
    data: number[];
};

export type Dashboard = {
    reports: Report[];
    top5Centers: Center[];
    countCourtByCenter: Chart;
}