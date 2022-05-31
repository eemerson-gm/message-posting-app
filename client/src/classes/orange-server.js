
import Cookie from "universal-cookie"
import * as Config from '../config.json'

/**
 * Represents the back-end API server.
 */
export default class Server {

    /**
     * @constructor
     * @config devHost - The development server host (ex. http://localhost:5000)
     * @config proHost - The production server host (ex. https://server.com or \"\")
     */
    constructor() {
        this.config = Config
        this.serverHost = (process.env.NODE_ENV === 'production') ? this.config.proHost : this.config.devHost
        this.cookies = new Cookie()
        this.token = this.cookies.get("token")
        this.isLoggedIn = (typeof this.token === 'string')
    }

    /**
     * Sends and recieves JSON objects from the server.
     * @param {string} api - Api route on server. (ex. /api/messages/get)
     * @param {object} object - The JSON object to be sent.
     * @return {object} The JSON object response from the server.
     */
    async fetchJSON(api, object) {
        var serverRes
        await fetch(this.serverHost + api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object),
        })
        .then(res => res.json())
        .then(data => {
            serverRes = data
        })
        return serverRes
    }

}