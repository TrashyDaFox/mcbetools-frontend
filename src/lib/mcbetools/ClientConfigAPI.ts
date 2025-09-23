export class clientConfigAPI {
    static parseJSON() {
        try {
            return JSON.parse(localStorage.getItem("CLICONF") ?? "{}");
        } catch {
            return {};
        }
    }

    static setJSON(json: object): void {
        localStorage.setItem("CLICONF", JSON.stringify(json));
    }
    
    static set(key: string, val: string | number | object | string[] | object[] | boolean | null) {
        const json = clientConfigAPI.parseJSON()
        json[key] = val;
        clientConfigAPI.setJSON(json);
    }

    static get(key: string) {
        const json = clientConfigAPI.parseJSON()
        return json[key];
    }
}