import {Iplanta} from './iplanta';


export const PLANTES_DEMO: Iplanta[] = [
    {
        id: 1,
        created_at: Date.now(),
        nom: 'Planta 1',
        ubicacio: { latitude: 41.3851, longitude: 2.1734 },
        capacitat: 100,
        user: 'User 1',
        foto: 'fotoPlanta1.png'
    },
    {
        id: 2,
        created_at: Date.now(),
        nom: 'Planta 2',
        ubicacio: { latitude: 39.4699, longitude: -0.3763 },
        capacitat: 200,
        user: 'User 1',
        foto: 'fotoPlanta2.png'
    },
    {
        id: 3,
        created_at: Date.now(),
        nom: 'Planta 3',
        ubicacio: { latitude: 40.4168, longitude: -3.7038 },
        capacitat: 300,
        user: 'User 1',
        foto: 'fotoPlanta3.png'
    }
];