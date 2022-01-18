import { UsuarioModel } from "../usuario.model";

export class UsuarioMock {
    public usuario: UsuarioModel = {
        uid: '12345678',
        email: 'gabestylik@gmail.com',
        nome: 'Gabriel Coelho',
        cpf: '12345678900',
        telefone: 11922334455,
        endereco: 'Rua Jõao Zinho',
        complemento: 'Apt. 123',
        cidade: 'Campinas',
        estado: 'São Paulo',
        pais: 'Brasil',
        cep: '11222333'
    }
}
