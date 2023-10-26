import {AiFillEdit} from "react-icons/ai"
import {ImBin2} from "react-icons/im"
const CrudItemComponent = (props:any) => {
    return(
        <>
            <tr>
                <td className="border-solid border-2">{props.data.id}</td>
                <td className="border-solid border-2">{props.data.name}</td>
                <td className="border-solid border-2">{props.data.email}</td>
                <td className="border-solid border-2">{props.data.phone_number}</td>
                <td className="border-solid border-2">{props.data.address}</td>
                <td className="border-solid border-2">{props.data.birthday_date}</td>
                <td className="border-solid border-2 px-6 text-xl">
                    <button className="btn btn-primary text-sky-600 " onClick={() => {
                        props.setEditData(props.data)
                        props.handleEdit(true)
                    }}><AiFillEdit/></button>|
                    <button onClick={() => props.handleDelete(props.data.id) } className="btn btn-danger text-red-500"> <ImBin2/></button>
                </td>
            </tr>
        </>
    )
}
export default CrudItemComponent;