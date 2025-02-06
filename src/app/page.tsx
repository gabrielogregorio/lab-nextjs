import Image from "next/image";

export default function Home() {

  const processData = async (data: FormData) => {
    "use server"

    const name = data.get('name')

    console.log(name)
  }

  return (
    <div>
      <form action={processData}>
        <input type="text" name="name" id="name" placeholder="type your name" />
        <button type="submit">
          update name
        </button>

      </form>
    </div>
  );
}
