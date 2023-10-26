import BackgroundMainPageComponent from "app/app/components/3dComponents/BackgroundMainPage.component"
import {Suspense} from "react";
import Link from "next/link";
export default function Home() {
  return (
      <>
          <div className="z-0 bg-transparent w-full flex justify-center items-center">
              <div className="w-[75%] p-[25px] bg-opacity-100 bg-gradient-to-r from-[#4facfe]/50 to-[#00f2fe]/50 rounded-lg mt-8 text-[#eee]">
                  <h1>Test task, manipulation with data of API</h1>
                  <ul>
                      <h2>Quick guide:</h2>
                      <li>
                          <ul>
                              <p>Authorization:</p>
                              <li>
                                  <p>A little about Form component</p>
                                  <p>So as u can see we have a single route <a>/auth</a>. Form automatically change a status, depends what u need, register or login.</p>
                                  <p>(Some more about register, it's just none working template, and ya i can create a fully working auth methods for back-end, with all validation, and JWT-Tokens, and hook up it for template)</p>
                              </li>
                              <p>Table:</p>
                              <li>
                                  <p>Table is simple and visually comfortable for eay. U have what you need for work with data(edit,add,delete,comment,votes), page loader, etc</p>
                                  <p></p>
                              </li>
                              <p>And yup, it all done in my own style, with some animations and features :)</p>
                          </ul>
                      </li>
                  </ul>
                  <Link href="/auths" className="w-[265px] flex justify-center items-center p-[15px] bg-gradient-to-r from-[#89f7fe] to-[#66a6ff] rounded-lg text-[#485563] mt-2 mb-2">Start logging account</Link>
                  <p>*All 3d models, not mine, license and etc i have, thank for all designers*</p>
              </div>
          </div>
          <Suspense>
              <BackgroundMainPageComponent/>
          </Suspense>
      </>
  )
}
