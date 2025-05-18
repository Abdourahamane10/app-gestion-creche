export default function getServeurAPI() {
    const serveurAPI = import.meta.env.VITE_APP_SERV;
    return serveurAPI;
}