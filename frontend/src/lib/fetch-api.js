export async function fetchAPI({url="", method="GET", body, headers={}}){
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        ...(body? {body: JSON.stringify(body)} : {})
    };
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    if(!BACKEND_URL){
        console.error("Backend URL is not defined in .env");
        return null
    }
    
    try {
        console.log({options})

        const response = await fetch(`${BACKEND_URL}${url}`, options);

        if (!response.ok) {
            console.error("Error:", data);
            return null
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null
    }
}