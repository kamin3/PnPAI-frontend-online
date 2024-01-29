export interface ContactUsInput {
    submitter_name: string;
    submitter_email: string;
    phone: string | undefined;
    industry: string | undefined;
    role: string | undefined;
    company: string | undefined;
    message: string;
}