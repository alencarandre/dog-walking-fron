import { Dog } from './dog.model';

export class DogWalking {
  id: number;
  status: string;
  latitude: number;
  longitude: number;
  duration: number;
  price: number;
  final_price: number;
  scheduled_at: Date;
  started_at: Date;
  finished_at: Date;
  pets: Dog[];
}
