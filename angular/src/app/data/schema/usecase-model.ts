export interface UseCaseModel {
    id: number;
    name: string;
    useCase: string;
    industry: string;
    lastTrainedDate: Date;
    status: UseCaseModelState;
    dataSource: string;
    dataSourceImage: string;
    industryIcon: string;
}


export enum UseCaseModelState {
    Enabled = 0,
    Disabled = 1,
    OnTraining = 2,
    Failed = 3
}