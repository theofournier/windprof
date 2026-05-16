import type { Sport } from "./types";

export const sports: Sport[] = [
    {
        id: 'kitesurf',
        name: 'Kitesurf',
        tagline: "Voile en l'air, planche aux pieds.",
        blurb:
            "Le plus polyvalent des sports de vent. Un cerf-volant gonflable de 7 à 17 m² te tracte sur une twin-tip, un surfboard ou un foil. Sauts, vagues, freeride : trois disciplines en une.",
        moniteurs: 146,
        spots: 58,
        windMin: 12,
        windMax: 25,
        windSweet: '25 kt',
        beaufort: [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        learnTime: '8–12 h',
        level: 'Débutant accessible',
        gear: ['Aile 7–17 m²', 'Twin-tip ou foil', 'Harnais culotte', 'Combinaison 4/3'],
        certifs: ['BPJEPS Kite', 'IKO Level 1–3'],
        bestSpots: ['Leucate', 'La Torche', 'Beauduc', 'Wissant', 'Gruissan'],
        season: [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        priceRange: '50–80€/h',
        icon: 'kite'
    },
    {
        id: 'wingfoil',
        name: 'Wingfoil',
        tagline: "L'art de léviter sur l'eau.",
        blurb:
            "L'aile à main libre et le foil sous la planche. Tu décolles à 10 nœuds, glisses à 1 mètre au-dessus de la mer, en silence. La discipline qui explose depuis 2021.",
        moniteurs: 72,
        spots: 41,
        windMin: 10,
        windMax: 20,
        windSweet: '12–18 kt',
        beaufort: [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        learnTime: '15–25 h',
        level: 'Intermédiaire',
        gear: ['Aile 3–6 m²', 'Planche foil 80–120 L', 'Foil 1500–2200 cm²', 'Combinaison 4/3'],
        certifs: ['DE Voile', 'VDWS Wing'],
        bestSpots: ['Almanarre', 'La Ciotat', 'La Torche', 'Hyères', 'Quiberon'],
        season: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        priceRange: '70–95€/h',
        icon: 'wing'
    },
    {
        id: 'windsurf',
        name: 'Windsurf',
        tagline: "L'école originelle.",
        blurb:
            "Mât, voile, planche, wishbone. Le plus ancien des sports de vent reste le plus pédagogique : on sent la voile, on lit le vent. Slalom, vague, freeride.",
        moniteurs: 94,
        spots: 63,
        windMin: 8,
        windMax: 22,
        windSweet: '12–20 kt',
        beaufort: [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        learnTime: '6–10 h',
        level: 'Débutant accessible',
        gear: ['Voile 4.5–7.5 m²', 'Planche 110–180 L', 'Mât + wishbone', 'Combinaison 4/3'],
        certifs: ['BPJEPS Voile', 'VDWS Surf'],
        bestSpots: ['Almanarre', 'Hourtin', 'Hyères', 'Wissant', 'Gruissan'],
        season: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        priceRange: '45–70€/h',
        icon: 'wind'
    }
];