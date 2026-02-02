import Cookies from "js-cookie";
import * as Sentry from "@sentry/react";
import { metrics } from "@sentry/react";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

/* ----------------------------------------
   Handle API Errors
---------------------------------------- */
const handleErrors = async (response) => {
    if (!response.ok) {
        let errorData = {};

        try {
            errorData = await response.json();
        } catch {
            errorData = { message: "Invalid server response" };
        }

        const error = new Error(
            errorData?.error || errorData?.message || "Something went wrong"
        );

        error.status = response.status;
        error.data = errorData;

        // Token expired / invalid
        if (
            errorData?.error?.toLowerCase()?.includes("token") ||
            errorData?.message?.toLowerCase()?.includes("token")
        ) {
            Cookies.remove("authToken");
            Cookies.remove("accountDetails");
            window.location.href = "/login";
        }

        throw error;
    }

    return response.json();
};

/* ----------------------------------------
   Core Request Function
---------------------------------------- */
const request = async (url, options = {}) => {
    const token = Cookies.get("authToken");

    const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            ...options,
            headers,
        });

        return await handleErrors(response);
    } catch (error) {
        throw error;
    }
};

/* ----------------------------------------
   API Methods
---------------------------------------- */
const api = {
    get: (url, config = {}) =>
        request(url, { ...config, method: "GET" }),

    post: (url, data, config = {}) =>
        request(url, {
            ...config,
            method: "POST",
            body: JSON.stringify(data),
        }),

    put: (url, data, config = {}) =>
        request(url, {
            ...config,
            method: "PUT",
            body: JSON.stringify(data),
        }),

    delete: (url, config = {}) =>
        request(url, { ...config, method: "DELETE" }),

    postFile: (url, formData, config = {}) => {
        const token = Cookies.get("authToken");

        return fetch(`${BASE_URL}${url}`, {
            method: "POST",
            headers: {
                ...(token && { Authorization: `carrum ${token}` }),
            },
            body: formData,
        }).then(handleErrors);
    },
};

export default api;
