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
  author: {
    name: string;
    avatarUrl: string;
  };
  contents: {
    left: ImageData;
    right: ImageData;
  };
}

