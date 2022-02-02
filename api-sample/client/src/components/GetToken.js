import React, {useState} from "react";
import {fetchToken} from "../api/index";

const GetToken = () => {
    const [token, setToken] = useState("");

    const createToken = () => {
        try {
                fetchToken().then(res => {
                    console.log("token data", res.data);
                    setToken(res.data);
                })
        } catch (error) {
            console.log(error.message);
        }
    };
    
    return (
    <div>
        <button type="submit" onClick={() => createToken()}>{"Get token"}</button> <br/>
        {(token)? token:<div>{""}</div>}
    </div>
    )
}

export default GetToken;