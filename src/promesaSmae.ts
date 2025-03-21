//Documentacion de programa.:Nombre: Armenta Fuentes Lobsang Leonardo

/**
 *  Se importa el interface con el nombre de Smae.
 */
import { Smae } from './interface/interfSmae';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from "firebase/database";

const firebaseConfig = {

    apiKey: "AIzaSyCAWdu9X-k0hbQOnPEcsyWgEGsnZAMkS7Y",
    authDomain: "smaedatos.firebaseapp.com",
    databaseURL: "https://smaedatos-default-rtdb.firebaseio.com",
    projectId: "smaedatos",
    storageBucket: "smaedatos.firebasestorage.app",
    messagingSenderId: "970845369642",
    appId: "1:970845369642:web:5e09cc1304510f2788da53",
    measurementId: "G-82Y8VF30B7"
};
/**
 * Aqui se va a inicializar la base del firebase
 */
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbsmea = ref(database);

/**
 * Esto almacena los datos de alimentos en forma de objetos.
 */
const Alimentos: { Alimento: string}[] = [];
//const Cantidad: { Cantidad: string}[] = [];
//const AzucarPorEquivalenteG: {AzucarPorEquivalenteG: string}[] = [];

/**
 * Aqui se obtiene todos los alimentos del archivo JSON y los almacena en el array Alimentos.
 * @returns- Un array de objetos con los alimentos.
 * 
 * La funcion realiza una peticion asíncrona para obtener los datos y los almacena en el array global.
 * En caso de error va a devolver un array vacio.
 */
export async function obtenerDatosSmae(): Promise<{ Alimento: string }[]> {
    try {
        /**
         * Obtiene los datos de Firebase usando el SDK
         */
        const snapshot = await get(child(dbsmea, '/'));
        
        if (snapshot.exists()) {
            const data: Smae[] = snapshot.val();
            Alimentos.length = 0;
            data.forEach(espe => {
                Alimentos
                    .push({ Alimento: espe.Alimento});
            });
            
            return Alimentos;
        } else {
            console.log("No hay datos disponibles");
            return [];
        }
    } catch (error) {
        console.error('Error', error);
        return [];
    }
}

/**
 * Busca y retorna los alimentos que pertenecen a una categoria especifica.
 * @param {string} categoria - El nombre de la categoria a buscar.
 * @returns - Un array de objetos con los alimentos de la categoria.
 * 
 * Esta funcion filtra los alimentos segun la categoria proporcionada en el JSON.
 * Se asegura de que la busqueda no distinga entre mayusculas y minusculas.
 */
export async function buscarPorCategoria(categoria: string): Promise<{ Alimento: string }[]> {
    try {
        /**
         * Obtiene los datos de Firebase usando el SDK.
         */
        const snapshot = await get(child(dbsmea, '/'));
        
        if (snapshot.exists()) {
            const data: Smae[] = snapshot.val();
            const alimentosUnicos = new Set<string>();
            
            data.forEach(espe => {
                if (espe.Categoría.toLowerCase() === categoria.toLowerCase()) {
                    alimentosUnicos.add(espe.Alimento);
                }
            });
            
            return Array.from(alimentosUnicos)
                .map(alimento => ({ Alimento: alimento }));
        } else {
            console.log("No hay datos disponibles para esta categoría");
            return [];
        }
    } catch (error) {
        console.error('Error', error);
        return [];
    }
}

/**
 * Busca y retorna los alimentos cuyo nombre contenga una cadena especifica.
 * La busqueda no es sensible a mayusculas y minusculas.
 * 
 * @param {string} nombre - El nombre del alimento a buscar.
 * @returns - Un array de objetos con los alimentos encontrados.
 * 
 * Utiliza la funcion filter para buscar coincidencias en los nombres de los alimentos
 * y devuelve solo aquellos que contengan la cadena especificada.
 */
export async function buscarAlimento(nombre: string): Promise<{ Alimento: string }[]> {
    try {
        /**
         * Obtiene los datos de Firebase usando el SDK.
         */
        const snapshot = await get(child(dbsmea, '/'));
        
        if (snapshot.exists()) {
            const data: Smae[] = snapshot.val();
            
            return data
                .filter(espe => espe.Alimento.toLowerCase()
                .includes(nombre.toLowerCase()))
                .map(espe => ({ 
                    Alimento: espe.Alimento,
                    //Cantidad: espe.Cantidad
                }));
        } else {
            console.log("No hay datos disponibles para este alimento");
            return [];
        }
    } catch (error) {
        console.error('Error', error);
        return [];
    }
}

/**
 *  Se ejecuta la funcion obtenerDatosSmae 
 * y muestra todos los alimentos en la consola.
 */
    //obtenerDatosSmae().then(() => console.log("Todos los Alimentos:", Alimentos));

/**
 *  Se ejecuta la funcion buscarPorCategoria 
 * y muestra los alimentos de una categoria especifica en la consola.
 */
    // buscarPorCategoria("Leche entera").then(resultado =>
    //     console.log("Categoría:", resultado));

/**
 *  Se ejecuta la funcion buscarAlimento 
 * y muestra los alimentos que contienen un nombre especifico en la consola.
 */
    // buscarAlimento("fruta").then(resultado =>
    //     console.log("Alimento en específico:", resultado));