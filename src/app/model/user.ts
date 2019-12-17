import { Addr } from './addr';

export interface User {
    id?: number;
    name?: string;
    age?: number;
    gender?: string;
    addr?: Addr;
}
