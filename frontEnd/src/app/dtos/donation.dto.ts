import { donationStatus } from "../enums/donation.enum";

export interface donation {
    title: string;
    description: string;
    status: string | donationStatus;
    dname: string;
}