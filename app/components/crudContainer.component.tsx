import {FetchCrudList, RemoveCrud} from "app/app/reducers/Action";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import CrudItemComponent from "app/app/components/crudItem.component";
import {toast} from "react-toastify";
import AddFormCrudComponent from "app/app/components/addFormCrud.component";
import EditFormComponent from "app/app/components/editForm.component";
const CrudContainerComponent = (props:any) => {
    const [limit, setLimit] = useState<number>(10)
    const [addForm, setAddForm] = useState<boolean>(false)
    const [editForm, setEditForm] = useState<boolean>(false)
    const [editData, setEditData] = useState();
    useEffect(() => {
        setLimit(limit+10)
        props.loadCrud();
    }, [])
    const handleLoadMore = () => {
        setLimit(limit+10)
        props.loadCrud(limit);
    }
    const handleDelete = (id:number) => {
        if (window.confirm('Do you want to remove?')) {
            props.removeCrud(id);
            props.loadCrud(limit);
            toast.success('User removed successfully.')
        }
    }
    return(
        props.crud.loading? <div><h2>Loading...</h2></div>:
            props.crud.errMessage?<div><h2>{props.crud.errMessage}</h2></div>:
                <>
                    <h2 className="text-2xl mt-4 text-white">CRUD Table</h2>
                    <button className="w-[350px] mt-4 h-[50px] p-3 bg-gradient-to-r from-[#abecd6] to-[#fbed96] rounded-full text-2xl flex items-center justify-center shadow-2xl" onClick={() => setAddForm(true)}>Add Crud [+]</button>
                    <table className="mt-8 text-white">
                            <thead className="w-[80%]">
                            <tr className="border-solid border-2">
                                <td className="w-[40px] border-r-2">ID</td>
                                <td className="w-[140px] border-r-2">Name</td>
                                <td className="w-[250px] border-r-2">Email</td>
                                <td className="w-[175px] border-r-2">Phone</td>
                                <td className="w-[285px] border-r-2">Address</td>
                                <td className="w-[95px] border-r-2">Date</td>
                                <td className="w-[95px] border-r-2">Actions</td>
                            </tr>
                            </thead>
                        <tbody>
                            {
                                props.crud.crudList.results && props.crud.crudList.results.map((item:any, id:number) =>
                                    <CrudItemComponent data={item} handleDelete={handleDelete} handleEdit={setEditForm} setEditData={setEditData} key={id++}/>
                                )
                            }
                        </tbody>
                    </table>
                    <button onClick={() => handleLoadMore()} className="w-[250px] h-[45px] rounded-lg bg-amber-100 text-gray-900 mt-3">Load more...</button>
                    {addForm? <AddFormCrudComponent limit={limit} setActive={setAddForm}/>: null}
                    {editForm? <EditFormComponent data={editData} limit={limit} setActive={setEditForm}/>:null}
                </>
    )
}
const mapStateToProps = (state:any) => {
    return {
        crud: state.crud
    }
}
const mapDispatchToProps = (dispatch:any) => {
    return {
        loadCrud: (limit:number) => dispatch(FetchCrudList(limit)),
        removeCrud:(id:number)=>dispatch(RemoveCrud(id))
    }
}
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(CrudContainerComponent);