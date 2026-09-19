export interface Exercise {
  id: string;
  name: string;
  targetMuscle: string;
  gifUrl: string; 
  images: string[];
  instructions?: string[];
}



export const BODY_PART_TRANSLATIONS: Record<string, string> = {
  "chest": "Peito",
  "back": "Costas",
  "shoulders": "Ombros",
  "upper arms": "Bíceps/Tríceps",
  "lower arms": "Antebraço",
  "waist": "Abdômen",
  "upper legs": "Coxas",
  "lower legs": "Panturrilhas",
  "cardio": "Cardio",
  "neck": "Pescoço"
};

const EXERCISE_NAME_TRANSLATIONS: Record<string, string> = {
  // Movimentos Específicos (Maior prioridade)
  "bench press": "Supino",
  "leg press": "Leg Press",
  "deadlift": "Levantamento Terra",
  "push-up": "Flexão",
  "pull-up": "Barra Fixa",
  "pull up": "Barra Fixa",
  "calf raise": "Elevação de Panturrilha",
  "leg curl": "Flexão de Perna",
  "leg extension": "Extensão de Perna",
  "upward facing dog": "Cachorro Olhando para Cima",
  "cross-over": "Crossover",
  "pulldown": "Puxada",
  
  // Equipamentos e Modificadores
  "barbell": "com Barra",
  "dumbbell": "com Halter",
  "cable": "na Polia",
  "lever": "na Máquina",
  "smith": "no Smith",
  "band": "com Elástico",
  "kettlebell": "com Kettlebell",
  "body weight": "com Peso Corporal",
  "assisted": "Assistido",
  "weighted": "com Peso",
  "machine": "na Máquina",

  // Posições e Pegadas
  "seated": "Sentado",
  "standing": "em Pé",
  "lying": "Deitado",
  "incline": "Inclinado",
  "decline": "Declinado",
  "reverse": "Inverso",
  "alternating": "Alternado",
  "single leg": "Unilateral (Perna)",
  "one leg": "Unilateral",
  "one arm": "Unilateral",
  "single arm": "Unilateral",
  "wide grip": "Pegada Aberta",
  "close grip": "Pegada Fechada",
  "underhand": "Pegada Supinada",
  "overhand": "Pegada Pronada",
  "neutral grip": "Pegada Neutra",

  // Movimentos Básicos
  "press": "Desenvolvimento",
  "fly": "Crucifixo",
  "curl": "Rosca",
  "extension": "Extensão",
  "squat": "Agachamento",
  "row": "Remada",
  "crunch": "Abdominal",
  "raise": "Elevação",
  "lunge": "Avanço",
  "kickback": "Coice",
  "shrug": "Encolhimento",
  "dips": "Mergulho",
  "dip": "Mergulho",
  "kick": "Chute",
  "step-up": "Subida no Banco",

  // Anatomia comum nos nomes
  "chest": "Peito",
  "biceps": "Bíceps",
  "triceps": "Tríceps",
  "shoulder": "Ombro",
  "lat": "Dorsal",
  "front": "Frontal",
  "side": "Lateral",
  "rear": "Posterior",

  // Adicionais
  "impossible": "Impossível",
  "variation": "Variação",
  "with": "com",
  "on": "no"
};

const translateExerciseName = (name: string): string => {
  let translated = name.toLowerCase();
  
  // Sort keys by length descending to match longest phrases first (e.g. "bench press" before "press")
  const sortedKeys = Object.keys(EXERCISE_NAME_TRANSLATIONS).sort((a, b) => b.length - a.length);

  sortedKeys.forEach((eng) => {
    const pt = EXERCISE_NAME_TRANSLATIONS[eng];
    // Use regex to replace whole words only, case-insensitive
    const regex = new RegExp(`\\b${eng}\\b`, 'gi');
    translated = translated.replace(regex, pt);
  });
  
  // Capitalize first letter of each word
  return translated.replace(/\b\w/g, char => char.toUpperCase());
};

export const fetchExercises = async (): Promise<Exercise[]> => {
  try {
    const url = 'https://oss.exercisedb.dev/api/v1/exercises?limit=2000';
    const response = await fetch(url);
    if (!response.ok) throw new Error('Falha na resposta da API');
    
    const json = await response.json();
    const exercisesArray = Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []);
    
    const uniqueExercises = new Map<string, any>();

    exercisesArray.forEach((item: any) => {
      // 1. Ensure gifUrl exists and is not empty
      if (!item.gifUrl || item.gifUrl.trim() === '') return;
      
      const originalMuscle = item.bodyParts?.[0] || item.target || 'Geral';
      const translatedMuscle = BODY_PART_TRANSLATIONS[originalMuscle.toLowerCase()] || originalMuscle;
      const translatedName = translateExerciseName(item.name);

      // 2. Prevent duplicates by ID, preserving variations that might share the same translated name
      const uid = item.exerciseId || item.id;
      if (uid && !uniqueExercises.has(uid)) {
        uniqueExercises.set(uid, {
          id: uid,
          name: translatedName,
          targetMuscle: translatedMuscle,
          gifUrl: item.gifUrl,
          images: [],
          instructions: item.instructions ? item.instructions.map((i: string) => i.replace(/Step:\s*\d+\s*/gi, '')) : []
        });
      }
    });
    
    return Array.from(uniqueExercises.values());
  } catch (error) {
    console.error('Erro ao buscar exercícios da API:', error);
    return []; // Return empty list on failure so mocks don't show up
  }
};
