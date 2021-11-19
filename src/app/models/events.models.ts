export interface Events {
  id: number;
  dataHoraInicio: string;
  dataHoraFim: string;
  descricaoTipo: string;
  descricao: string;
  situacao: string;
  localCamara: {
    nome: string;
  };
}
