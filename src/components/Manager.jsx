import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordsRef = useRef()
    const [passwordArray, setpasswordArray] = useState([])
    const [form, setform] = useState({ site: "", username: "", password: "" })

    const getPasswords = async() => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setpasswordArray(passwords)
    }
    useEffect(() => {
        getPasswords()
    }, [])

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast("Copy to Clipboard!")
    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = async() => {
        if(form.site.length >3 && form.username.length >3 &&form.password.length >3){
            await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: form.id})})


            setpasswordArray([...passwordArray, {...form, id: uuidv4()}])
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
            // console.log([...passwordArray, form])
             await fetch("http://localhost:3000/", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...form, id : uuidv4()})})
            setform({ site: "", username: "", password: "" })
            toast('Password saved!');
    }
    else{
        toast('Error: Password not saved!');
    }   
    }
    const deletePassword = async(id) => {
        console.log("deleting password with id", id)
        let c = confirm("Do you really want to delete this password?")
        if(c){
            setpasswordArray(passwordArray.filter(item=>item.id!==id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id))) 
            let res = await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify(id)})

            
            toast('Password Deleted!',{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            }
            )
        }
    }
    const editPassword = (id) => {
        console.log("editing password with id", id) 
        setform({...passwordArray.filter(i=>i.id===id)[0],id: id}) 
        setPasswordArray(passwordArray.filter(item=>item.id!==id)) 
    }

    const showPassword = () => {
        passwordsRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("/eyecross.png")) {
            ref.current.src = "/eye.png"
            passwordsRef.current.type = "text"
        }
        else {
            ref.current.src = "/eyecross.png"
            passwordsRef.current.type = "password"
        }

    }
    return (
        <>
            <div className=" p-3 md:mycontainer min-h-[88.2vh]">
                <h1 className=' text-center  text-4xl font-bold'>
                    <span className=' text-green-500'>&lt;</span>
                    <span>Pass</span>
                    <span className=' text-green-500'>OP/&gt;</span>
                </h1>
                <p className=' text-green-900  text-lg  text-center'>Your Own Password manager</p>

                <div className=' flex gap-3 flex-col items-center p-4'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-400 w-full  text-black p-4 py-1 ' name="site" type=" text" id='site' />
                    <div className="flex flex-col md:flex-row  w-full gap-8 justify-between ">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-400 w-full  text-black p-4 py-1 ' type=" text" name="username" id='username'/>
                        <div className="relative">
                            <input ref={passwordsRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-400 w-full  text-black p-4 py-1 ' type="password" id='password' name="password" />
                            <span className='absolute right-[7px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={25} src="/eye.png" alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex border-2 border-green-900 hover:bg-green-300 justify-center items-center w-fit bg-green-400 rounded-full gap-2 px-6 py-2'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>Save Password</button>

                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4 '>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 &&

                        <table className="table-auto w-full rounded-xl overflow-hidden mb-10">
                            <thead className=' bg-green-800  text-white'>
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Action</th>

                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index} >
                                        <td className=" py-2 border border-white text-center">
                                            <div className='flex items-center justify-center lordiconcopy ' onClick={() => { copyText(item.site) }}>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='cursor-pointer size-7'>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=" items-center py-2 border border-white text-center  ">
                                            <div className='flex items-center justify-center lordiconcopy ' onClick={() => { copyText(item.username) }}>
                                                <a href={item.username} target='_blank'>{item.username}</a>
                                                <div className='cursor-pointer size-7'>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=" py-2 border border-white text-center">
                                            <div className='flex items-center justify-center lordiconcopy ' onClick={() => { copyText(item.password) }}>
                                                <a href={item.password} target='_blank'>{item.password}</a>
                                                <div className='cursor-pointer size-7'>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=" py-2 border border-white text-center">
                                            <div className='flex items-center justify-center lordiconcopy ' >
                                                <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>

                                                <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon></span>
                                            </div>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>}
                    <div>
            <ToastContainer />
                    </div>
                </div>
            </div>


        </>

    )
}


export default Manager
