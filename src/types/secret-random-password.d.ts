declare module "secure-random-password" {
  export const lower: string;
  export const upper: string;
  export const digits: string;
  export const symbols: string;

  interface RandomPasswordOptions {
    length: number;
    characters: string[];
  }

  export function randomPassword(options: RandomPasswordOptions): string;
}