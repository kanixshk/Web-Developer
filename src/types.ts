export interface Initiative {
  id: string;
  title: string;
  category: 'HEALTHCARE' | 'EDUCATION' | 'ENVIRONMENT' | 'DEVELOPMENT' | 'ANIMALS' | 'EMPOWERMENT';
  tag: string;
  description: string;
  detailedDescription: string;
  iconName: string;
  objectives: string[];
  metrics: { label: string; value: string }[];
  targetGoal: number;
  raisedFunds: number;
  volunteersCount: number;
  updates: { date: string; title: string; content: string }[];
}

export interface VolunteerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  initiativeId: string;
  initiativeTitle: string;
  skills: string;
  availability: 'weekdays' | 'weekends' | 'flexible';
  status: 'Pending Review' | 'Approved' | 'Active';
  registeredAt: string;
  loggedHours: { date: string; hours: number; activity: string }[];
}

export interface DonationRecord {
  id: string;
  name: string;
  email: string;
  amount: number;
  initiativeId: string;
  initiativeTitle: string;
  date: string;
  paymentType: 'card' | 'upi' | 'paypal';
  isAnonymous: boolean;
}

export interface WallNote {
  id: string;
  name: string;
  message: string;
  colorIndex: number;
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  feedback: string;
  stars: number;
  imageUrl: string;
}
