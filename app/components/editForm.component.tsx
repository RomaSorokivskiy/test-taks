"use client"
import {useState} from "react";
import {FetchCrudList, FunctionAddCrud, FunctionUpdateCrud, RemoveCrud} from "app/app/reducers/Action";
import {connect, useDispatch} from "react-redux";


const EditFormCrudComponent = (props:any) => {
    const [form, setForm] = useState({
        ...props.data,
        birthday_date: new Date().toLocaleDateString('en-ZA', {year:'numeric', month:'2-digit', day:'2-digit'}).replaceAll('/','-')
    })
    const dispatch= useDispatch();
    const handleSubmit = (e:any) => {
        e.preventDefault()
        setForm({...form,})
        // @ts-ignore
        dispatch(FunctionUpdateCrud(form.id,form))
        props.loadCrud(props.limit)
        props.setActive(false)
    }
    return(
        <div>
            <form className="fixed top-[140px] left-[30%] w-[600px] min-h-[500px] flex flex-col justify-evenly items-center bg-gradient-to-r from-[#0acffe] to-[#495aff] rounded-3xl py-8 shadow-2xl" onSubmit={(e) => handleSubmit(e)}>
                <input type="text" placeholder="Tony Stark" className="w-[400px] h-[45px] p-4 rounded-lg shadow-2xl" value={form.name} onChange={(e) => setForm({
                    ...form,
                    name: e.target.value
                })}/>
                <input type="email" placeholder="test@gmail.com" className="w-[400px] h-[45px] p-4 rounded-lg shadow-2xl" value={form.email}  onChange={(e) => setForm({
                    ...form,
                    email: e.target.value
                })}/>
                <input type="text" placeholder="Ukraine, Lviv, Forum" className="w-[400px] h-[45px] p-4 rounded-lg shadow-2xl" value={form.address}  onChange={(e) => setForm({
                    ...form,
                    address: e.target.value
                })}/>
                <input type="tel" placeholder="[+380] (00) (000) (0000)" className="w-[400px] h-[45px] p-4 rounded-lg shadow-2xl" value={form.phone_number}  onChange={(e) => setForm({
                    ...form,
                    phone_number: e.target.value
                })}/>
                <button type="submit" className="w-[200px] p-2 bg-gradient-to-r from-[#20E2D7] to-[#F9FEA5] rounded-2xl text-[#434343] font-bold shadow-xl">Edit</button>
                <button onClick={() => props.setActive(false)} className="w-[200px] p-2 bg-gradient-to-r from-[#ed6ea0] to-[#ec8c69] rounded-2xl font-bold text-[#fff] shadow-xl">Close</button>
            </form>
        </div>
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditFormCrudComponent);