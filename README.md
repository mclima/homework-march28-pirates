# Homework

Download this repo for the homework and run `npm i` to install the dependencies.

In order to work with the pirates data you need to run `$npm start` in one terminal and  `$npm run json` in a second terminal

Ensure that the pirates endpoint is up by visiting `http://localhost:3001/pirates` in your browser _and_ that you can see 10 pirates in the UI.

First we will alter the `addPirate` function in `App.js` so that it creates a new pirate not only in the app's state but in the database (`pirates.json`) as well.

`addPirate` before:

```js
  const addPirate = (pirate) => {
    pirate.image = "avatar.png";
    setPirates((prev) => [pirate, ...prev]);
  };
```

`addPirate` after:

```js
  const addPirate = (pirate) => {
    pirate.image = "avatar.png";
    fetch("http://localhost:3001/pirates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pirate),
    })
      .then((res) => res.json())
      .then((newPirate) => setPirates([newPirate, ...pirates]));
  };
```

Note: 

- the second parameter to the fetch call here:

```js
// everything after the comma on the line below:
fetch("http://localhost:3001/pirates", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(pirate),
})
```

We will discuss this in class.

- json server sends back the newly inserted pirate so that the response in this line:

```js
.then((res) => res.json())
```

is the newly added pirate (try logging `res` to the console).

Test in the UI to ensure the you can create a pirate. Open and examine `pirates.json` - you should see it there too.

(Now that you can create a pirate, deleting them should be a bit easier as you will not have to replenish `pirates.json` should you ever delete all of them.)

Note that the pirates served from `http://localhost:3001/pirates` all have a unique id.

Instead of specifying which pirate to delete using the pirate's name in `Pirate.js`:

```js
<Button onClick={() => removePirate(name)} text="Remove Pirate" />
```

you will destructure the id and pass the it to the `removePirate` function instead:

After:

```js
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
  );
}
```

We do this because json server creates a unique id for each pirate you add.

Our current `removePirate` function filters the pirates using the pirate name:

```js
  const removePirate = (name) => {
    const newPirates = pirates.filter((pirate) => pirate.name !== name);
    setPirates(newPirates);
  };
```

Now that we are passing it an id, rename the argument from `name` to `pirateId`:

```js
  const removePirate = (pirateId) => {
    const newPirates = pirates.filter((pirate) => pirate.id !== pirateId);
    setPirates(newPirates);
  };
```

Now add a fetch call with the method set to 'DELETE':

```js
  const removePirate = (pirateId) => {
    fetch(`http://localhost:3001/pirates/${pirateId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(setPirates(pirates.filter((pirate) => pirate.id !== pirateId)));
  };
```

Test to ensure that you can both add and remove pirates.