export interface UnsplashImage {
  id: string;
  created_at: Date;
  updated_at: Date;
  promoted_at: Date;
  width: number;
  height: number;
  color: Color;
  blur_hash: string;
  description: null;
  alt_description: string;
  urls: UnsplashImageUrls;
  links: UnsplashImageLinks;
  categories: UnsplashCategory[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: UnsplashCollection[];
  sponsorship: any;
  topic_submissions: any;
  user: UnsplashUser;
  tags: UnsplashTag[];
}

export type Color = string;

export interface UnsplashImageLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface UnsplashImageUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface UnsplashUserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

export interface UnsplashUserProfileImages {
  small: string;
  medium: string;
  large: string;
}

export interface UnsplashUser {
  id: string;
  updated_at: Date;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: null;
  portfolio_url: string;
  bio: string;
  location: string;
  links: UnsplashUserLinks;
  profile_image: UnsplashUserProfileImages;
  instagram_username: null;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: any;
  // "social": {
  //   "instagram_username": null,
  //   "portfolio_url": "http://www.victorgphotography.com",
  //   "twitter_username": null,
  //   "paypal_email": null
  // }
}

export interface UnsplashCollection {}
export interface UnsplashCategory {}
export interface UnsplashSource {}
export interface UnsplashTag {
  type: string;
  title: string;
  source?: UnsplashSource;
}
