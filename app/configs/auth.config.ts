import type {AuthOptions, User} from "next-auth";
import axios from "axios";
import routesAPI from "app/app/const/routes_api";
import Credentials from "next-auth/providers/credentials";
export const authConfig: AuthOptions = {
    secret:process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            credentials: {
                username: {label: 'username', type:"text", required:true},
                password: {label: 'password', type:'password', required:true}
            },
            async authorize(credentials,req) {
                if(!credentials?.password || !credentials?.username) {
                    return null
                }else {
                    const user= axios.post(`${routesAPI.ROUTE}${routesAPI.LOGIN}`, {
                        ...credentials
                    }).then(function (response) {
                        console.log(response.data)
                        const {password, ...userData} = credentials
                        return {id:"1",...userData}
                    }).catch(function (error) {
                        console.log(error.data);
                        throw new Error('I will handle this later!');
                    });
                    return await user as User
                }
            }
        })
    ],
    pages: {
        signIn: '/auths'
    }
}