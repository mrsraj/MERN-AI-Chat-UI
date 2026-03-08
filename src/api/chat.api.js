const baseurl = "http://localhost:5000";

const fetchApi = async (endpoint, options = {}) => {
    try {
        const res = await fetch(`${baseurl}${endpoint}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            ...options,
        });

        console.log("res =", res);

        const data = await res.json();
          console.log("data =", data);

        if (!res.ok) {
            if (res.status === 401) {
                console.log("Unauthorized request");
            }

            throw new Error(data.message || "Request failed");
        }

        return data;

    } catch (error) {
        console.error("API Error:", error.message);
    }
};

export default { fetchApi, baseurl };