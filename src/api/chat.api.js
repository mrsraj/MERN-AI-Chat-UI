const baseurl = "http://localhost:5000";

const fetchApi = async (endpoint, options = {}) => {

    const res = await fetch(`${baseurl}${endpoint}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    });

    const data = await res.json();

    if (!res.ok && res.statusText == "Unauthorized") {
        console.log("res 1 = ", res);

        throw new Error(data.message || "Request failed");
    }

    return data;
};

export default { fetchApi, baseurl };