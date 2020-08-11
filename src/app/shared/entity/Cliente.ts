import { Telefone } from './Telefone';
import { Endereco } from './Endereco';

export class Cliente {
    id: number;
    tipoCliente: number;
    nome: string;
    rg: string;
    razaoSocial: string;
    cnpj: string;
    telefones: Telefone[];
    email: string;
    endereco: Endereco;
}
