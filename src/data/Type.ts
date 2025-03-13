export interface IProduct {
  [x: string]: any;
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  location?: string;
  condition?: string;
  userId: string;
}

export type UserProps = {
  id: number;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type CartProps = {
  userId: number;
  product: IProduct[];
};

export type CategoryProps = {
  imageSrc: string;
  text: string;
};
