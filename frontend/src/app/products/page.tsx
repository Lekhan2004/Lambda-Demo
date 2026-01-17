import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import axios from "axios";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ProductsPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    let products = [];
    try {
        const res = await axios.get(`${process.env.BACKEND_URL || "http://localhost:5001"}/api/products`, {
            headers: {
                Authorization: `Bearer ${session.user.accessToken}`,
            },
        });
        products = res.data;
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }

    return (
        <div className="min-h-screen bg-slate-950 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            Product Catalog
                        </h1>
                        <p className="text-slate-400 mt-2">Discover our curated collection of premium items.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-400">Signed in as {session.user.email}</span>
                        <a href="/api/auth/signout" className="bg-slate-800 hover:bg-slate-700 text-sm px-4 py-2 rounded-lg transition-colors">
                            Sign Out
                        </a>
                    </div>
                </header>

                {products.length === 0 ? (
                    <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800">
                        <p className="text-slate-500 text-lg">No products found. Start by adding some to your database.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product: any) => (
                            <div key={product._id} className="group bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-500/10">
                                <div className="aspect-square bg-slate-800 relative overflow-hidden">
                                    {/* Placeholder for product image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-700 bg-slate-800 group-hover:scale-110 transition-transform duration-500">
                                        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">{product.category}</span>
                                    <h3 className="text-xl font-bold mt-2 group-hover:text-blue-400 transition-colors uppercase">{product.name}</h3>
                                    <p className="text-slate-400 mt-2 text-sm line-clamp-2">{product.description}</p>
                                    <div className="mt-6 flex justify-between items-center">
                                        <span className="text-2xl font-bold">${product.price}</span>
                                        <button className="bg-white text-slate-900 font-bold px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
