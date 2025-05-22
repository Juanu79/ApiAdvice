import { auth, db } from '../firebaseConfig.js';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const retosMotivacionales = [
  'Levántate a las 5 de la mañana esta semana.',
  'Come saludablemente durante 5 días seguidos.',
  'Realiza 30 minutos de ejercicio cada día.',
  'Escribe 3 cosas por las que estás agradecido cada noche.',
  'Evita redes sociales durante 24 horas.'
];

function obtenerRetoAleatorio() {
  const indice = Math.floor(Math.random() * retosMotivacionales.length);
  return retosMotivacionales[indice];
}

export default function mostrarOriginal() {
  const app = document.getElementById('app');

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      app.innerHTML = '<p>Por favor inicia sesión para ver tus retos.</p>';
      return;
    }

    const uid = user.uid;

    async function mostrarReto() {
      const reto = obtenerRetoAleatorio();

      app.innerHTML = `
        <h2>💪 Reto Motivacional</h2>
        <p style="font-size: 18px; font-weight: bold; margin-bottom: 20px;">${reto}</p>
        <button id="nuevoReto" style="padding: 10px 20px;">Mostrar otro reto</button>
      `;

      // Guardar reto en Firestore con timestamp
      const fecha = new Date().toISOString();
      try {
        await setDoc(doc(db, 'retos', `${uid}_${fecha}`), {
          uid,
          reto,
          fecha
        });

        // Aumentar contador de retos vistos
        const docRef = doc(db, 'usuarios', uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.exists() ? docSnap.data() : {};
        const vistos = (data.retosVistos || 0) + 1;

        await updateDoc(docRef, { retosVistos: vistos });
      } catch (error) {
        console.error('Error al guardar reto:', error);
      }

      document.getElementById('nuevoReto').addEventListener('click', mostrarReto);
    }

    mostrarReto();
  });
}
