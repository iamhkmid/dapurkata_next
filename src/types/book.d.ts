export type TBook = {
  id: string;
  title: string;
  authorName: string;
  price: number,
  numberOfPages: number,
  stock: number;
  publisher: string;
  description: string;
  Image: { url: string; secureUrl: string; }
  printType: string;
  isbn: string;
  slug: string;
}

export type TFormAdd = {
  title: string;
  authorName: string;
  price: number;
  stock: number;
  publisher: string;
  description: string;
  printType: string;
  numberOfPages: number
  isbn: string;
  cover: string;
}

export type TMutationAddBook = {
  statusCode: string;
  data: {
    id: string;
    title: string;
    authorName: string;
    price: number;
    stock: number;
    publisher: string;
    description: string;
    printType: string;
    numberOfPages: number
    isbn: string;
  }
}

export type TMutationDeleteBook = {
  statusCode: string;
  data: {
    id: string;
    title: string;
    authorName: string;
    price: number;
    stock: number;
    publisher: string;
    description: string;
    printType: string;
    numberOfPages: number
    isbn: string;
  }
}