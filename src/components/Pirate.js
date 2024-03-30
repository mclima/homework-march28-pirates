import Button from './Button'
import '../assets/css/Pirate.css'
import avatar from '../assets/img/avatar.png'

function Pirate({
  // note the new id in the next line:
  pirate: { name, year, weapon, vessel, desc, id },
  tagline,
  removePirate,
}) {
  return (
    <section>
      <summary>
        <img src={avatar} alt="pirate" />
        <h3>{name}</h3>
        <ul>
          <li>Died: {year}</li>
          <li>Weapon: {weapon}</li>
          <li>Vessel: {vessel}</li>
        </ul>
      </summary>
      <article>
        <h2>{tagline}</h2>
        <p>{desc}</p>
        {/* note that removePirate passes the id: */}
        <Button onClick={() => removePirate(id)} text="Remove Pirate" />
      </article>
    </section>
  )
}

export default Pirate
