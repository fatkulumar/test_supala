
type Rating = {
    rate: number;
    count: number;
}

export type IData = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}
