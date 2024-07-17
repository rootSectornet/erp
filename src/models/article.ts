
export interface Comment {
    id:number;
    author:string;
    text:string;
}

export interface Article {
    id:number;
    title:string;
    content:string;
    author:string;
    timestamp:string;
    likes:number;
    comments:Comment[];
}
