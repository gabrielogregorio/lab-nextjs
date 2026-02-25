import Link from 'next/link';

export default async function Page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-8">
            <h1 className="text-3xl font-bold text-white">Lists</h1>
            <div className="flex gap-4">
                <Link
                    href="/lists/client"
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:scale-105 transition-transform duration-150"
                >
                    Client
                </Link>
                <Link
                    href="/lists/server"
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 hover:scale-105 transition-transform duration-150"
                >
                    Server
                </Link>
            </div>
        </div>
    );
}