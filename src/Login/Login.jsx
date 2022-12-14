import React, { useEffect } from 'react'
import LoginIllustrator from '../img/login-illustrator.svg'
import Logo from '../img/logo.png'
import { CgCardClubs } from 'react-icons/cg';
import { FaLock } from 'react-icons/fa';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getClubs,getCoordinators } from '../firebase/firebase';
import { toast } from 'react-toastify';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import './login.css'

const Login = ({ setIsAdmin ,setCoordinator }) => {
    const [selectedClub, setSelectedClub] = React.useState(0);
    const handleChangeSelectedClub = (event) => {
        setSelectedClub(event.target.value);
    };
   
    const [allClubs, setAllClubs] = React.useState([]);

    const handleGetClubs = async () => {
        const data = await getClubs();
        setAllClubs((pre) => {
            return data;
        })
    }

    useEffect(() => {
        handleGetClubs();
    }, [])


    const [password, setPassword] = React.useState('');
    const handleLogInAdmin = () => {
        if (selectedClub === 0) {
            toast.error("Please Select club")
            return;
        }
        if (password === '') {
            toast.error("Please Enter password")
            return;
        }

        const clubResult = allClubs.filter((clb) => {
            return (clb.club_id === selectedClub && clb.club_password === password)
        })

        if (clubResult?.length) {
            toast.success(`Welcome to ${clubResult[0].club_name}`)
            setCoordinator((pre) => { 
                return false;
            })
            setIsAdmin((pre)=>{
                return true;
            })
        } else {
            toast.error("Wrong Password")
            return;
        }
    }

    const [isCoordinator, setIsCoordinator] = React.useState(true);
    const [selectedUser, setSelectedUser] = React.useState(0);
    const handleChangeSelectedUser = (event) => {
        setSelectedUser(event.target.value);
    };
    const handleLogInUser = () => {
        if (selectedUser === 0) {
            toast.error("Please Select User")
            return;
        }
        if (password === '') {
            toast.error("Please Enter password")
            return;
        }

        const cResult = allCoordinators.filter((c) => {
            return (c.c_id === selectedUser && c.c_password === password)
        })

        if (cResult?.length) {
            toast.success(`Welcome ${cResult[0].c_name}`)
            setCoordinator((pre) => { 
                return true;
            })
            setIsAdmin((pre)=>{
                return true;
            })
        } else {
            toast.error("Wrong Password")
            return;
        }
    }
    const [allCoordinators, setAllCoordinators] = React.useState([]);

    const handleGetCoordinators = async () => {
        const data = await getCoordinators();
        setAllCoordinators((pre) => {
            return data;
        })
       
    }
    useEffect(() => {
        handleGetCoordinators();
    }, [])

    

    return (

        <div className="w-[100%] flex h-[100vh]">
            {/* Login options */}
            <div className='md:w-[40%] w-[100%]  shadow-2xl'>
               
                <div className='mt-[22%] m-auto ml-[15%]'>
                     <FormControlLabel sx={{margin:'auto',alignItems:'center'}} control={<Switch onChange={(()=>{
                        setIsCoordinator((pre)=>{
                            return !pre;
                        })
                        setCoordinator(isCoordinator)
                     })} 
                     />} label={""} /> {isCoordinator===false?'Club Login':'Coordinator Login'}
                </div>

                
                
                {isCoordinator===false?
                // {/* clubs */}
                (<div className='w-[80%] m-auto mt-[12px]'>
                    <div> <img className="h-8 md:h-16 object-cover m-auto" src={Logo} alt="Logo" /> </div>
                    <div className='text-center mt-5 font-bold'>Login into your account</div>
                    <div className='w-[80%] m-auto mt-[22px] flex'>
                        <FormControl variant="standard" sx={{ width: '100%', background: '#e3e5e8', outline: 'none', border: 'none' }} >
                            {/* <InputLabel id="select-club-input"   sx={{width:'100%',outline:'none',border:'none'}}>Select Club</InputLabel> */}
                            <Select
                                labelId="select-club-input"
                                id="select-club-input-id"
                                value={selectedClub}
                                label="Select Club"
                                placeholder='Select Club'

                                disableUnderline
                                sx={{ height: '48px', background: '#e3e5e8', padding: '0px 6px' }}
                                onChange={handleChangeSelectedClub}
                            >
                                <MenuItem value={0}>Select Club</MenuItem>
                                {allClubs.map((c) => {
                                    return (
                                        <MenuItem key={c.id} value={c.club_id}>{c.club_name}</MenuItem>
                                    )
                                })}


                            </Select>
                        </FormControl>
                        <div className='h-[48px] w-[48px] bg-[#1E2772] rounded-tr rounded-br'> <CgCardClubs style={{ color: 'white', fontSize: '2rem', margin: 'auto', marginTop: '6px' }} /> </div>
                    </div>




                    {/* password input */}
                    <div className='w-[80%] m-auto mt-[22px] flex' password>
                        <FormControl variant="standard" sx={{ width: '100%', height: '48px', background: '#F1F3F6', outline: 'none', border: 'none' }} >
                            {/* <InputLabel id="select-club-input"   sx={{width:'100%',outline:'none',border:'none'}}>Select Club</InputLabel> */}

                            <TextField InputProps={{ disableUnderline: true }} sx={{ height: 40, background: '#F1F3F6' }} id="filled-basic" label="Password" variant="filled" size="small" background="#F1F3F6" value={password} onChange={((e) => { setPassword(e.target.value) })} />
                        </FormControl>
                        <div className='h-[48px] w-[48px] bg-[#1E2772] rounded-tr rounded-br'> <FaLock style={{ color: 'white', fontSize: '1.5rem', margin: 'auto', marginTop: '10px' }} /> </div>
                    </div>



                    {/* login button */}
                    <div className='w-[80%] m-auto mt-[22px]'>
                        <Button className='login-button' sx={{ background: '#1E2772', color: 'white', width: '100%' }} onClick={handleLogInAdmin} >Log In</Button>
                    </div>



                    {/* forgot password */}
                    <div className='text-center mt-5 cursor-pointer'>Forgot password</div>
                </div>):

                // {/* Coordinator */}
                <div className='w-[80%] m-auto mt-[12px]'>
                    <div> <img className="h-8 md:h-16 object-cover m-auto" src={Logo} alt="Logo" /> </div>
                    <div className='text-center mt-5 font-bold'>Login into your account</div>
                    <div className='w-[80%] m-auto mt-[22px] flex'>
                        <FormControl variant="standard" sx={{ width: '100%', background: '#e3e5e8', outline: 'none', border: 'none' }} >
                            {/* <InputLabel id="select-club-input"   sx={{width:'100%',outline:'none',border:'none'}}>Select Club</InputLabel> */}
                            <Select
                                labelId="select-club-input"
                                id="select-club-input-id"
                                value={selectedUser}
                                label="Select Club"
                                placeholder='Select Club'

                                disableUnderline
                                sx={{ height: '48px', background: '#e3e5e8', padding: '0px 6px' }}
                                onChange={handleChangeSelectedUser}
                            >
                                <MenuItem value={0}>Select Your Name</MenuItem>
                                {allCoordinators.map((c) => {
                                    return (
                                        <MenuItem key={c.c_id} value={c.c_id}>{c.c_name}</MenuItem>
                                    )
                                })}


                            </Select>
                        </FormControl>
                        <div className='h-[48px] w-[48px] bg-[#1E2772] rounded-tr rounded-br'> <CgCardClubs style={{ color: 'white', fontSize: '2rem', margin: 'auto', marginTop: '6px' }} /> </div>
                    </div>




                    {/* password input */}
                    <div className='w-[80%] m-auto mt-[22px] flex' password>
                        <FormControl variant="standard" sx={{ width: '100%', height: '48px', background: '#F1F3F6', outline: 'none', border: 'none' }} >
                            {/* <InputLabel id="select-club-input"   sx={{width:'100%',outline:'none',border:'none'}}>Select Club</InputLabel> */}

                            <TextField InputProps={{ disableUnderline: true }} sx={{ height: 40, background: '#F1F3F6' }} id="filled-basic" label="Password" variant="filled" size="small" background="#F1F3F6" value={password} onChange={((e) => { setPassword(e.target.value) })} />
                        </FormControl>
                        <div className='h-[48px] w-[48px] bg-[#1E2772] rounded-tr rounded-br'> <FaLock style={{ color: 'white', fontSize: '1.5rem', margin: 'auto', marginTop: '10px' }} /> </div>
                    </div>



                    {/* login button */}
                    <div className='w-[80%] m-auto mt-[22px]'>
                        <Button className='login-button' sx={{ background: '#1E2772', color: 'white', width: '100%' }} onClick={handleLogInUser} >Log In</Button>
                    </div>



                    {/* forgot password */}
                    <div className='text-center mt-5 cursor-pointer'>Forgot password</div>
                </div>

                }

                




            </div>
             




            {/* Asset */}
            <div className='md:w-[60%] w-[0%] md:visible invisible'>
                <img className=" items-center justify-center h-[70%] w-[70%] m-auto mr-[10%] mt-[15%]" src={LoginIllustrator} alt="" ></img>

            </div>
        </div>
    )
}

export default Login





