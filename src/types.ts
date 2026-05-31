export interface UserProfile {
  username: string;
  rank: string;
  balance: number;
  avatarUrl: string;
}

export interface ScriptItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Battle Royale' | 'Clash Squad' | 'Rank Mode';
  tag: string;
  status: 'Undetected' | 'Updating' | 'Active' | 'Best Value';
  statusColor: 'tertiary' | 'yellow' | 'green' | 'red';
  rating: number;
  downloads: string;
  image: string;
}

export interface ActivityLog {
  id: string;
  user: string;
  avatarUrl: string;
  action: string;
  timeLabel: string;
  statusType: 'primary' | 'tertiary';
}

export interface UpdateLog {
  id: string;
  time: string;
  scriptName: string;
  version: string;
  status: 'Stable' | 'Patching';
}

export interface TransactionHistory {
  id: string;
  type: 'deposit' | 'purchase';
  description: string;
  amount: number;
  date: string;
  status: 'success' | 'pending';
}
