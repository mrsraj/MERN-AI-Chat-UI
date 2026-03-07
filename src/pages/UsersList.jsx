import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import api from "../api/chat.api";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await api.fetchApi("/api/v1/auth/users", {
                    method: "GET",
                })

                // const data = await res.json();
                setUsers(data.users || []);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    async function test() {
        const data = await api.fetchApi("/refresh", {
            method: "GET",
            credentials: "include"   // 🔥 VERY IMPORTANT
        });

        console.log(data);
    }


    if (loading) {
        return (
            <div className="flex justify-center items-center h-40 text-gray-600">
                Loading users...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 mt-6">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Users
            </h2>

            <button onClick={test}>login</button>

            <Helmet>
                <title>User-Page</title>
                <meta name="description" content="This is the home page" />
            </Helmet>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                    <div
                        key={user._id}
                        className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-lg">
                                {user.fullname?.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <p className="font-semibold text-gray-800">
                                    {user.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;
