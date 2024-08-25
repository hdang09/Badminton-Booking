export type Court = {
    id: number;
    courtCenterId: number;
    courtName: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
    pricePerSlot: number;
    image?: string;
}

export type CourtReq = {
    courtCenterId: number;
    courtName: string;
    pricePerSlot: number;
}

export type CourtFormProps = {
    courtName: string;
    pricePerSlot: number;
}