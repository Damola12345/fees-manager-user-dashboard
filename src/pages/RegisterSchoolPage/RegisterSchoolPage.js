import './RegisterSchoolPage.css';
import { alertMessage } from "../../GlobalFunctions/GlobalFunctions";
import { Loader } from "../../components/Loader/Loader";
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import BigBtn from '../../components/BigBtn/BigBtn';
import PreviousIcon from '../../components/PreviousIcon/PreviousIcon';
import React from 'react';
import SelectionDropdown from '../../components/SelectionDropdown/SelectionDropdown';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toaster } from 'react-hot-toast';
import { alertError, alertSuccess } from '../../GlobalFunctions/GlobalFunctions';

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const RegsisterSchoolPage = () => {
  const navigate = useNavigate();
  const itemsRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [nextStep, setNextStep] = useState(false);

  const createSchool = (values) => {
    setIsLoading(true);
    const schoolName = values.schoolName;
    const address = values.schoolAddress;
    const level = values.level;
    const password = values.password;
    const classrooms = itemsRef.current.getItems();
    const schInfo = JSON.stringify({ name: schoolName, address, level, password, classrooms });
    
    fetch(`${BACKEND_HOST}/create-school`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: schInfo
    })
    .then((response) => {
      if (response.ok) { 
        response.json().then((message) => {
          alertSuccess(message.success);
          setTimeout(() => {
            setIsLoading(false);
            navigate('/schools');
          }, 2000);
        });
      } else if(response.status === 401) {
        navigate('/login');
      } else {
        response.json().then((message) => {
          setIsLoading(false);
          alertError(message.error);
        })
      }
    })
    .catch((err) => {
      setIsLoading(false);
      alertError(err);
    });
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      schoolName: '',
      schoolAddress: '',
      level: '',
      classrooms: [],
      password: '',
    },
    validationSchema: Yup.object({
      schoolName: Yup.string().required('School name is required')
        .min(5, 'Name must be at least 5 characters')
        .max(100, 'Name must not exceed 100 characters'),
      schoolAddress: Yup.string().required('Address is required')
        .min(5, 'Address must be at least 5 characters')
        .max(100, 'Name must not exceed 100 characters'),
      level: Yup.string().required('A level is required'),
      password: Yup.string().required('Password is required.'),
    }),
    onSubmit: (values) => {
      setNextStep(false);
      setIsLoading(true);
      createSchool(values);
      formik.resetForm();
    },
  })

  return (
    <div className='py-20 px:10 md:px-20'>
      {/* toast message */}
      <Toaster
        containerStyle={{
          position: 'relative'
        }}
      />

      <div className='pl-10 self-start'>
        <PreviousIcon path={-1} />
      </div>
      <div className='flex flex-col items-center mt-10'>
        <h1 className='text-4xl font-bold'>Register School</h1>
        <div>
          <h3></h3>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center gap-5 mt-20 max-w-[650px]"
        >
          <div className='flex flex-col md:flex-row gap:5 md:gap-10 md:justify-between'>
            {/* School Name input */}
            <div className='flex flex-col gap-1'>
              <label htmlFor='schoolName' className='pl-1 flex flex-row gap-1'>
                School Name
                <span className={`text-[red]`}>*</span>
              </label>
              <input
                type='text'
                placeholder='School Name'
                name='schoolName'
                id='schoolName'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.schoolName}
                className='px-5 py-1 xl:w-[300px] outline-[purple] border-[grey] border-[0.5px] border-opacity-90'
              />
              {
                formik.touched.schoolName && formik.errors.schoolName && (
                  <p className='text-sm text-[red]'>
                    {formik.errors.schoolName}
                  </p>
                )
              }
            </div>
            
            {/* School Address input */}
            <div className='flex flex-col gap-1'>
              <label htmlFor='schoolAddress' className='pl-1 flex flex-row gap-1'>
                School Address
                <span className={`text-[red]`}>*</span>
              </label>
              <input
                type='text'
                placeholder='Address'
                name='schoolAddress'
                id='schoolAddress'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.schoolAddress}
                className='px-5 py-1 xl:w-[300px] outline-[purple] border-[grey] border-[0.5px] border-opacity-90'
              />
              {
                formik.touched.schoolAddress && formik.errors.schoolAddress && (
                  <p className='text-sm text-[red]'>
                    {formik.errors.schoolAddress}
                  </p>
                )
              }
            </div>
          </div>
          <div className='flex flex-col self-start gap-1'>
            <label htmlFor='level' className='pl-1 text-sm'>
              Level
              <span className='text-[red] pl-1'>*</span>
            </label>
            <select
              name='level'
              value={formik.values.level}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='px-3 py-2 w-full xl:w-[300px] outline-none border-[grey] border-[0.5px] border-opacity-90 rounded-[5px] text-sm'
            >
              <option value="">Select</option>
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
              <option value="Tertiary">Tertiary</option>
              <option value="Other">Other</option>
            </select>
            {
                formik.touched.level && formik.errors.level && (
                  <p className='text-sm text-[red]'>
                    {formik.errors.level}
                  </p>
                )
              }
          </div>
          <div className='w-full'>
            <p className='pl-1 pb-1 flex flex-row gap-1'>
              Classrooms
              <span className={`text-[red]`}>*</span>
            </p>
            <SelectionDropdown dropdownName="classrooms" custom={true} ref={itemsRef} />
          </div>
          <button onClick={() => {
            const errors = Object.keys(formik.errors);
            errors.length === 1 && errors[0] === 'password' && setNextStep(true);
          }}
            type='submit'
            className={`
              ${isLoading ? 'cursor-wait opacity-70' : 'cursor-pointer'}
              w-full bg-midPurple text-white py-3 rounded-lg mt-10
              `
            }>
            {isLoading ? 'Creating...' : 'Create School'}
          </button>

          {/* Password for authentication */}
          <div className={`fixed w-full h-full bg-black z-[999999999] top-0
            flex items-center justify-center bg-black bg-opacity-40
            ${nextStep ? 'flex' : 'hidden'}`}
          >
            <div className='flex flex-col items-center justify-center w-[350px] h-[250px] bg-white shadow-xl px-10 rounded-lg gap-5'>
              <div className='flex flex-col gap-1'>
                <label htmlFor='password' className='pl-1 flex flex-row gap-1'>
                  Password
                  <span className={`text-[red]`}>*</span>
                </label>
                <input
                  type='text'
                  placeholder='password'
                  name='password'
                  id='password'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className='px-5 py-1 outline-[purple] border-[grey] border-[0.5px] border-opacity-90'
                />
                {
                  formik.touched.password && formik.errors.password && (
                    <p className='text-sm text-[red]'>
                      {formik.errors.password}
                    </p>
                  )
                }
              </div>
              <button
                type='submit'
                className='w-full bg-midPurple py-2 text-white rounded-[5px] text-sm font-bold'
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* { isLoading ? <Loader loadingText={"Creating school..."} /> : createSchForm} */}
    </div>
  )
}

export default RegsisterSchoolPage;


/* const InputElement = ({ title, type, pholder, name, req = true }) => {
    const textInput = 'px-5 py-3 xl:w-[300px] outline-[purple] border-[grey] border-[0.5px] border-opacity-90';
    return(
      <div className='flex flex-col gap-1'>
        <label htmlFor={name} className='pl-1 flex flex-row gap-1'>
          {title}
          <span className={`text-[red] ${req ? 'block' : 'hidden'}`}>*</span>
        </label>
        <input
          type={type}
          placeholder={pholder}
          name={name}
          id={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.schoolName}
          className={`${textInput}`}
        />
        {
          formik.touched[name] && formik.errors[name] && (
            <p className=''>
              {formik.errors[name]}
            </p>
          )
        }
      </div>
    )
  } */
