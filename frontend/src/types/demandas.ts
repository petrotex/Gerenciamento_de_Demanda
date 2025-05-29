export interface DemandaProps {
  id: number;
  tipo: string;
  endereco: string;
  ponto_referencia: string;
  image: string;
  prior: string;
  status: string;
  created_at: string;
}

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: DemandaProps[];
}

export interface DemandaCardProps {
  demanda: DemandaProps;
}