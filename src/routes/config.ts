const isLCE = import.meta.env.VITE_LCE === 'true';

export default {
    productName: isLCE ? "LegacyTools" : "MCBETools",
    apiEndpoint: import.meta.env.DEV
        ? (isLCE ? "http://localhost:3001/mclce" : "http://localhost:3001")
        : (isLCE ? "https://mcbetools.com/api/mclce" : "https://mcbetools.com/api"),
    get isLCE() {
        return isLCE;
    }
}