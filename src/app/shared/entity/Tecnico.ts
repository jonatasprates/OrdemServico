import { Telefone } from './Telefone';
import { Status } from '../enum/Status';

export class Tecnico {
    id: number;
    nome: string;
    email: string;
    status: Status;
    telefones: Telefone[];
}
