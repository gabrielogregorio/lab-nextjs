export default function ServerList() {
  const items = Array.from({ length: 5000 }, (_, i) => `Item ${i}`)

  return (
    <ul>
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}