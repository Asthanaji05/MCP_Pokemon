
# Move Target

Targets moves can be directed at during battle. Targets can be Pokémon, environments or even other moves.
Endpoint: [https://pokeapi.co/api/v2/move-target/](https://pokeapi.co/api/v2/move-target/)

```json
{
  "count": 16,
  "next": null,
  "previous": null,
  "results": [
    {
      "name": "specific-move",
      "url": "https://pokeapi.co/api/v2/move-target/1/"
    },
    {
      "name": "selected-pokemon-me-first",
      "url": "https://pokeapi.co/api/v2/move-target/2/"
    },
    {
      "name": "ally",
      "url": "https://pokeapi.co/api/v2/move-target/3/"
    },
    {
      "name": "users-field",
      "url": "https://pokeapi.co/api/v2/move-target/4/"
    },
    {
      "name": "user-or-ally",
      "url": "https://pokeapi.co/api/v2/move-target/5/"
    },
    {
      "name": "opponents-field",
      "url": "https://pokeapi.co/api/v2/move-target/6/"
    },
    {
      "name": "user",
      "url": "https://pokeapi.co/api/v2/move-target/7/"
    },
    {
      "name": "random-opponent",
      "url": "https://pokeapi.co/api/v2/move-target/8/"
    },
    {
      "name": "all-other-pokemon",
      "url": "https://pokeapi.co/api/v2/move-target/9/"
    },
    {
      "name": "selected-pokemon",
      "url": "https://pokeapi.co/api/v2/move-target/10/"
    },
    {
      "name": "all-opponents",
      "url": "https://pokeapi.co/api/v2/move-target/11/"
    },
    {
      "name": "entire-field",
      "url": "https://pokeapi.co/api/v2/move-target/12/"
    },
    {
      "name": "user-and-allies",
      "url": "https://pokeapi.co/api/v2/move-target/13/"
    },
    {
      "name": "all-pokemon",
      "url": "https://pokeapi.co/api/v2/move-target/14/"
    },
    {
      "name": "all-allies",
      "url": "https://pokeapi.co/api/v2/move-target/15/"
    },
    {
      "name": "fainting-pokemon",
      "url": "https://pokeapi.co/api/v2/move-target/16/"
    }
  ]
}
```

Endpoint: [https://pokeapi.co/api/v2/move-target/1/](https://pokeapi.co/api/v2/move-target/1/)

```json
{
  "descriptions": [
    {
      "description": "Eine spezifische Fähigkeit.  Wie diese Fähigkeit genutzt wird hängt von den genutzten Fähigkeiten ab.",
      "language": {
        "name": "de",
        "url": "https://pokeapi.co/api/v2/language/6/"
      }
    },
    {
      "description": "One specific move.  How this move is chosen depends upon on the move being used.",
      "language": {
        "name": "en",
        "url": "https://pokeapi.co/api/v2/language/9/"
      }
    }
  ],
  "id": 1,
  "moves": [
    {
      "name": "counter",
      "url": "https://pokeapi.co/api/v2/move/68/"
    },
    {
      "name": "curse",
      "url": "https://pokeapi.co/api/v2/move/174/"
    },
    {
      "name": "mirror-coat",
      "url": "https://pokeapi.co/api/v2/move/243/"
    },
    {
      "name": "metal-burst",
      "url": "https://pokeapi.co/api/v2/move/368/"
    },
    {
      "name": "comeuppance",
      "url": "https://pokeapi.co/api/v2/move/894/"
    }
  ],
  "name": "specific-move",
  "names": [
    {
      "language": {
        "name": "de",
        "url": "https://pokeapi.co/api/v2/language/6/"
      },
      "name": "Spezifische Fähigkeit"
    },
    {
      "language": {
        "name": "en",
        "url": "https://pokeapi.co/api/v2/language/9/"
      },
      "name": "Specific move"
    }
  ]
}
```
