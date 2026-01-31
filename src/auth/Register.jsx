import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const Navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            alert("Account created successfully 🎉");
        } catch (err) {
            setError("Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const oauthRegister = (provider) => {
        window.location.href = `http://localhost:5000/auth/${provider}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Create Account 🚀
                </h2>

                {/* OAuth */}
                <div className="space-y-3 mb-6">
                    <button
                        onClick={() => oauthRegister("google")}
                        className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            className="w-5"
                        />
                        Sign up with Google
                    </button>

                    <button
                        onClick={() => oauthRegister("github")}
                        className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50"
                    >
                        <img
                            src="https://www.svgrepo.com/show/512317/github-142.svg"
                            className="w-5"
                        />
                        Sign up with GitHub
                    </button>
                </div>

                <div className="flex items-center my-4">
                    <div className="flex-grow h-px bg-gray-300" />
                    <span className="px-3 text-gray-500 text-sm">OR</span>
                    <div className="flex-grow h-px bg-gray-300" />
                </div>

                {/* Register Form */}
                <form onSubmit={handleRegister} className="space-y-4">
                    {error && (
                        <p className="text-red-600 text-sm bg-red-50 p-2 rounded">
                            {error}
                        </p>
                    )}

                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                <p onClick={()=>{Navigate("/login")}} className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <span className="text-indigo-600 font-medium cursor-pointer">Login</span>
                </p>
            </div>
        </div>
    );
}
