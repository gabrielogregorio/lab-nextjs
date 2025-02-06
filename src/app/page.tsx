import { revalidateTag } from 'next/cache';
import { Profile } from './profile';
import { cacheTags } from './tags';

export default function Home() {
  const processData = async (data: FormData) => {
    'use server';

    const name = data.get('name');

    await fetch('http://localhost:3000/api/user', {
      method: 'PATCH',
      body: JSON.stringify({ name }),
    });
  };

  const updateImage = async (data: FormData) => {
    'use server';

    const image = data.get('image') as string;

    await fetch('http://localhost:3000/api/user', {
      method: 'PATCH',
      body: JSON.stringify({ image }),
    });

    revalidateTag(cacheTags.updateImage);
  };

  return (
    <div>
      <Profile />
      <form action={processData}>
        <input type="text" name="name" id="name" placeholder="type your name" />
        <button type="submit">update name</button>
      </form>

      <form action={updateImage}>
        <input type="text" name="image" id="image" placeholder="type your image" />
        <button type="submit">update image</button>
      </form>
    </div>
  );
}
