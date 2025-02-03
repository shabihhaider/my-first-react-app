import { useEffect, useState } from "react"

const Card = ({title}) => {

  const [count, setCount] = useState(initialState => 0);
  const [hasLiked, setHasLiked] = useState(initialState => false);

  // useEffect is for side effects.
  useEffect(() => {
    console.log(`${title} has been liked: ${hasLiked}`);
  }, [hasLiked]); // this output depends on 'hasLiked'

  return (
    <div className="card" onClick={() => setCount(count + 1)}>
      <h2>{title} <br/> {count || null}</h2>

      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? "💖" : "🤍"}
      </button>
    </div>
  )
}

const App = () => {
  return (
    <div className="card-container">
      <Card title="Avatar" rating={5} isCool={true} actors={[{name: "Actors"}]} />
      <Card title="Avengers" />
      <Card title="Wednesday" />
    </div>
  )
}

export default App
