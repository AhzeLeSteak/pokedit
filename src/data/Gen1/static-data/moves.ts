import {Move} from "../../types/move";

export const moves_g1: Move[] = [
    {
        name: "Pound",
        type: "NORMAL",
        power: 40,
        accuracy: 100,
        PP: 35
    },
    {
        name: "Karate Chop",
        type: "FIGHTING",
        power: 50,
        accuracy: 100,
        PP: 25,
        effect: "High critical hit ratio."
    },
    {
        name: "Double Slap",
        type: "NORMAL",
        power: 15,
        accuracy: 85,
        PP: 10,
        effect: "Hits 2-5 times in one turn."
    },
    {
        name: "Comet Punch",
        type: "NORMAL",
        power: 18,
        accuracy: 85,
        PP: 15,
        effect: "Hits 2-5 times in one turn."
    },
    {
        name: "Mega Punch",
        type: "NORMAL",
        power: 80,
        accuracy: 85,
        PP: 20
    },
    {
        name: "Pay Day",
        type: "NORMAL",
        power: 40,
        accuracy: 100,
        PP: 20,
        effect: "Money is earned after the battle."
    },
    {
        name: "Fire Punch",
        type: "FIRE",
        power: 75,
        accuracy: 100,
        PP: 15,
        effect: "May burn opponent."
    },
    {
        name: "Ice Punch",
        type: "ICE",
        power: 75,
        accuracy: 100,
        PP: 15,
        effect: "May freeze opponent."
    },
    {
        name: "Thunder Punch",
        type: "ELECTRIC",
        power: 75,
        accuracy: 100,
        PP: 15,
        effect: "May paralyze opponent."
    },
    {
        name: "Scratch",
        type: "NORMAL",
        power: 40,
        accuracy: 100,
        PP: 35
    },
    {
        name: "Vise Grip",
        type: "NORMAL",
        power: 55,
        accuracy: 100,
        PP: 30
    },
    {
        name: "Guillotine",
        type: "NORMAL",
        power: "—",
        accuracy: 30,
        PP: 5,
        effect: "One-Hit-KO, if it hits."
    },
    {
        name: "Razor Wind",
        type: "NORMAL",
        power: 80,
        accuracy: 100,
        PP: 10,
        effect: "Charges on first turn, attacks on second. High critical hit ratio."
    },
    {
        name: "Swords Dance",
        type: "NORMAL",
        power: "—",
        accuracy: "—",
        PP: 20,
        effect: "Sharply raises user's Attack."
    },
    {
        name: "Cut",
        type: "NORMAL",
        power: 50,
        accuracy: 95,
        PP: 30
    },
    {
        name: "Gust",
        type: "FLYING",
        power: 40,
        accuracy: 100,
        PP: 35,
        effect: "Hits Pokémon using Fly/Bounce with double power."
    },
    {
        name: "Wing Attack",
        type: "FLYING",
        power: 60,
        accuracy: 100,
        PP: 35
    },
    {
        name: "Whirlwind",
        type: "NORMAL",
        power: "—",
        accuracy: "—",
        PP: 20,
        effect: "In battles, the opponent switches. In the wild, the Pokémon runs."
    },
    {
        name: "Fly",
        type: "FLYING",
        power: 90,
        accuracy: 95,
        PP: 15,
        effect: "Flies up on first turn, attacks on second turn."
    },
    {
        name: "Bind",
        type: "NORMAL",
        power: 15,
        accuracy: 85,
        PP: 20,
        effect: "Traps opponent, damaging them for 4-5 turns."
    },
    {
        name: "Slam",
        type: "NORMAL",
        power: 80,
        accuracy: 75,
        PP: 20
    },
    {
        name: "Vine Whip",
        type: "GRASS",
        power: 45,
        accuracy: 100,
        PP: 25
    },
    {
        name: "Stomp",
        type: "NORMAL",
        power: 65,
        accuracy: 100,
        PP: 20,
        effect: "May cause flinching."
    },
    {
        name: "Double Kick",
        type: "FIGHTING",
        power: 30,
        accuracy: 100,
        PP: 30,
        effect: "Hits twice in one turn."
    },
    {
        name: "Mega Kick",
        type: "NORMAL",
        power: 120,
        accuracy: 75,
        PP: 5
    },
    {
        name: "Jump Kick",
        type: "FIGHTING",
        power: 100,
        accuracy: 95,
        PP: 10,
        effect: "If it misses, the user loses half their HP."
    },
    {
        name: "Rolling Kick",
        type: "FIGHTING",
        power: 60,
        accuracy: 85,
        PP: 15,
        effect: "May cause flinching."
    },
    {
        name: "Sand Attack",
        type: "GROUND",
        power: "—",
        accuracy: 100,
        PP: 15,
        effect: "Lowers opponent's Accracy."
    },
    {
        name: "Headbutt",
        type: "NORMAL",
        power: 70,
        accuracy: 100,
        PP: 15,
        effect: "May cause flinching."
    },
    {
        name: "Horn Attack",
        type: "NORMAL",
        power: 65,
        accuracy: 100,
        PP: 25
    },
    {
        name: "Fury Attack",
        type: "NORMAL",
        power: 15,
        accuracy: 85,
        PP: 20,
        effect: "Hits 2-5 times in one turn."
    },
    {
        name: "Horn Drill",
        type: "NORMAL",
        power: "—",
        accuracy: 30,
        PP: 5,
        effect: "One-Hit-KO, if it hits."
    },
    {
        name: "Tackle",
        type: "NORMAL",
        power: 40,
        accuracy: 100,
        PP: 35
    },
    {
        name: "Body Slam",
        type: "NORMAL",
        power: 85,
        accuracy: 100,
        PP: 15,
        effect: "May paralyze opponent."
    },
    {
        name: "Wrap",
        type: "NORMAL",
        power: 15,
        accuracy: 90,
        PP: 20,
        effect: "Traps opponent, damaging them for 4-5 turns."
    },
    {
        name: "Take Down",
        type: "NORMAL",
        power: 90,
        accuracy: 85,
        PP: 20,
        effect: "User receives recoil damage."
    },
    {
        name: "Thrash",
        type: "NORMAL",
        power: 120,
        accuracy: 100,
        PP: 10,
        effect: "User attacks for 2-3 turns but then becomes confused."
    },
    {
        name: "Double-Edge",
        type: "NORMAL",
        power: 120,
        accuracy: 100,
        PP: 15,
        effect: "User receives recoil damage."
    },
    {
        name: "Tail Whip",
        type: "NORMAL",
        power: "—",
        accuracy: 100,
        PP: 30,
        effect: "Lowers opponent's Defense."
    },
    {
        name: "Poison Sting",
        type: "POISON",
        power: 15,
        accuracy: 100,
        PP: 35,
        effect: "May poison the opponent."
    },
    {
        name: "Twineedle",
        type: "BUG",
        power: 25,
        accuracy: 100,
        PP: 20,
        effect: "Hits twice in one turn. May poison opponent."
    },
    {
        name: "Pin Missile",
        type: "BUG",
        power: 25,
        accuracy: 95,
        PP: 20,
        effect: "Hits 2-5 times in one turn."
    },
    {
        name: "Leer",
        type: "NORMAL",
        power: "—",
        accuracy: 100,
        PP: 30,
        effect: "Lowers opponent's Defense."
    },
    {
        name: "Bite",
        type: "NORMAL",
        power: 60,
        accuracy: 100,
        PP: 25,
        effect: "May cause flinching."
    },
    {
        name: "Growl",
        type: "NORMAL",
        power: "—",
        accuracy: 100,
        PP: 40,
        effect: "Lowers opponent's Attack."
    },
    {
        name: "Roar",
        type: "NORMAL",
        power: "—",
        accuracy: "—",
        PP: 20,
        effect: "In battles, the opponent switches. In the wild, the Pokémon runs."
    },
    {
        name: "Sing",
        type: "NORMAL",
        power: "—",
        accuracy: 55,
        PP: 15,
        effect: "Puts opponent to sleep."
    },
    {
        name: "Supersonic",
        type: "NORMAL",
        power: "—",
        accuracy: 55,
        PP: 20,
        effect: "Confuses opponent."
    },
    {
        name: "Sonic Boom",
        type: "NORMAL",
        power: "—",
        accuracy: 90,
        PP: 20,
        effect: "Always inflicts 20 HP."
    },
    {
        name: "Disable",
        type: "NORMAL",
        power: "—",
        accuracy: 100,
        PP: 20,
        effect: "Opponent can't use its last attack for a few turns."
    },
    {
        name: "Acid",
        type: "POISON",
        power: 40,
        accuracy: 100,
        PP: 30,
        effect: "May lower opponent's Special Defense."
    },
    {
        name: "Ember",
        type: "FIRE",
        power: 40,
        accuracy: 100,
        PP: 25,
        effect: "May burn opponent."
    },
    {
        name: "Flamethrower",
        type: "FIRE",
        power: 90,
        accuracy: 100,
        PP: 15,
        effect: "May burn opponent."
    },
    {
        name: "Mist",
        type: "ICE",
        power: "—",
        accuracy: "—",
        PP: 30,
        effect: "User's stats cannot be changed for a period of time."
    },
    {
        name: "Water Gun",
        type: "WATER",
        power: 40,
        accuracy: 100,
        PP: 25
    },
    {
        name: "Hydro Pump",
        type: "WATER",
        power: 110,
        accuracy: 80,
        PP: 5
    },
    {
        name: "Surf",
        type: "WATER",
        power: 90,
        accuracy: 100,
        PP: 15,
        effect: "Hits all adjacent Pokémon."
    },
    {
        name: "Ice Beam",
        type: "ICE",
        power: 90,
        accuracy: 100,
        PP: 10,
        effect: "May freeze opponent."
    },
    {
        name: "Blizzard",
        type: "ICE",
        power: 110,
        accuracy: 70,
        PP: 5,
        effect: "May freeze opponent."
    },
    {
        name: "Psybeam",
        type: "PSYCHIC",
        power: 65,
        accuracy: 100,
        PP: 20,
        effect: "May confuse opponent."
    },
    {
        name: "Bubble Beam",
        type: "WATER",
        power: 65,
        accuracy: 100,
        PP: 20,
        effect: "May lower opponent's Speed."
    },
    {
        name: "Aurora Beam",
        type: "ICE",
        power: 65,
        accuracy: 100,
        PP: 20,
        effect: "May lower opponent's Attack."
    },
    {
        name: "Hyper Beam",
        type: "NORMAL",
        power: 150,
        accuracy: 90,
        PP: 5,
        effect: "User must recharge next turn."
    },
    {
        name: "Peck",
        type: "FLYING",
        power: 35,
        accuracy: 100,
        PP: 35
    },
    {
        name: "Drill Peck",
        type: "FLYING",
        power: 80,
        accuracy: 100,
        PP: 20
    },
    {
        name: "Submission",
        type: "FIGHTING",
        power: 80,
        accuracy: 80,
        PP: 20,
        effect: "User receives recoil damage."
    },
    {
        name: "Low Kick",
        type: "FIGHTING",
        power: "—",
        accuracy: 100,
        PP: 20,
        effect: "The heavier the opponent, the stronger the attack."
    },
    {
        name: "Counter",
        type: "FIGHTING",
        power: "—",
        accuracy: 100,
        PP: 20,
        effect: "When hit by a Physical Attack, user strikes back with 2x power."
    },
    {
        name: "Seismic Toss",
        type: "FIGHTING",
        power: "—",
        accuracy: 100,
        PP: 20,
        effect: "Inflicts damage equal to user's level."
    },
    {
        name: "Strength",
        type: "NORMAL",
        power: 80,
        accuracy: 100,
        PP: 15
    },
    {
        name: "Absorb",
        type: "GRASS",
        power: 20,
        accuracy: 100,
        PP: 25,
        effect: "User recovers half the HP inflicted on opponent."
    },
    {
        name: "Mega Drain",
        type: "GRASS",
        power: 40,
        accuracy: 100,
        PP: 15,
        effect: "User recovers half the HP inflicted on opponent."
    },
    {
        name: "Leech Seed",
        type: "GRASS",
        power: "—",
        accuracy: 90,
        PP: 10,
        effect: "Drains HP from opponent each turn."
    },
    {
        name: "Growth",
        type: "NORMAL",
        power: "—",
        accuracy: "—",
        PP: 20,
        effect: "Raises user's Attack and Special Attack."
    },
    {
        name: "Razor Leaf",
        type: "GRASS",
        power: 55,
        accuracy: 95,
        PP: 25,
        effect: "High critical hit ratio."
    },
    {
        name: "Solar Beam",
        type: "GRASS",
        power: 120,
        accuracy: 100,
        PP: 10,
        effect: "Charges on first turn, attacks on second."
    },
    {
        name: "Poison Powder",
        type: "POISON",
        power: "—",
        accuracy: 75,
        PP: 35,
        effect: "Poisons opponent."
    },
    {
        name: "Stun Spore",
        type: "GRASS",
        power: "—",
        accuracy: 75,
        PP: 30,
        effect: "Paralyzes opponent."
    },
    {
        name: "Sleep Powder",
        type: "GRASS",
        power: "—",
        accuracy: 75,
        PP: 15,
        effect: "Puts opponent to sleep."
    },
    {
        name: "Petal Dance",
        type: "GRASS",
        power: 120,
        accuracy: 100,
        PP: 10,
        effect: "User attacks for 2-3 turns but then becomes confused."
    },
    {
        name: "String Shot",
        type: "BUG",
        power: "—",
        accuracy: 95,
        PP: 40,
        effect: "Sharply lowers opponent's Speed."
    },
    {
        name: "Dragon Rage",
        type: "DRAGON",
        power: "—",
        accuracy: 100,
        PP: 10,
        effect: "Always inflicts 40 HP."
    },
    {
        name: "Fire Spin",
        type: "FIRE",
        power: 35,
        accuracy: 85,
        PP: 15,
        effect: "Traps opponent, damaging them for 4-5 turns."
    },
    {
        name: "Thunder Shock",
        type: "ELECTRIC",
        power: 40,
        accuracy: 100,
        PP: 30,
        effect: "May paralyze opponent."
    },
    {
        name: "Thunderbolt",
        type: "ELECTRIC",
        power: 90,
        accuracy: 100,
        PP: 15,
        effect: "May paralyze opponent."
    },
    {
        name: "Thunder Wave",
        type: "ELECTRIC",
        power: "—",
        accuracy: 90,
        PP: 20,
        effect: "Paralyzes opponent."
    },
    {
        name: "Thunder",
        type: "ELECTRIC",
        power: 110,
        accuracy: 70,
        PP: 10,
        effect: "May paralyze opponent."
    },
    {
        name: "Rock Throw",
        type: "ROCK",
        power: 50,
        accuracy: 90,
        PP: 15
    },
    {
        name: "Earthquake",
        type: "GROUND",
        power: 100,
        accuracy: 100,
        PP: 10,
        effect: "Power is doubled if opponent is underground from using Dig."
    },
    {
        name: "Fissure",
        type: "GROUND",
        power: "—",
        accuracy: 30,
        PP: 5,
        effect: "One-Hit-KO, if it hits."
    },
    {
        name: "Dig",
        type: "GROUND",
        power: 80,
        accuracy: 100,
        PP: 10,
        effect: "Digs underground on first turn, attacks on second. Can also escape from caves."
    },
    {
        name: "Toxic",
        type: "POISON",
        power: "—",
        accuracy: 90,
        PP: 10,
        effect: "Badly poisons opponent."
    },
    {
        name: "Confusion",
        type: "PSYCHIC",
        power: 50,
        accuracy: 100,
        PP: 25,
        effect: "May confuse opponent."
    },
    {
        name: "Psychic",
        type: "PSYCHIC",
        power: 90,
        accuracy: 100,
        PP: 10,
        effect: "May lower opponent's Special Defense."
    },
    {
        name: "Hypnosis",
        type: "PSYCHIC",
        power: "—",
        accuracy: 60,
        PP: 20,
        effect: "Puts opponent to sleep."
    },
    {
        name: "Meditate",
        type: "PSYCHIC",
        power: "—",
        accuracy: "—",
        PP: 40,
        effect: "Raises user's Attack."
    },
    {
        name: "Agility",
        type: "PSYCHIC",
        power: "—",
        accuracy: "—",
        PP: 30,
        effect: "Sharply raises user's Speed."
    },
    {
        name: "Quick Attack",
        type: "NORMAL",
        power: 40,
        accuracy: 100,
        PP: 30,
        effect: "User attacks first."
    },
    {
        name: "Rage",
        type: "NORMAL",
        power: 20,
        accuracy: 100,
        PP: 20,
        effect: "Raises user's Attack when hit."
    },
    {
        name: "Teleport",
        type: "PSYCHIC",
        power: "—",
        accuracy: "—",
        PP: 20,
        effect: "Allows user to flee wild battles; also warps player to last PokéCenter."
    },
    {
        name: "Night Shade",
        type: "GHOST",
        power: "—",
        accuracy: 100,
        PP: 15,
        effect: "Inflicts damage equal to user's level."
    },
    {
        name: "Mimic",
        type: "NORMAL",
        power: "—",
        accuracy: "—",
        PP: 10,
        effect: "Copies the opponent's last move."
    },
    {
        name: "Screech",
        type: "NORMAL",
        power: "—",
        accuracy: 85,
        PP: 40,
        effect: "Sharply lowers opponent's Defense."
    },
    {
        name: "Double Team",
        type: "NORMAL",
        power: "—",
        accuracy: "—",
        PP: 15,
        effect: "Raises user's Evasiveness."
    },
    {
        name: "Recover",
        type: "NORMAL",
        power: "—",
        accuracy: "—",
        PP: 5,
        effect: "User recovers half its max HP."
    },
    {
        name: "Harden",
        type: "NORMAL",
        power: "—",
        accuracy: "—",
        PP: 30,
        effect: "Raises user's Defense."
    },
    {
        name: "Minimize",
        type: "NORMAL",
        power: "—",
        accuracy: "—",
        PP: 10,
        effect: "Sharply raises user's Evasiveness."
    },
    {
        name: "Smokescreen",
        type: "NORMAL",
        power: "—",
        accuracy: 100,
        PP: 20,
        effect: "Lowers opponent's Accracy."
    },
    {
        name: "Confuse Ray",
        type: "GHOST",
        power: "—",
        accuracy: 100,
        PP: 10,
        effect: "Confuses opponent."
    },
    {
        name: "Withdraw",
        type: "WATER",
        power: "—",
        accuracy: "—",
        PP: 40,
        effect: "Raises user's Defense."
    },
    {
        name: "Defense Curl",
        type: "NORMAL",
        power: "—",
        accuracy: "—",
        PP: 40,
        effect: "Raises user's Defense."
    },
    {
        name: "Barrier",
        type: "PSYCHIC",
        power: "—",
        accuracy: "—",
        PP: 20,
        effect: "Sharply raises user's Defense."
    },
    {
        name: "Light Screen",
        type: "PSYCHIC",
        power: "—",
        accuracy: "—",
        PP: 30,
        effect: "Halves damage from Special attacks for 5 turns."
    },
    {
        name: "Haze",
        type: "ICE",
        power: "—",
        accuracy: "—",
        PP: 30,
        effect: "Resets all stat changes."
    },
    {
        name: "Reflect",
        type: "PSYCHIC",
        power: "—",
        accuracy: "—",
        PP: 20,
        effect: "Halves damage from Physical attacks for 5 turns."
    },
    {
        name: "Focus Energy",
        type: "NORMAL",
        power: "—",
        accuracy: "—",
        PP: 30,
        effect: "Increases critical hit ratio."
    },
    {
        name: "Bide",
        type: "NORMAL",
        power: "—",
        accuracy: "—",
        PP: 10,
        effect: "User takes damage for two turns then strikes back double."
    },
    {
        name: "Metronome",
        type: "NORMAL",
        power: "—",
        accuracy: "—",
        PP: 10,
        effect: "User performs almost any move in the game at random."
    },
    {
        name: "Mirror Move",
        type: "FLYING",
        power: "—",
        accuracy: "—",
        PP: 20,
        effect: "User performs the opponent's last move."
    },
    {
        name: "Self-Destruct",
        type: "NORMAL",
        power: 200,
        accuracy: 100,
        PP: 5,
        effect: "User faints."
    },
    {
        name: "Egg Bomb",
        type: "NORMAL",
        power: 100,
        accuracy: 75,
        PP: 10
    },
    {
        name: "Lick",
        type: "GHOST",
        power: 30,
        accuracy: 100,
        PP: 30,
        effect: "May paralyze opponent."
    },
    {
        name: "Smog",
        type: "POISON",
        power: 30,
        accuracy: 70,
        PP: 20,
        effect: "May poison opponent."
    },
    {
        name: "Sludge",
        type: "POISON",
        power: 65,
        accuracy: 100,
        PP: 20,
        effect: "May poison opponent."
    },
    {
        name: "Bone Club",
        type: "GROUND",
        power: 65,
        accuracy: 85,
        PP: 20,
        effect: "May cause flinching."
    },
    {
        name: "Fire Blast",
        type: "FIRE",
        power: 110,
        accuracy: 85,
        PP: 5,
        effect: "May burn opponent."
    },
    {
        name: "Waterfall",
        type: "WATER",
        power: 80,
        accuracy: 100,
        PP: 15,
        effect: "May cause flinching."
    },
    {
        name: "Clamp",
        type: "WATER",
        power: 35,
        accuracy: 85,
        PP: 15,
        effect: "Traps opponent, damaging them for 4-5 turns."
    },
    {
        name: "Swift",
        type: "NORMAL",
        power: 60,
        accuracy: "∞",
        PP: 20,
        effect: "Ignores Accracy and Evasiveness."
    },
    {
        name: "Skull Bash",
        type: "NORMAL",
        power: 130,
        accuracy: 100,
        PP: 10,
        effect: "Raises Defense on first turn, attacks on second."
    },
    {
        name: "Spike Cannon",
        type: "NORMAL",
        power: 20,
        accuracy: 100,
        PP: 15,
        effect: "Hits 2-5 times in one turn."
    },
    {
        name: "Constrict",
        type: "NORMAL",
        power: 10,
        accuracy: 100,
        PP: 35,
        effect: "May lower opponent's Speed by one stage."
    },
    {
        name: "Amnesia",
        type: "PSYCHIC",
        power: "—",
        accuracy: "—",
        PP: 20,
        effect: "Sharply raises user's Special Defense."
    },
    {
        name: "Kinesis",
        type: "PSYCHIC",
        power: "—",
        accuracy: 80,
        PP: 15,
        effect: "Lowers opponent's Accracy."
    },
    {
        name: "Soft-Boiled",
        type: "NORMAL",
        power: "—",
        accuracy: "—",
        PP: 5,
        effect: "User recovers half its max HP."
    },
    {
        name: "High Jump Kick",
        type: "FIGHTING",
        power: 130,
        accuracy: 90,
        PP: 10,
        effect: "If it misses, the user loses half their HP."
    },
    {
        name: "Glare",
        type: "NORMAL",
        power: "—",
        accuracy: 100,
        PP: 30,
        effect: "Paralyzes opponent."
    },
    {
        name: "Dream Eater",
        type: "PSYCHIC",
        power: 100,
        accuracy: 100,
        PP: 15,
        effect: "User recovers half the HP inflicted on a sleeping opponent."
    },
    {
        name: "Poison Gas",
        type: "POISON",
        power: "—",
        accuracy: 90,
        PP: 40,
        effect: "Poisons opponent."
    },
    {
        name: "Barrage",
        type: "NORMAL",
        power: 15,
        accuracy: 85,
        PP: 20,
        effect: "Hits 2-5 times in one turn."
    },
    {
        name: "Leech Life",
        type: "BUG",
        power: 80,
        accuracy: 100,
        PP: 10,
        effect: "User recovers half the HP inflicted on opponent."
    },
    {
        name: "Lovely Kiss",
        type: "NORMAL",
        power: "—",
        accuracy: 75,
        PP: 10,
        effect: "Puts opponent to sleep."
    },
    {
        name: "Sky Attack",
        type: "FLYING",
        power: 140,
        accuracy: 90,
        PP: 5,
        effect: "Charges on first turn, attacks on second. May cause flinching. High critical hit ratio."
    },
    {
        name: "Transform",
        type: "NORMAL",
        power: "—",
        accuracy: "—",
        PP: 10,
        effect: "User takes on the form and attacks of the opponent."
    },
    {
        name: "Bubble",
        type: "WATER",
        power: 40,
        accuracy: 100,
        PP: 30,
        effect: "May lower opponent's Speed."
    },
    {
        name: "Dizzy Punch",
        type: "NORMAL",
        power: 70,
        accuracy: 100,
        PP: 10,
        effect: "May confuse opponent."
    },
    {
        name: "Spore",
        type: "GRASS",
        power: "—",
        accuracy: 100,
        PP: 15,
        effect: "Puts opponent to sleep."
    },
    {
        name: "Flash",
        type: "NORMAL",
        power: "—",
        accuracy: 100,
        PP: 20,
        effect: "Lowers opponent's Accracy."
    },
    {
        name: "Psywave",
        type: "PSYCHIC",
        power: "—",
        accuracy: 100,
        PP: 15,
        effect: "Inflicts damage 50-150% of user's level."
    },
    {
        name: "Splash",
        type: "NORMAL",
        power: "—",
        accuracy: "—",
        PP: 40,
        effect: "Doesn't do ANYTHING."
    },
    {
        name: "Acid Armor",
        type: "POISON",
        power: "—",
        accuracy: "—",
        PP: 20,
        effect: "Sharply raises user's Defense."
    },
    {
        name: "Crabhammer",
        type: "WATER",
        power: 100,
        accuracy: 90,
        PP: 10,
        effect: "High critical hit ratio."
    },
    {
        name: "Explosion",
        type: "NORMAL",
        power: 250,
        accuracy: 100,
        PP: 5,
        effect: "User faints."
    },
    {
        name: "Fury Swipes",
        type: "NORMAL",
        power: 18,
        accuracy: 80,
        PP: 15,
        effect: "Hits 2-5 times in one turn."
    },
    {
        name: "Bonemerang",
        type: "GROUND",
        power: 50,
        accuracy: 90,
        PP: 10,
        effect: "Hits twice in one turn."
    },
    {
        name: "Rest",
        type: "PSYCHIC",
        power: "—",
        accuracy: "—",
        PP: 5,
        effect: "User sleeps for 2 turns, but user is fully healed."
    },
    {
        name: "Rock Slide",
        type: "ROCK",
        power: 75,
        accuracy: 90,
        PP: 10,
        effect: "May cause flinching."
    },
    {
        name: "Hyper Fang",
        type: "NORMAL",
        power: 80,
        accuracy: 90,
        PP: 15,
        effect: "May cause flinching."
    },
    {
        name: "Sharpen",
        type: "NORMAL",
        power: "—",
        accuracy: "—",
        PP: 30,
        effect: "Raises user's Attack."
    },
    {
        name: "Conversion",
        type: "NORMAL",
        power: "—",
        accuracy: "—",
        PP: 30,
        effect: "Changes user's type to that of its first move."
    },
    {
        name: "Tri Attack",
        type: "NORMAL",
        power: 80,
        accuracy: 100,
        PP: 10,
        effect: "May paralyze, burn or freeze opponent."
    },
    {
        name: "Super Fang",
        type: "NORMAL",
        power: "—",
        accuracy: 90,
        PP: 10,
        effect: "Always takes off half of the opponent's HP."
    },
    {
        name: "Slash",
        type: "NORMAL",
        power: 70,
        accuracy: 100,
        PP: 20,
        effect: "High critical hit ratio."
    },
    {
        name: "Substitute",
        type: "NORMAL",
        power: "—",
        accuracy: "—",
        PP: 10,
        effect: "Uses HP to creates a decoy that takes hits."
    },
    {
        name: "Struggle",
        type: "NORMAL",
        power: 50,
        accuracy: "—",
        PP: "—",
        effect: "Only usable when all PP are gone. Hurts the user."
    }
];
