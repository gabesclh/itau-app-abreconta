import { EnderecoModel } from "./endereco.model";
import { ContaModel } from "./conta.model";

export class UsuarioModel {
    uid: string;
    email: string;
    nome: string;
    cpf: string;
    telefone: number;
    endereco: EnderecoModel;
    conta?: ContaModel;
}
