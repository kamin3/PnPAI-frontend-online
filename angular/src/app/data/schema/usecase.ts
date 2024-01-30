export interface UseCase {
    id: string;
    name: string;
    description: string;
    industry_id: string;
    status: UsecaseStatus;
}

export enum UsecaseStatus {
    Active = 'Active',
    Inactive = 'Inactive',
    Comingsoon = 'Comingsoon'
}