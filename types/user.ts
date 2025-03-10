interface Affiliation {
  id: string;
  user_id: string;
}

interface Follower {
  id: string;
  noble_id: string;
  first_name: string;
}

export interface UserDetail {
  id: string;
  noble_id: string;
  user_name: string;
  first_name: string;
  middle_name: string;
  second_name: string;
  about_me: string;
  expand_about_me: string;
  avatar: string;
  wallpaper: string;
  city: string;
  country: string;
  gender: number;
  gmail: string | null;
  linkedin: string;
  telegram_username: string | null;
  twitter_username: string | null;
  web_site: string;
  principal: string | null;
  joined_at: string;
  count_followers: number;
  count_following: number;
  count_view: number;
  is_blocked: boolean;
  is_follower: boolean;
  is_following: boolean;
  is_reported: boolean;
  affiliations: Affiliation[];
  followers: Follower[];
  degree: any[];
}
