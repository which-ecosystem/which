export interface Page {
  prefix: string;
  id: string;
}
export interface User {
  name: string;
  avatarUrl: string;
  _id: string;
}

interface ImageData {
  url: string;
  votes: number;
}

export interface Poll {
  _id: string;
  author: User;
  contents: {
    left: ImageData;
    right: ImageData;
  };
}

