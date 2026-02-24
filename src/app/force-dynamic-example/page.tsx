export const dynamic = "force-dynamic"

export const fetchSite = async (): Promise<{ id: string, date: string, title: string }> => {
    return {
        date: Date.now().toLocaleString(),
        ...(await fetch('https://jsonplaceholder.typicode.com/posts/1').then((result) => result.json()))
    }
}



export default async function ForceDynamicExample() {
    const data = await fetchSite()

    return (
        <div className="mt-24 text-center">
            <p className="text-white">Esta página sempre irá mudar a data porque foi forçada a ser dinamica</p>
            <h1 className="text-white">{data.id} - {data.title}</h1>
            <p className="text-white">{data.date}</p>
        </div>
    )
}