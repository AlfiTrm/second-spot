const BASE_URL = 'https://fakestoreapi.com';
const AUTH_URL = `https://be-intern.bccdev.id/arva`

export const END_API = {
    BASE_URL,
    PRODUCTS: `${BASE_URL}/products`,
    CARTS: `${BASE_URL}/carts`,
    USER: `${BASE_URL}/users`,
}

export const END_AUTH = {
    REGISTER : `${AUTH_URL}/api/register`,
    LOGIN: `${AUTH_URL}/api/login`,
}
