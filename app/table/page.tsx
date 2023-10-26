"use client"
import {Provider} from "react-redux";
import CrudContainerComponent from "app/app/components/crudContainer.component";
import Store from "app/app/reducers/Store";
import BackgroundTablePageComponent from "../components/3dComponents/BackgroundTablePage.component";
const TablePage = () => {
    return(
        <Provider store={Store}>
            <div className="flex w-full h-full flex-col items-center justify-evenly">
                <CrudContainerComponent/>
                <BackgroundTablePageComponent/>
            </div>
        </Provider>
    )
}
export default TablePage