export type Timeslots = {
    id: number;
    startTime: string;
    endTime: string
}

export type Center = {
    id: number;
    courtOwnerId: number;
    courtCenterName: string;
    address: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: number;
    province: string;
    district: string;
    ward: string;
    latitude: string;
    longtitude: string;
    image?: string;
    timeslots: Timeslots[]
}

export type CenterReq = {
    id?: number;
    courtOwnerId?: number;
    courtCenterName?: string;
    address: string;
    province: string;
    district: string;
    ward: string;
    latitude: string;
    longtitude: string;
    image?: string;
}

export type CenterFormProps = {
    courtCenterName: string;
    address: string;
    province: string;
    district: string;
    ward: string;
    latitude: string;
    longtitude: string;
}

