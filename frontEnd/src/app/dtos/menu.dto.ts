import { jobStatus } from "../enums/job.enum";
import { job } from "./job.dto";

export interface menu {
    title: string;
    description: string;
    image: any;
    options?: Array<string>;
}

export const menuData:Array<menu> = [
    {title: 'Jobs', description: 'Lists out all the available jobs in your neighbourhood. You can also create a job for someone', image: '../../assets/images/community_main.jpg', options: ['Post a Job', 'Find a Job']},
    {title: 'Find a Pal', description: ' Post a brief description about yourself and if you both like each other, go grab a cup of coffee!', image: '../../assets/images/community_main.jpg', options: ['Create Profile', 'Find a match']},
    {title: 'Donate', description: 'A penny for you, a fortune to others! Reach out to someone for help, or to someone to help them!', image: '../../assets/images/community_main.jpg'},
    {title: 'Event', description: 'What better way to celebrate, than with others? Create and event for others to join, or join one that interests you!', image: '../../assets/images/community_main.jpg'},
]
