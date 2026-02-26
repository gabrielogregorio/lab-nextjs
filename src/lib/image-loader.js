// o custom loader apenas envia a url a um servidor e o permite que ele faça o processamento
// e cachemento da imagem sob demanda. O Servidor precisa de aceitar os parametros e você precisa
// de passar os parametros conforme necessidade. sem o custom loader, o nextjs usar o processamento
// dele, esse é apenas um exemplo pra usar um customizado

export default function customImageLoader({ src, width, quality }) {
  if (src.includes('picsum.photos')) {
    return `${src}?w=${width}&q=${quality || 75}`;
  }
  // return `https://res.cloudinary.com/demo/image/fetch/w_\${width},q_\${quality}/\${src}\`
  return `${src}?w=${width}&q=${quality || 75}`;
}
