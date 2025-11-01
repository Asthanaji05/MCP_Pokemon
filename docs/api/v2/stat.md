
# Stat

Stats determine certain aspects of battles. Each Pokémon has a value for each stat which grows as they gain levels and can be altered momentarily by effects in battles.
Endpoint: [https://pokeapi.co/api/v2/stat/](https://pokeapi.co/api/v2/stat/)

```json
{
  "count": 8,
  "next": null,
  "previous": null,
  "results": [
    {
      "name": "hp",
      "url": "https://pokeapi.co/api/v2/stat/1/"
    },
    {
      "name": "attack",
      "url": "https://pokeapi.co/api/v2/stat/2/"
    },
    {
      "name": "defense",
      "url": "https://pokeapi.co/api/v2/stat/3/"
    },
    {
      "name": "special-attack",
      "url": "https://pokeapi.co/api/v2/stat/4/"
    },
    {
      "name": "special-defense",
      "url": "https://pokeapi.co/api/v2/stat/5/"
    },
    {
      "name": "speed",
      "url": "https://pokeapi.co/api/v2/stat/6/"
    },
    {
      "name": "accuracy",
      "url": "https://pokeapi.co/api/v2/stat/7/"
    },
    {
      "name": "evasion",
      "url": "https://pokeapi.co/api/v2/stat/8/"
    }
  ]
}
```

Endpoint: [https://pokeapi.co/api/v2/stat/1/](https://pokeapi.co/api/v2/stat/1/)

```json
{
  "affecting_items": [
    {
      "name": "hp-up",
      "url": "https://pokeapi.co/api/v2/item/45/"
    }
  ],
  "affecting_moves": {
    "decrease": [],
    "increase": []
  },
  "affecting_natures": {
    "decrease": [],
    "increase": []
  },
  "characteristics": [
    {
      "url": "https://pokeapi.co/api/v2/characteristic/1/"
    },
    {
      "url": "https://pokeapi.co/api/v2/characteristic/7/"
    },
    {
      "url": "https://pokeapi.co/api/v2/characteristic/13/"
    },
    {
      "url": "https://pokeapi.co/api/v2/characteristic/19/"
    },
    {
      "url": "https://pokeapi.co/api/v2/characteristic/25/"
    }
  ],
  "game_index": 1,
  "id": 1,
  "is_battle_only": false,
  "move_damage_class": null,
  "name": "hp",
  "names": [
    {
      "language": {
        "name": "ja-Hrkt",
        "url": "https://pokeapi.co/api/v2/language/1/"
      },
      "name": "HP"
    },
    {
      "language": {
        "name": "ko",
        "url": "https://pokeapi.co/api/v2/language/3/"
      },
      "name": "HP"
    },
    {
      "language": {
        "name": "zh-Hant",
        "url": "https://pokeapi.co/api/v2/language/4/"
      },
      "name": "HP"
    },
    {
      "language": {
        "name": "fr",
        "url": "https://pokeapi.co/api/v2/language/5/"
      },
      "name": "PV"
    },
    {
      "language": {
        "name": "de",
        "url": "https://pokeapi.co/api/v2/language/6/"
      },
      "name": "KP"
    },
    {
      "language": {
        "name": "es",
        "url": "https://pokeapi.co/api/v2/language/7/"
      },
      "name": "PS"
    },
    {
      "language": {
        "name": "it",
        "url": "https://pokeapi.co/api/v2/language/8/"
      },
      "name": "PS"
    },
    {
      "language": {
        "name": "en",
        "url": "https://pokeapi.co/api/v2/language/9/"
      },
      "name": "HP"
    },
    {
      "language": {
        "name": "zh-Hans",
        "url": "https://pokeapi.co/api/v2/language/12/"
      },
      "name": "HP"
    }
  ]
}
```
