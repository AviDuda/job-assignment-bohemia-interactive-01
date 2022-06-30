export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

export enum UsersLoadError {
    WrongStatus = "wrong_status",
    NotArray = "not_array",
    UnknownError = "unknown_error",
}

export async function fetchUsers() {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 5000);
    const response = await fetch("https://jsonplaceholder.typicode.com/users", { signal: controller.signal });
    if (!response.ok) {
        return Promise.reject(new Error(UsersLoadError.WrongStatus));
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
        return Promise.reject(new Error(UsersLoadError.NotArray));
    }
    return data as User[];
}
