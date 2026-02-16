import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const Navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                //credentials: "include", // 🔥 REQUIRED
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            console.log("response data =", data);

            alert("Logged in successfully");
        } catch (err) {
            console.error(err);
            alert("Login failed");
        } finally {
            setLoading(false);
        }

    };

    const oauthLogin = (provider) => {
        window.location.href = `http://localhost:5000/api/v1/auth/${provider}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Welcome Back 👋
                </h2>

                {/* OAuth Buttons */}
                <div className="space-y-3 mb-6">
                    <button
                        onClick={() => oauthLogin("google")}
                        className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" />
                        Continue with Google
                    </button>

                    <button
                        onClick={() => oauthLogin("github")}
                        className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50"
                    >
                        <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-5" />
                        Continue with GitHub
                    </button>
                </div>

                <div className="flex items-center my-4">
                    <div className="flex-grow h-px bg-gray-300" />
                    <span className="px-3 text-gray-500 text-sm">OR</span>
                    <div className="flex-grow h-px bg-gray-300" />
                </div>

                {/* Email Login */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p onClick={() => { Navigate("/register") }} className="text-center text-sm text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <span className="text-indigo-600 font-medium cursor-pointer">Sign Up</span>
                </p>
            </div>
        </div>
    );
}
