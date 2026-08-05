import type { ApiTour, ApiVisaCountry } from '../services/api';

export type TourPackage = ApiTour;
export type VisaRequirement = ApiVisaCountry;
export type DepartureCity = 'Lahore' | 'Islamabad' | 'Faisalabad' | 'Multan';
export type PackageTier = 'Economy' | 'Star';

export const CATEGORIES = ['All', 'Northern Pakistan', 'International', 'Umrah', 'Customized'];

