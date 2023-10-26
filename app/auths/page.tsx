import AuthFormComponent from "app/app/components/authForm.component";
import {Suspense} from "react";
import BackgroundFormAuthPageComponent from "app/app/components/3dComponents/BackgroundFormAuthPage.component";
export default async function AuthPage() {
    return(
        <div className="w-full h-[100vh] flex justify-center items-center">
            <div className="flex h-[75vh]">
                <Suspense>
                    <BackgroundFormAuthPageComponent/>
                </Suspense>
                <AuthFormComponent/>
            </div>
        </div>
    )
}