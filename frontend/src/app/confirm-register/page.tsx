"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ConfirmRegisterPage() {
    const [formObject, setFormObject] = useState({
        verificationCode: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormObject((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        // Per requirement: Capture and console the formObject
        console.log("Verification Form Submitted:", formObject);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl">
                <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Verify Your Account
                </h1>

                <p className="text-slate-400 text-center mb-8 text-sm">
                    Enter the verification code sent to your email to complete your registration.
                </p>

                {message && (
                    <div className="bg-blue-500/10 border border-blue-500/50 text-blue-400 p-3 rounded-lg mb-6 text-sm text-center">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Verification Code</label>
                        <input
                            type="text"
                            name="verificationCode"
                            value={formObject.verificationCode}
                            onChange={handleChange}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white text-center text-2xl tracking-widest font-mono"
                            placeholder="000000"
                            required
                            maxLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
                    >
                        {loading ? "Verifying..." : "Verify Code"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        className="text-sm text-slate-500 hover:text-blue-400 transition-colors"
                        onClick={() => console.log("Resend code requested")}
                    >
                        Didn't receive a code? Resend
                    </button>
                </div>

                <p className="mt-8 text-center text-sm text-slate-500">
                    Back to{" "}
                    <Link href="/login" className="text-blue-400 hover:text-blue-300">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
