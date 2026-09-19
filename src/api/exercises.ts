export interface Exercise {
  id: string;
  name: string;
  targetMuscle: string;
  imageUrl?: string;
  videoUrl?: string;
  gifUrl?: string; // Mantido por compatibilidade temporária
  images: string[];
  instructions?: string[];
}

export const BODY_PART_TRANSLATIONS: Record<string, string> = {
  // Categorias originais e V1
  "chest": "Peito",
  "back": "Costas",
  "shoulders": "Ombros",
  "upper arms": "Bíceps/Tríceps",
  "lower arms": "Antebraço",
  "waist": "Abdômen",
  "upper legs": "Coxas",
  "lower legs": "Panturrilhas",
  "cardio": "Cardio",
  "neck": "Pescoço",
  
  // Categorias free-exercise-db e possíveis V2
  "abdominals": "Abdômen",
  "abductors": "Coxas",
  "adductors": "Coxas",
  "biceps": "Bíceps/Tríceps",
  "calves": "Panturrilhas",
  "forearms": "Antebraço",
  "glutes": "Glúteos", 
  "hamstrings": "Coxas",
  "lats": "Costas",
  "lower back": "Costas",
  "middle back": "Costas",
  "quadriceps": "Coxas",
  "traps": "Costas",
  "triceps": "Bíceps/Tríceps"
};

export const MUSCLE_TRANSLATIONS: Record<string, string> = {
  "pectoralis major sternal head": "Peitoral Maior",
  "pectoralis major clavicular head": "Peitoral Superior",
  "anterior deltoid": "Deltóide Frontal",
  "lateral deltoid": "Deltóide Lateral",
  "posterior deltoid": "Deltóide Posterior",
  "triceps brachii": "Tríceps",
  "biceps brachii": "Bíceps",
  "brachialis": "Braquial",
  "brachioradialis": "Braquiorradial",
  "rectus abdominis": "Reto Abdominal",
  "obliques": "Oblíquos",
  "transverse abdominis": "Transverso Abdominal",
  "latissimus dorsi": "Dorsal (Asas)",
  "trapezius": "Trapézio",
  "rhomboids": "Rombóides",
  "erector spinae": "Eretores da Espinha",
  "gluteus maximus": "Glúteo Máximo",
  "gluteus medius": "Glúteo Médio",
  "gluteus minimus": "Glúteo Mínimo",
  "quadriceps": "Quadríceps",
  "rectus femoris": "Reto Femoral",
  "vastus lateralis": "Vasto Lateral",
  "vastus medialis": "Vasto Medial",
  "hamstrings": "Isquiotibiais",
  "biceps femoris": "Bíceps Femoral",
  "semitendinosus": "Semitendíneo",
  "semimembranosus": "Semimembranáceo",
  "gastrocnemius": "Gastrocnêmio (Panturrilha)",
  "soleus": "Sóleo",
  "tensor fasciae latae": "Tensor da Fáscia Lata",
  "iliopsoas": "Iliopsoas",
  "pectineus": "Pectíneo",
  "sartorius": "Sartório",
  "adductor longus": "Adutor Longo",
  "adductor brevis": "Adutor Curto",
  "adductor magnus": "Adutor Magno",
  "gracilis": "Grácil"
};

export const EQUIPMENT_TRANSLATIONS: Record<string, string> = {
  "body weight": "Peso Corporal",
  "barbell": "Barra",
  "dumbbell": "Halter",
  "kettlebell": "Kettlebell",
  "cable": "Polia",
  "machine": "Máquina",
  "leverage machine": "Máquina Articulada",
  "smith machine": "Máquina Smith",
  "band": "Elástico/Band",
  "resistance band": "Faixa Elástica",
  "medicine ball": "Bola Medicinal",
  "stability ball": "Bola Suíça",
  "bosu ball": "Bosu",
  "foam roller": "Rolo de Espuma",
  "ez barbell": "Barra EZ",
  "trap bar": "Barra Hexagonal",
  "rope": "Corda",
  "wheel roller": "Roda Abdominal",
  "step mill": "Escada",
  "elliptical machine": "Elíptico",
  "stationary bike": "Bicicleta Ergométrica",
  "rowing machine": "Remo Seco",
  "sled": "Trenó"
};

export const translateTerm = (term: string, dict: Record<string, string>): string => {
  if (!term) return '';
  const lower = term.toLowerCase().trim();
  if (dict[lower]) return dict[lower];
  return term;
};

