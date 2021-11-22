export interface Propositions {
  id: number;
  siglaTipo: string;
  numero: number;
  ano: number;
  ementa: string;
}

export interface Proposition extends Propositions {
  dataApresentacao: string;
  statusProposicao: {
    descricaoSituacao: string | null;
    url: string;
  };
  descricaoTipo: string;
  ementaDetalhada: string | null;
}
