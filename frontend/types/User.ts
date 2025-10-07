interface User {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    cover?: string;
    followers?: string[];
    following?: string[];
}

interface oauthUser {
    email: string;
    name: string;
    image: string;
}

export type { User, oauthUser };