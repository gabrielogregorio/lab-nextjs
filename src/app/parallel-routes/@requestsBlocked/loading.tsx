export default async function Loading() {
    return (
        <div className="bg-linear-60 from-gray-500 to-gray-600 p-2 rounded-md shadow-2xl text-white/90 animate-pulse">
            <div className="mx-auto bg-gray-500 h-6 max-w-48"></div>
            <div className="mx-auto h-[31.99px] max-w-16 bg-gray-500 mt-2"></div>
            <div className="mx-auto mt-2 bg-gray-500 h-4 max-w-32"></div>
        </div>
    );
}
