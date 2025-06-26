export type MotivoOcorrencia =
  | 'Escada rolante/elevador inoperante'
  | 'Trem com defeito'
  | 'Atraso na linha'
  | 'Outro problema';

export type EstacaoCPTM =
  | 'Q'
  | 'Luz'
  | 'Brás'
  | 'Barra Funda'
  | 'Tatuapé'
  | 'Santo Amaro'
  | 'Jabaquara'
  | string;

export interface OcorrenciaFormData {
  motivo?: MotivoOcorrencia;
  estacao?: EstacaoCPTM;
  fotoUri?: string;
  linha?: string;
}