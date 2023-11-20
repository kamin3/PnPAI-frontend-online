import { digocFunctionsResponse } from "@schema/digocFunctionsResponse";

export interface userSigninResponse extends digocFunctionsResponse<string> {
    jwt_token: string;
}