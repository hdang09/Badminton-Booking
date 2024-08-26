import { Court } from "@/features/court/types";

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
    top5Courts: Court[];
    countCourtByCenter: Chart;
}