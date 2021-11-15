interface Gabinete {
  nome: string;
  predio: string;
  sala: string;
  andar: string;
  telefone: string;
  email: string;
}
interface UltimoStatus {
  id: number;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
  idLegislatura: number;
  urlFoto: string;
  email: string;
  nomeEleitoral: string;
  gabinete: Gabinete;
  situacao: string;
  condicaoEleitoral: string;
}

export interface Deputy {
  id: number;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
  idLegislatura: number;
  urlFoto: string;
  email: string;
}

// id: number;
// nomeCivil: string;
// ultimoStatus: UltimoStatus;
// cpf: string;
// sexo: string;
// urlWebsite: string | null;
// redeSocial: string[];
// dataNascimento: string;
// dataFalecimento: string | null;
// ufNascimento: string;
// municipioNascimento: string;
// escolaridade: string;
