export interface House {
  id: string;
  landlord?: string;
  leaseTerm?: string;
  type?: string;
  houseType?: string;
  price?: number;
  location?: string;
  deposit?: number;
  area?: number;
  floor?: number;
  description?: string;
  tag?: string;
  imageUrls?: string[];
  mp4sUrls?: string[];
}
