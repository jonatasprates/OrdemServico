import { Telefone } from './Telefone';

export class Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    telefones: Telefone[];
    confirmarSenha: string;
    permissoes: string;
}
