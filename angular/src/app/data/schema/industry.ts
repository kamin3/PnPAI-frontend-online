import { UseCase } from "@schema/usecase";

export interface Industry {
    id: string;
    name: string;
    usecases: UseCase[];
}
