import Image from "next/image";

const images = [
  {
    id: 1,
    src: "https://picsum.photos/seed/mountain/800/600",
    alt: "Montanha",
    title: "Paisagem Montanhosa",
    originalSize: "~245KB",
  },
  {
    id: 2,
    src: "https://picsum.photos/seed/city/800/600",
    alt: "Cidade",
    title: "Vista Urbana",
    originalSize: "~312KB",
  },
  {
    id: 3,
    src: "https://picsum.photos/seed/forest/800/600",
    alt: "Floresta",
    title: "Floresta Densa",
    originalSize: "~198KB",
  },
];

export default function Case29Page() {
  return (
    <div >


      <h1>Custom Image Loader</h1>
<p>Desative a otimização no next.config.ts e verifique os tamanhos na aba network</p>
      <div
        className="grid grid-cols-3 gap-6"
      >
        {images.map((img) => (
          <div key={img.id}>
            <div
              className="relative w-full aspect-4/3 rounded-xl bg-border"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={75}
              />
            </div>

            <h3 >
              {img.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
