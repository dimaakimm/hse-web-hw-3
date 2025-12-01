export interface RemotiveJob {
  id?: number | string;
  title: string;
  company_name?: string;
  candidate_required_location?: string;
  job_type?: string;
  category?: string;
  url: string;
}

// Google Books API
export interface GoogleBookVolumeInfo {
  title?: string;
  authors?: string[];
  imageLinks?: {
    thumbnail?: string;
  };
  publishedDate?: string;
  description?: string;
  infoLink?: string;
}

export interface GoogleBookItem {
  id?: string;
  volumeInfo?: GoogleBookVolumeInfo;
}

// Studio Ghibli API
export interface GhibliMovie {
  id?: string;
  title: string;
  original_title?: string;
  release_date?: string;
  running_time?: string;
  description?: string;
  url?: string;
}
