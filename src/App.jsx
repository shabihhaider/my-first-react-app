import { useState } from "react"

const Card = ({title}) => {
  const [hasLiked, setHasLiked] = useState(initialState => false);

  return (
    <div className="card">
      <h2>{title}</h2>

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
