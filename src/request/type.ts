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
  mp4DownloadUrls?: string[];
  imageDownloadUrls?: string[];
  images?: string[];
  mp4s?: string[];
  imagesMap?: Map<string, string>;
  mp4sMap?: Map<string, string>;
}
