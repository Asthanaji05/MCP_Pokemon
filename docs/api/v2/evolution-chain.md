
# Evolution Chain

Evolution chains are essentially family trees. They start with the lowest stage within a family and detail evolution conditions for each as well as Pokémon they can evolve into up through the hierarchy.
Endpoint: [https://pokeapi.co/api/v2/evolution-chain/](https://pokeapi.co/api/v2/evolution-chain/)

```json
{
  "count": 541,
  "next": "https://pokeapi.co/api/v2/evolution-chain/?offset=20&limit=20",
  "previous": null,
  "results": [
    {
      "url": "https://pokeapi.co/api/v2/evolution-chain/1/"
    },
    {
      "url": "https://pokeapi.co/api/v2/evolution-chain/2/"
    },
    {
      "url": "https://pokeapi.co/api/v2/evolution-chain/3/"
    },
    {
      "url": "https://pokeapi.co/api/v2/evolution-chain/4/"
    },
    {
      "url": "https://pokeapi.co/api/v2/evolution-chain/5/"
    },
    {
      "url": "https://pokeapi.co/api/v2/evolution-chain/6/"
    },
    {
      "url": "https://pokeapi.co/api/v2/evolution-chain/7/"
    },
    {
      "url": "https://pokeapi.co/api/v2/evolution-chain/8/"
    },
    {
      "url": "https://pokeapi.co/api/v2/evolution-chain/9/"
    },
    {
      "url": "https://pokeapi.co/api/v2/evolution-chain/10/"
    },
    {
      "url": "https://pokeapi.co/api/v2/evolution-chain/11/"
    },
    {
      "url": "https://pokeapi.co/api/v2/evolution-chain/12/"
    },
    {
      "url": "https://pokeapi.co/api/v2/evolution-chain/13/"
    },
    {
      "url": "https://pokeapi.co/api/v2/evolution-chain/14/"
    },
    {
      "url": "https://pokeapi.co/api/v2/evolution-chain/15/"
    },
    {
      "url": "https://pokeapi.co/api/v2/evolution-chain/16/"
    },
    {
      "url": "https://pokeapi.co/api/v2/evolution-chain/17/"
    },
    {
      "url": "https://pokeapi.co/api/v2/evolution-chain/18/"
    },
    {
      "url": "https://pokeapi.co/api/v2/evolution-chain/19/"
    },
    {
      "url": "https://pokeapi.co/api/v2/evolution-chain/20/"
    }
  ]
}
```

Endpoint: [https://pokeapi.co/api/v2/evolution-chain/1/](https://pokeapi.co/api/v2/evolution-chain/1/)

```json
{
  "baby_trigger_item": null,
  "chain": {
    "evolution_details": [],
    "evolves_to": [
      {
        "evolution_details": [
          {
            "base_form_id": null,
            "gender": null,
            "held_item": null,
            "item": null,
            "known_move": null,
            "known_move_type": null,
            "location": null,
            "min_affection": null,
            "min_beauty": null,
            "min_happiness": null,
            "min_level": 16,
            "needs_overworld_rain": false,
            "party_species": null,
            "party_type": null,
            "region_id": null,
            "relative_physical_stats": null,
            "time_of_day": "",
            "trade_species": null,
            "trigger": {
              "name": "level-up",
              "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
            },
            "turn_upside_down": false
          }
        ],
        "evolves_to": [
          {
            "evolution_details": [
              {
                "base_form_id": null,
                "gender": null,
                "held_item": null,
                "item": null,
                "known_move": null,
                "known_move_type": null,
                "location": null,
                "min_affection": null,
                "min_beauty": null,
                "min_happiness": null,
                "min_level": 32,
                "needs_overworld_rain": false,
                "party_species": null,
                "party_type": null,
                "region_id": null,
                "relative_physical_stats": null,
                "time_of_day": "",
                "trade_species": null,
                "trigger": {
                  "name": "level-up",
                  "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
                },
                "turn_upside_down": false
              }
            ],
            "evolves_to": [],
            "is_baby": false,
            "species": {
              "name": "venusaur",
              "url": "https://pokeapi.co/api/v2/pokemon-species/3/"
            }
          }
        ],
        "is_baby": false,
        "species": {
          "name": "ivysaur",
          "url": "https://pokeapi.co/api/v2/pokemon-species/2/"
        }
      }
    ],
    "is_baby": false,
    "species": {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon-species/1/"
    }
  },
  "id": 1
}
```
