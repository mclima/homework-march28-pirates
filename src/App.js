import Header from './components/Header'
import Pirate from './components/Pirate'
import React from 'react'
import AddPirate from './components/AddPirate'

const pirateCalls = [
  'Aaarg, belay that!',
  'Avast me hearties!',
  'Shiver me timbers!',
]

const randomize = () =>
  pirateCalls[Math.floor(Math.random() * pirateCalls.length)]

function App() {
  const [pirates, setPirates] = React.useState([])

  React.useEffect(() => {
    fetch('http://localhost:3001/pirates')
      .then((res) => res.json())
      .then((data) => {
        setPirates(data)
      })
  }, [])

  const addPirate = (pirate) => {
    pirate.image = 'avatar.png'
    fetch('http://localhost:3001/pirates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pirate),
    })
      .then((res) => res.json())
      .then((newPirate) => {
        console.log(newPirate)
        setPirates([newPirate, ...pirates])
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const removePirate = (pirateId) => {
    fetch(`http://localhost:3001/pirates/${pirateId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(setPirates(pirates.filter((pirate) => pirate.id !== pirateId)))
  }

  return (
    <div>
      <Header title={randomize()} />
      <AddPirate addPirate={addPirate} />
      {pirates.map((pirate, index) => (
        <Pirate
          key={index}
          pirate={pirate}
          tagline={randomize()}
          removePirate={removePirate}
        />
      ))}
    </div>
  )
}

export default App
