import firestore from '@react-native-firebase/firestore';

const generators = [
  {
    nombre: 'Generador 1',
    descripcion: 'Descripción del Generador 1',
    imagen: 'https://example.com/image1.jpg',
  },
  {
    nombre: 'Generador 2',
    descripcion: 'Descripción del Generador 2',
    imagen: 'https://example.com/image2.jpg',
  },
  {
    nombre: 'Generador 3',
    descripcion: 'Descripción del Generador 3',
    imagen: 'https://example.com/image2.jpg',
  },
  {
    nombre: 'Generador 4',
    descripcion: 'Descripción del Generador 4',
    imagen: 'https://example.com/image2.jpg',
  },
  {
    nombre: 'Generador 5',
    descripcion: 'Descripción del Generador 5',
    imagen: 'https://example.com/image2.jpg',
  },
  {
    nombre: 'Generador 6',
    descripcion: 'Descripción del Generador 6',
    imagen: 'https://example.com/image2.jpg',
  },
  {
    nombre: 'Generador 7',
    descripcion: 'Descripción del Generador 7',
    imagen: 'https://example.com/image2.jpg',
  },
];

export const seedDatabase = async () => {
  const batch = firestore().batch();

  generators.forEach(generator => {
    const docRef = firestore().collection('generadores').doc();
    batch.set(docRef, generator);
  });

  try {
    await batch.commit();
    console.log('Datos insertados correctamente');
  } catch (error) {
    console.error('Error insertando datos: ', error);
  }
};

seedDatabase();
