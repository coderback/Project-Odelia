// Centralized element configuration for all four ATLA elements

export type ElementType = 'water' | 'fire' | 'earth' | 'air' | 'all';

export interface Choice {
  id: string;
  label: string;
  reflection: string[];
}

export interface ElementConfig {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };
  gradient: string;
  lore: string[];
  riddle: {
    question: string;
    choices: Choice[];
  };
  particles: {
    type: 'droplet' | 'ember' | 'rock' | 'wind';
    count: number;
  };
  symbol: {
    svg: string; // SVG path data
    color: string;
  };
}

export const ELEMENTS: Record<Exclude<ElementType, 'all'>, ElementConfig> = {
  water: {
    name: 'Water',
    colors: {
      primary: '#38bdf8',
      secondary: '#2dd4bf',
      accent: '#0ea5e9',
      text: 'text-water-700',
    },
    gradient: 'water-gradient',
    lore: [
      "Water is the element of change.",
      "",
      "The people of the Water Tribes",
      "are capable of adapting to many things.",
      "",
      "They have a sense of community and love",
      "that holds them together through anything."
    ],
    riddle: {
      question: "What virtue does water teach us above all?",
      choices: [
        {
          id: 'adaptability',
          label: 'Adaptability',
          reflection: [
            "Yes, water flows around all obstacles.",
            "",
            "Like water, love adapts and finds its way.",
            "It changes form but never loses its essence.",
            "It nourishes all it touches."
          ]
        },
        {
          id: 'strength',
          label: 'Strength',
          reflection: [
            "Water's strength is undeniable.",
            "",
            "But its greatest power comes from yielding.",
            "The softest water carves the hardest stone,",
            "not through force, but through persistence and time."
          ]
        },
        {
          id: 'healing',
          label: 'Healing',
          reflection: [
            "Indeed, water restores what is broken.",
            "",
            "Love, like water, has the power to heal.",
            "It washes away pain, renews hope,",
            "and brings life to the barren places of the heart."
          ]
        }
      ]
    },
    particles: {
      type: 'droplet',
      count: 15,
    },
    symbol: {
      svg: 'M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z',
      color: '#38bdf8',
    }
  },

  fire: {
    name: 'Fire',
    colors: {
      primary: '#f97316',
      secondary: '#fb923c',
      accent: '#ea580c',
      text: 'text-fire-700',
    },
    gradient: 'fire-gradient',
    lore: [
      "Fire is the element of power.",
      "",
      "The people of the Fire Nation",
      "have desire and will,",
      "",
      "and the energy and drive",
      "to achieve what they want."
    ],
    riddle: {
      question: "What gift does fire offer to those brave enough to embrace it?",
      choices: [
        {
          id: 'passion',
          label: 'Passion',
          reflection: [
            "Yes, fire ignites the soul with purpose.",
            "",
            "True passion burns eternal, driving us forward.",
            "It transforms ordinary moments into memories",
            "that warm us long after the flame has dimmed."
          ]
        },
        {
          id: 'courage',
          label: 'Courage',
          reflection: [
            "Fire demands courage to wield.",
            "",
            "To love is to risk being burned,",
            "yet the brave embrace the flame regardless.",
            "For without risk, there can be no warmth."
          ]
        },
        {
          id: 'transformation',
          label: 'Transformation',
          reflection: [
            "Indeed, fire transforms all it touches.",
            "",
            "Like the phoenix, love rises from ashes.",
            "What was once impossible becomes reality",
            "when the heart burns bright enough."
          ]
        }
      ]
    },
    particles: {
      type: 'ember',
      count: 20,
    },
    symbol: {
      svg: 'M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z',
      color: '#f97316',
    }
  },

  earth: {
    name: 'Earth',
    colors: {
      primary: '#10b981',
      secondary: '#34d399',
      accent: '#059669',
      text: 'text-earth-700',
    },
    gradient: 'earth-gradient',
    lore: [
      "Earth is the element of substance.",
      "",
      "The people of the Earth Kingdom",
      "are diverse and strong.",
      "",
      "They are persistent and enduring."
    ],
    riddle: {
      question: "What strength does earth provide that all else depends upon?",
      choices: [
        {
          id: 'loyalty',
          label: 'Loyalty',
          reflection: [
            "Yes, earth stands unmoved through storms.",
            "",
            "True loyalty is the bedrock of love,",
            "weathering every trial without wavering.",
            "It creates a foundation that time cannot erode."
          ]
        },
        {
          id: 'growth',
          label: 'Growth',
          reflection: [
            "From earth, all life springs forth.",
            "",
            "Love, like a seed, needs stable ground.",
            "With patience and care, it grows into something",
            "magnificent that reaches toward the sky."
          ]
        },
        {
          id: 'endurance',
          label: 'Endurance',
          reflection: [
            "Indeed, earth endures eternally.",
            "",
            "Mountains may erode, but the stone remains.",
            "Love that endures through hardship",
            "is the strongest force in all the world."
          ]
        }
      ]
    },
    particles: {
      type: 'rock',
      count: 12,
    },
    symbol: {
      svg: 'M12 2L2 12h4v8h12v-8h4L12 2z',
      color: '#10b981',
    }
  },

  air: {
    name: 'Air',
    colors: {
      primary: '#facc15',
      secondary: '#38bdf8',
      accent: '#eab308',
      text: 'text-air-700',
    },
    gradient: 'air-gradient',
    lore: [
      "Air is the element of freedom.",
      "",
      "The Air Nomads detached themselves",
      "from worldly concerns",
      "and found peace and freedom.",
      "",
      "Also, they apparently had",
      "pretty good senses of humor."
    ],
    riddle: {
      question: "", // Air stage is the transition, no riddle
      choices: []
    },
    particles: {
      type: 'wind',
      count: 18,
    },
    symbol: {
      svg: 'M12 2C8 2 4 6 4 10c0 2 1 4 3 5l5 7 5-7c2-1 3-3 3-5 0-4-4-8-8-8z',
      color: '#facc15',
    }
  }
};

// Utility functions

export const getElementConfig = (element: ElementType): ElementConfig | null => {
  if (element === 'all') return null;
  return ELEMENTS[element];
};

export const getElementGradient = (element: ElementType): string => {
  if (element === 'all') return 'avatar-gradient';
  const config = getElementConfig(element);
  return config ? config.gradient : 'water-gradient';
};

export const getElementTextColor = (element: ElementType): string => {
  if (element === 'all') return 'text-water-700';
  const config = getElementConfig(element);
  return config ? config.colors.text : 'text-water-700';
};

export const getElementPrimaryColor = (element: ElementType): string => {
  if (element === 'all') return '#38bdf8';
  const config = getElementConfig(element);
  return config ? config.colors.primary : '#38bdf8';
};

export const getElementSecondaryColor = (element: ElementType): string => {
  if (element === 'all') return '#2dd4bf';
  const config = getElementConfig(element);
  return config ? config.colors.secondary : '#2dd4bf';
};
