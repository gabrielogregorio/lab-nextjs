export const dynamic = "force-static"

export const fetchSite = async (): Promise<{ id: string, date: string, title: string }> => {
    return {
        date: Date.now().toLocaleString(),
        ...(await fetch('https://jsonplaceholder.typicode.com/posts/1').then((result) => result.json()))
    }
}



export default async function ForceStaticExample() {
    const data = await fetchSite()

    return (
        <div className="mt-24 text-center">
            <p className="text-white">Esta página sempre irá ficar estática porque foi forçada a ser estática</p>
            <h1 className="text-white">{data.id} - {data.title}</h1>
            <p className="text-white">{data.date}</p>
        </div>
    )
}