import { endpoints } from "./endpoints";

export const getUsers = async () => {
    const response = await fetch(endpoints.getUsers);
    return response.json();
}
export const createUser = async (name, email, password) => {
    const response = await fetch(endpoints.createUsers, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });
    return response.json();
}