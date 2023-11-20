export interface userSignupInput {
    user_data: userData;
    raw_password: string;
    org_data: orgData;
}

interface userData {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    role: string;
}
interface orgData {
    organization_name: string;
    status: string;
    industry_id: string;
    website_url: string | undefined;
    address: orgDataAddress;
}
interface orgDataAddress {
    postal_code: number,
    street: string;
    city: string;
    country: string;
}