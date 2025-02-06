import { cacheTags } from './tags';

export async function Profile() {
  const result = await fetch('http://localhost:3000/api/user', {
    method: 'GET',
    cache: 'force-cache',
    next: {
      tags: [cacheTags.updateImage],
    },
  });

  const profile = await result.json();

  return (
    <div>
      <h1>Profile</h1>
      img: {profile.image}
    </div>
  );
}
