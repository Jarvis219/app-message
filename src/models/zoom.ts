export interface zoomState {
  _id?: string;
  userId1?: user | string;
  userId2?: user | string;
  data?: dataChat[];
}

export interface dataChat {
  userChat: string;
  message: string;
  photo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface user {
  _id?: string;
  name: string;
  avatar: string;
  email?: string;
}
