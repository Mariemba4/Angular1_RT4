/** Réponse de POST /Users/login (LoopBack) : le champ id est le token. */
export interface LoginResponse {
  id: string;
  ttl: number;
  userId: number;
}
