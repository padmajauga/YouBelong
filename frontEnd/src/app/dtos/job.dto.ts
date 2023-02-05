import { jobStatus } from "../enums/job.enum";


export interface job {
    title: string;
    skillDescription: string;
    pay: any;
    status: string | jobStatus;
    sname: string;
}