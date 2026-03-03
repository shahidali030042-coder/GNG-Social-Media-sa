export interface User {
  id: number;
  email: string;
  points: number;
  referral_code: string;
  created_at: string;
}

export interface Ad {
  id: number;
  user_id: number;
  campaign_name: string;
  budget_type: 'daily' | 'lifetime';
  budget_amount: number;
  target_audience: string;
  image_url: string;
  title: string;
  description: string;
  cta_text: string;
  duration_days: number;
  status: 'active' | 'paused' | 'deleted';
  created_at: string;
}

export interface AdminStats {
  totalUsers: number;
  totalAds: number;
  totalPoints: number;
}
