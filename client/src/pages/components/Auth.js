import Cookie from "universal-cookie";

export default class Token extends Cookie {

    constructor(props) {
        super(props)
        this.token = this.get("token")
        if(this.token !== undefined)
        {
            console.log("Token: " + this.token.token)
            this.isLoggedIn = (typeof this.token === 'object')
            console.log("Logged in: " + this.isLoggedIn)
        }
    }

    async validateToken() {
        var account;
        await fetch("http://localhost:5000/api/accounts/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.token.token),
        })
        .then(res => res.json())
        .then(data => {
            account = {
                username: data.username,
                email: data.email
            }
        })
        return account
    }

}