const EXERCISE_NAME_TRANSLATIONS: Record<string, string> = {
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
  "chest": "Peito",
  "biceps": "Bíceps",
  "triceps": "Tríceps",
  "shoulder": "Ombro",
  "lat": "Dorsal",
  "front": "Frontal",
  "side": "Lateral",
  "rear": "Posterior",
  "impossible": "Impossível",
  "variation": "Variação",
  "with": "com",
  "on": "no"
};

const translateExerciseName = (name: string): string => {
  if (!name) return '';
  let translated = name.toLowerCase();
  
  const sortedKeys = Object.keys(EXERCISE_NAME_TRANSLATIONS).sort((a, b) => b.length - a.length);

  sortedKeys.forEach((eng) => {
    const pt = EXERCISE_NAME_TRANSLATIONS[eng];
    const regex = new RegExp(`\\b${eng}\\b`, 'gi');
    translated = translated.replace(regex, pt);
  });
  
  return translated.replace(/\b\w/g, char => char.toUpperCase());
};

export const fetchExercises = async (): Promise<Exercise[]> => {
  try {
    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    if (!apiKey || apiKey === 'sua_chave_aqui') {
      console.warn('API Key do RapidAPI não configurada. Configure VITE_RAPIDAPI_KEY no arquivo .env');
      return [];
    }

    const uniqueExercises = new Map<string, any>();
    
    // O plano gratuito (free tier) retorna no máximo 25 itens por página, com total de ~200 itens.
    // Vamos buscar as 8 páginas simultaneamente para carregar o máximo de opções de pernas, costas, etc.
    const offsets = [0, 25, 50, 75, 100, 125, 150, 175];
    const results = [];

    for (const offset of offsets) {
      try {
        const url = `https://edb-with-videos-and-images-by-ascendapi.p.rapidapi.com/api/v1/exercises?limit=25&offset=${offset}`;
        let response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'edb-with-videos-and-images-by-ascendapi.p.rapidapi.com'
          }
        });

        // Se der Rate Limit (429), aguarda 1 segundo e tenta mais uma vez
        if (response.status === 429) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          response = await fetch(url, {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': apiKey,
              'X-RapidAPI-Host': 'edb-with-videos-and-images-by-ascendapi.p.rapidapi.com'
            }
          });
        }

        if (response.ok) {
          const json = await response.json();
          results.push(Array.isArray(json.data) ? json.data : []);
        }
        
        // Pequeno delay entre requests para não sobrecarregar a API gratuita
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (e) {
        console.error(`Erro na página de offset ${offset}:`, e);
      }
    }

    const exercisesArray = results.flat();

    exercisesArray.forEach((item: any) => {
      const id = item.exerciseId || item.id;
      if (!id) return;

      const originalMuscle = (item.bodyParts && item.bodyParts[0]) || item.bodyPart || item.target || 'Geral';
      const translatedMuscle = BODY_PART_TRANSLATIONS[originalMuscle.toLowerCase()] || originalMuscle;
      const translatedName = translateExerciseName(item.name);

      const getMediaUrl = (media: string | undefined, type: 'images' | 'videos') => {
        if (!media) return undefined;
        if (media.startsWith('http')) return media;
        return `https://cdn.exercisedb.dev/media/${type}/${media}`;
      };

      const imageUrl = getMediaUrl(item.imageUrl, 'images') || item.gifUrl;
      const videoUrl = getMediaUrl(item.videoUrl, 'videos');

      if (!uniqueExercises.has(translatedName)) {
        uniqueExercises.set(translatedName, {
          id: id,
          name: translatedName,
          targetMuscle: translatedMuscle,
          imageUrl: imageUrl,
          videoUrl: videoUrl,
          gifUrl: item.gifUrl || imageUrl,
          images: [],
          instructions: item.instructions ? item.instructions.map((i: string) => i.replace(/Step:\s*\d+\s*/gi, '')) : []
        });
      }
    });
    
    return Array.from(uniqueExercises.values());
  } catch (error) {
    console.error('Erro ao buscar exercícios da API:', error);
    return [];
  }
};

export const fetchExerciseDetail = async (id: string): Promise<any> => {
  try {
    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    if (!apiKey || apiKey === 'sua_chave_aqui') return null;

    const url = `https://edb-with-videos-and-images-by-ascendapi.p.rapidapi.com/api/v1/exercises/${id}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'edb-with-videos-and-images-by-ascendapi.p.rapidapi.com'
      }
    });

    if (!response.ok) return null;
    const json = await response.json();
    return json.data || json;
  } catch (error) {
    console.error('Erro ao buscar detalhes do exercício:', error);
    return null;
  }
};

