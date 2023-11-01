import { Pessoa } from "./pessoa";

export class Contato {
  id:number;
  nome: string;
  email: string;
  telefone: string;
  pessoa?: Pessoa;
}
