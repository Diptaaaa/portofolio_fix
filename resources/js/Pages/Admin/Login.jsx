import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: 'admin@rafli.dev',
        password: '',
        remember: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="min-h-screen bg-[#1A1412] text-[#F5EFEB] flex items-center justify-center p-4">
            <Head title="Admin CMS Login — Muhammad Rafli Pradipta" />

            <div className="w-full max-w-md rounded-3xl bg-[#241C18] border border-[rgba(196,169,146,0.2)] p-8 shadow-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-[#2E241F] border border-[rgba(196,169,146,0.25)] flex items-center justify-center mx-auto mb-4 text-[#C4A992] shadow-inner">
                        <ShieldCheck className="w-7 h-7" />
                    </div>
                    <h1 className="font-display text-3xl uppercase tracking-wider text-[#F5EFEB]">
                        CMS DASHBOARD
                    </h1>
                    <p className="text-xs text-[#C8BBB2] mt-1 font-mono">
                        Portofolio Management Back-Office
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#958479]" />
                            <input
                                type="email"
                                required
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="admin@rafli.dev"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] focus:border-[#C4A992] focus:outline-none text-[#F5EFEB] placeholder-[#958479] transition-colors"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-400 text-[10px] mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#958479] mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#958479]" />
                            <input
                                type="password"
                                required
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••••••"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-[#140F0D] border border-[rgba(196,169,146,0.2)] focus:border-[#C4A992] focus:outline-none text-[#F5EFEB] placeholder-[#958479] transition-colors"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-400 text-[10px] mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Hint for initial login */}
                    <div className="p-3 rounded-xl bg-[#2E241F] border border-[rgba(196,169,146,0.15)] text-[11px] text-[#C8BBB2]">
                        <span className="font-mono text-[10px] text-[#C4A992] block mb-0.5">// Default Credentials</span>
                        <span>Email: <code className="text-[#F5EFEB]">admin@rafli.dev</code> • Pass: <code className="text-[#F5EFEB]">admin12345</code></span>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C4A992] text-[#1A1412] hover:bg-[#D4BEA8] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-6"
                    >
                        <span>{processing ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </form>

                {/* Back to Public Portfolio */}
                <div className="text-center mt-6 pt-6 border-t border-[rgba(196,169,146,0.15)]">
                    <a
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs text-[#958479] hover:text-[#C4A992] transition-colors font-mono"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Return to Public Portfolio</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
