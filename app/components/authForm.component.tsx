'use client'
import type {FormEventHandler} from "react";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import {useState} from "react";


const AuthFormComponent = () => {
    const router = useRouter();
    const [errorHandler, setErrorHandler] = useState<string>("")
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const res = await signIn("credentials", {
            username: formData.get("username"),
            password: formData.get("password"),
            redirect: false,
        });
        if (res && !res.error) {
            router.push("/table");
        } else {
            setErrorHandler("Sorry, please check you`r password or username")
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-[400px] bg-gradient-to-r from-[#2b5876]/75 to-[#4e4376]/75 flex flex-col justify-evenly py-12 items-center rounded-tr-2xl rounded-br-2xl">
            <input name="username" type="text" placeholder="Enter a login" required className="w-[75%] h-[45px] border-none bg-[#dfe9f3] rounded-lg p-[15px]" />
            <input type="password" name="password" placeholder="*******" required className="w-[75%] h-[45px] border-none bg-[#dfe9f3] rounded-lg p-[15px] " />
            <button type="submit" className="w-[250px] bg-blue-300 p-4 rounded-lg text-lg">Sign In</button>
            {errorHandler === ""? null: <label className="text-red-700">{errorHandler}</label>}
        </form>
    );
}
export default AuthFormComponent;