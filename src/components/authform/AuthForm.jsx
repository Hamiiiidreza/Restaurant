import React, { useContext, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserByEmail, createUser } from '@/Utils/Fetchs';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import containerContext from '@/Context/containerContext';
import { v4 as uuidv4 } from 'uuid';
import swal from 'sweetalert';

export default function AuthForm() {
    const queryClient = useQueryClient();
    const contextData = useContext(containerContext);
    console.log(contextData);
    const [rememberMe, setRememberMe] = useState(false);
    const [showPasswordLogin, setShowPasswordLogin] = useState(false);
    const [showPasswordSignup, setShowPasswordSignup] = useState(false);

    const navigate = useNavigate();

    const { register: registerLogin, handleSubmit: handleSubmitLogin, formState: { errors: errorsLogin } } = useForm({
        defaultValues: {
            email: Cookies.get('rememberedEmail') || "",
            password: Cookies.get('rememberedPassword') || "",
        },
    });

    const { register: registerSignup, handleSubmit: handleSubmitSignup, formState: { errors: errorsSignup } } = useForm({
        defaultValues: {
            email: "",
            password: "",
            username: "",
            phone: ""
        },
    });

    const registerMutation = useMutation({
        mutationFn: async (userData) => {
            const existingusers = await getUserByEmail(userData.email);
            if (existingusers.length > 0) throw new Error('Email_Exists');
            return createUser(userData);
        },
        onSuccess: (data) => {
            swal({
                title: 'ثبت نام موفق!',
                text: 'شما با موفقیت ثبت نام کردید',
                icon: 'success',
                confirmButtonText: 'باشه'
            }).then(() => contextData.login(data, data.token));
            queryClient.invalidateQueries(['cart', data.id]);
        },
        onError: (error) => {
            swal({
                title: 'خطا!',
                text: error.message === 'Email_Exists'
                    ? 'این ایمیل قبلا ثبت شده است!'
                    : 'مشکلی در ثبت نام پیش آمده است',
                icon: 'error',
                confirmButtonText: 'باشه'
            });
        }
    });
    //const newUserInfos = async (data) => {

    //    const existingUserResponse = await
    //        fetch(`http://localhost:4000/users?email=${data.email}`);
    //    const existingUser = await
    //        existingUserResponse.json();

    //    if (existingUser.length > 0) {
    //        return swal({
    //            title: 'خطا!',
    //            text: 'این ایمیل قبلا ثبت نام شده است.',
    //            icon: 'error',
    //            confirmButtonText: 'باشه'
    //        });
    //    };

    //    const response = await
    //        fetch('http://localhost:4000/users', {
    //            method: 'POST',
    //            headers: {
    //                'Content-Type': 'application/json',
    //            },
    //            body: JSON.stringify({
    //                username: data.username,
    //                email: data.email,
    //                password: data.password,
    //                token: crypto.randomUUID(),
    //            }),
    //        });
    //    if (response.ok) {
    //        const result = await response.json();
    //        console.log('User registered:', result);
    //        const token = crypto.randomUUID();
    //        Cookies.set('authToken', token, { expires: 7 });
    //        swal({
    //            title: 'ثبت نام موفق!',
    //            text: 'شما با موفقیت ثبت نام کردید',
    //            icon: 'success',
    //            confirmButtonText: 'باشه'
    //        }).then(() => {
    //            navigate('/my-account')
    //        });
    //    } else {
    //        const errorResponse = await response.json();
    //        swal({
    //            title: 'خطا!',
    //            text: errorResponse.message,
    //            icon: 'error',
    //            confirmButtonText: 'باشه'
    //        });
    //    }
    //};

    const loginMutation = useMutation({
        mutationFn: ({ email, password }) =>
            getUserByEmail(email).then(users => {
                const user = users.find(u => u.email === email);
                if (!user) throw new Error('user_not_found');
                if (user.password !== password) throw new Error('Wrong_password');
                return user;
            }),
        onSuccess: (user) => {
            if (rememberMe) {
                Cookies.set('rememberedEmail', user.email, { expires: 7 });
                Cookies.set('rememberedPassword', user.password, { expires: 7 });
            } else {
                Cookies.remove('rememberedEmail');
                Cookies.remove('rememberedPassword');
            }
            contextData.login(user, user.token);
        },
        onError: (error) => {
            if (error.message.includes('user_not_found')) {
                swal({
                    title: "خطا!",
                    text: "کاربری با این ایمیل یافت نشد,لطفا ابتدا ثبت نام کنید.",
                    icon: "error",
                });
            } else if (error.message.includes('Wrong_password')) {
                swal({
                    title: "خطا!",
                    text: "رمز عبور اشتباه است",
                    icon: "error",
                });
            }
        }
    });
    //const handleLoginSubmit = async (data) => {
    //    const usersResponse = await fetch(
    //        `http://localhost:4000/users?email=${data.email}`
    //    );
    //    const users = await usersResponse.json();
    //    const existingUser = users.find((user) => user.email === data.email);
    //
    //    if (existingUser) {
    //        if (existingUser.password === data.password) {
    //            contextData.login(existingUser, existingUser.token)
    //            if (rememberMe) {
    //                Cookies.set('rememberedEmail', data.email, { expires: 7 });
    //                Cookies.set('rememberedPassword', data.password, { expires: 7 });
    //            } else {
    //                Cookies.remove('rememberedEmail');
    //                Cookies.remove('rememberedPassword');
    //            }
    //        } else {
    //            swal({
    //                title: "خطا!",
    //                text: "رمز عبور اشتباه است",
    //                icon: "error",
    //            });
    //        }
    //    } else {
    //        swal({
    //            title: "خطا!",
    //            text: "کاربری با این ایمیل یافت نشد,لطفا ابتدا ثبت نام کنید.",
    //            icon: "error",
    //        });
    //    }
    //};

    const handleSignupSubmit = (data) => {
        registerMutation.mutate({
            ...data,
            token: crypto.randomUUID()
        });
    };

    const handleLoginSubmit = (data) => {
        loginMutation.mutate(data);
    };

    const togglePasswordLoginVzibility = () => {
        setShowPasswordLogin(!showPasswordLogin);
    };
    const togglePasswordSignupVzibility = () => {
        setShowPasswordSignup(!showPasswordSignup);
    };

    const handleCheckboxChange = (e) => {
        setRememberMe(e.target.checked);
    };

    useEffect(() => {
        const rememberedEmail = Cookies.get('rememberedEmail');
        const rememberedPassword = Cookies.get('rememberedPassword');
        if (rememberedEmail && rememberedPassword) {
            setRememberMe(true);
            registerLogin('email', { value: rememberedEmail });
            registerLogin('password', { value: rememberedPassword });
            setRememberMe(true);
        } else {
            setRememberMe(false);
        }
    }, []);

    return (
        <div className='authform mt-[130px] mb-[100px]'>
            <div className="container">
                <div className="authform-wrap flex items-start">
                    <div className="authform-right w-1/2 pl-3">
                        <div className='account-box py-[52px] px-9 rounded-[10px] mb-[30px] bg-[#151B20]'>
                            <h4 className='text-[22px] text-white font-bold mb-5'>ورود</h4>
                            <form action="#" onSubmit={handleSubmitLogin(handleLoginSubmit)}>
                                <div className='mb-5'>
                                    <label htmlFor="email" className='block text-white font-bold mb-[10px]'>ایمیل</label>
                                    <input
                                        type="email"
                                        {...registerLogin("email", {
                                            required: "وارد کردن ایمیل اجباری می باشد",
                                            minLength: {
                                                value: 10,
                                                message: "ایمیل حداقل باید 10 کاراکتر داشته باشد"
                                            },
                                            maxLength: {
                                                value: 30,
                                                message: "ایمیل حداکثر باید 30 کاراکتر داشته باشد"
                                            },
                                            pattern: {
                                                value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g,
                                                message: "🔴لطفاً ایمیل خود را به صورت example@domain.com وارد کنید.",
                                            },
                                        })}
                                        id="email"
                                        className='w-full h-[52px] py-3 px-[15px] bg-[#0E1317] outline-none border-none text-base text-[#736565]'
                                    />
                                    {errorsLogin.email && <p className='text-red-500'>{errorsLogin.email.message}</p>}
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="password" className='block text-white font-bold mb-[10px]'>رمز عبور*</label>
                                    <div className='relative flex items-center'>
                                        <input
                                            type={showPasswordLogin ? 'text' : 'password'}
                                            {...registerLogin("password", {
                                                required: "وارد کردن پسورد اجباری می باشد",
                                                minLength: {
                                                    value: 8,
                                                    message: "پسورد حداقل باید 8 کاراکتر داشته باشد"
                                                },
                                                maxLength: {
                                                    value: 15,
                                                    message: "پسورد حداکثر باید 15 کاراکتر داشته باشد"
                                                },
                                                pattern: {
                                                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g,
                                                    message: "🔴 **پسورد باید شامل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک نماد ویژه باشد!**",
                                                },
                                            })}
                                            id="password"
                                            className='w-full h-[52px] py-3 px-[15px] bg-[#0E1317] outline-none border-none text-base text-[#736565]'
                                        />
                                        <span className='absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer'
                                            onClick={togglePasswordLoginVzibility}
                                        >
                                            {showPasswordLogin ? <FaEyeSlash className='text-white' /> : <FaEye className='text-white' />}
                                        </span>
                                    </div>
                                    {errorsLogin.password && <p className='text-red-500'>{errorsLogin.password.message}</p>}
                                </div>
                                <div className='flex items-center justify-between mb-[25px]'>
                                    <div className='checkbox'>
                                        <input
                                            type="checkbox"
                                            id="test2"
                                            className='hidden'
                                            checked={rememberMe}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label htmlFor="test2" className={`relative text-base text-white font-bold cursor-pointer pr-[33px] before:absolute before:content-[""] before:appearence-none before:bg-transparent before:rounded-[1px] before:border before:border-solid before:border-[#D9D8D8] before:size-5 before:cursor-pointer before:ml-[5px] before:right-0 before:top-[2px] after:absolute after:content-[""] after:top-[7px] after:right-[5px] after:size-2.5 after:rounded-[2px] after:border-none ${rememberMe ? 'after:bg-orange-250' : 'after:bg-transparent'}`}>
                                            مرا به خاطر بسپار
                                        </label>
                                    </div>
                                    <button type='submit' className='relative text-white font-semibold after:absolute after:content-[""] after:bottom-[-3px] after:right-0 after:w-0 after:h-[1px] after:transition-all after:duration-300 after:ease-in after:hover:w-full after:bg-white'>
                                        رمز عبور خود را فراموش کردید؟
                                    </button>
                                </div>
                                <button type='submit' className='btn relative text-white font-bold bg-orange-250 before:absolute before:content-[""] before:top-[-5%] before:right-[-5%] before:w-[0%] before:h-[110%] before:-z-10 before:rounded-[5px] before:skew-x-[-15deg] before:overflow-hidden before:transition-all before:duration-300 before:ease-in before:hover:bg-[#732701] before:hover:w-[110%] py-[15px] px-[32px] z-10 leading-none overflow-hidden rounded-[50px] transition-all ease-in'
                                >
                                    ورود
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="authform-left w-1/2 pr-3">
                        <div className='account-box py-[52px] px-9 rounded-[10px] mb-[30px] bg-[#151B20]'>
                            <h4 className='text-[22px] text-white font-bold mb-5'>ثبت نام</h4>
                            <form action="#" onSubmit={handleSubmitSignup(handleSignupSubmit)}>
                                <div className='mb-5'>
                                    <label htmlFor="username" className='block text-white font-bold mb-[10px]'>نام کاربری*</label>
                                    <input
                                        type="text"
                                        {...registerSignup("username", {
                                            required: "وارد کردن نام کاربری اجباری می باشد",
                                            minLength: {
                                                value: 3,
                                                message: "نام کاربری حداقل باید 3 کاراکتر داشته باشد"
                                            },
                                            maxLength: {
                                                value: 20,
                                                message: "نام کاربری حداکثر باید 15 کاراکتر داشته باشد"
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z0-9_\-\u0600-\u06FF]{3,15}$/,
                                                message: "🔴 **نام کاربری باید شامل حروف کوچک، اعداد، خط زیر و خط تیره باشد!**"
                                            },
                                        })}
                                        id="username"
                                        className='w-full h-[52px] py-3 px-[15px] bg-[#0E1317] outline-none border-none text-base text-[#736565]'
                                    />
                                    {errorsSignup.username && <p className='text-red-500'>{errorsSignup.username.message}</p>}
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="email" className='block text-white font-bold mb-[10px]'>ایمیل</label>
                                    <input
                                        type="email"
                                        {...registerSignup("email", {
                                            required: "وارد کردن ایمیل اجباری می باشد",
                                            minLength: {
                                                value: 10,
                                                message: "ایمیل حداقل باید 10 کاراکتر داشته باشد"
                                            },
                                            maxLength: {
                                                value: 30,
                                                message: "ایمیل حداکثر باید 30 کاراکتر داشته باشد"
                                            },
                                            pattern: {
                                                value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                                                message: "🔴لطفاً ایمیل خود را به صورت example@domain.com وارد کنید.",
                                            },
                                        })}
                                        id="email"
                                        className='w-full h-[52px] py-3 px-[15px] bg-[#0E1317] outline-none border-none text-base text-[#736565]'
                                    />
                                    {errorsSignup.email && <p className='text-red-500'>{errorsSignup.email.message}</p>}
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="password" className='block text-white font-bold mb-[10px]'>رمز عبور*</label>
                                    <div className='relative flex items-center'>
                                        <input
                                            type={showPasswordSignup ? 'text' : 'password'}
                                            {...registerSignup("password", {
                                                required: "وارد کردن پسورد اجباری می باشد",
                                                minLength: {
                                                    value: 8,
                                                    message: "پسورد حداقل باید 8 کاراکتر داشته باشد"
                                                },
                                                maxLength: {
                                                    value: 15,
                                                    message: "پسورد حداکثر باید 15 کاراکتر داشته باشد"
                                                },
                                                pattern: {
                                                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                                                    message: "🔴 **پسورد باید شامل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک نماد ویژه باشد!**",
                                                },
                                            })}
                                            id="password"
                                            className='w-full h-[52px] py-3 px-[15px] bg-[#0E1317] outline-none border-none text-base text-[#736565]'
                                        />
                                        <span className='absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer'
                                            onClick={togglePasswordSignupVzibility}
                                        >
                                            {showPasswordSignup ? <FaEyeSlash className='text-white' /> : <FaEye className='text-white' />}
                                        </span>
                                    </div>
                                    {errorsSignup.password && <p className='text-red-500'>{errorsSignup.password.message}</p>}
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="phone" className='block text-white font-bold mb-[10px]'> تلفن همراه*</label>
                                    <input
                                        type="tel"
                                        {...registerSignup("phone", {
                                            required: "وارد کردن تلفن همراه اجباری می باشد",
                                            pattern: {
                                                value: /^09\d{9}$/,
                                                message: "🔴 **شماره تلفن معتبر نیست!**"
                                            },
                                        })}
                                        id="phone"
                                        className='w-full h-[52px] py-3 px-[15px] bg-[#0E1317] outline-none border-none text-base text-[#736565]'
                                    />
                                    {errorsSignup.phone && <p className='text-red-500'>{errorsSignup.phone.message}</p>}
                                </div>
                                <button type='submit' className='btn relative text-white font-bold bg-orange-250 before:absolute before:content-[""] before:top-[-5%] before:right-[-5%] before:w-[0%] before:h-[110%] before:-z-10 before:rounded-[5px] before:skew-x-[-15deg] before:overflow-hidden before:transition-all before:duration-300 before:ease-in before:hover:bg-[#732701] before:hover:w-[110%] py-[15px] px-[32px] z-10 leading-none overflow-hidden rounded-[50px] transition-all ease-in'
                                >
                                    ثبت نام
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
