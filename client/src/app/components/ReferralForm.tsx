'use client';

import { Formik, Form, Field } from 'formik';
import useSWR, { mutate } from 'swr';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid'
import axios from 'axios';

const fetcher = (...args) => fetch(...args).then(res => res.json())

interface Referral {
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  address: {
    homeName: string;
    street: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
  };
}

const PersonalDetails = ({ values }) => (
  <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-8'>
    <div className='flex flex-col mb-4 lg:mb-0'>
      <label
        className='text-sm text-gray-400 uppercase'
        htmlFor="personalDetails.firstName">
          Given Name:
      </label>
      <Field
        name="personalDetails.firstName"
        className="p-2 text-lg border border-gray-300 rounded-sm"
        type="text" />
    </div>

    <div className='flex flex-col mb-4 lg:mb-0'>
      <label
        className='text-sm text-gray-400 uppercase'
        htmlFor="personalDetails.lastName">
          Surname:
        </label>
      <Field
        name="personalDetails.lastName"
        className="p-2 text-lg border border-gray-300 rounded-sm"
        type="text" />
    </div>

    <div className='flex flex-col mb-4 lg:mb-0'>
      <label
        className='text-sm text-gray-400 uppercase'
        htmlFor="personalDetails.email">
          Email:
      </label>
      <Field
        name="personalDetails.email"
        className="p-2 text-lg border border-gray-300 rounded-sm"
        type="email" />
    </div>

    <div className='flex flex-col mb-4 lg:mb-0'>
      <label
        className='text-sm text-gray-400 uppercase'
        htmlFor="personalDetails.phone">
          Phone:
      </label>
      <Field
        name="personalDetails.phone"
        className="p-2 text-lg border border-gray-300 rounded-sm"
        type="tel" />
    </div>
  </div>
);

const AddressDetails = ({ values }) => (
  <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-8'>
    <div className='flex flex-col mb-4 lg:mb-0'>
      <label
        className='text-sm text-gray-400 uppercase'
        htmlFor="address.homeName">
          Home Name or #:
      </label>
      <Field
        name="address.homeName"
        className="p-2 text-lg border border-gray-300 rounded-sm"
        type="text" />
    </div>

    <div className='flex flex-col mb-4 lg:mb-0'>
      <label
        className='text-sm text-gray-400 uppercase'
        htmlFor="address.street">
          Street:
        </label>
      <Field
        name="address.street"
        className="p-2 text-lg border border-gray-300 rounded-sm"
        type="text" />
    </div>

    <div className='flex flex-col mb-4 lg:mb-0'>
      <label
        className='text-sm text-gray-400 uppercase'
        htmlFor="address.suburb">
          Suburb:
        </label>
      <Field
        name="address.suburb"
        className="p-2 text-lg border border-gray-300 rounded-sm"
        type="text" />
    </div>

    <div className='flex flex-col mb-4 lg:mb-0'>
      <label
        className='text-sm text-gray-400 uppercase'
        htmlFor="address.state">
          State:
      </label>
      <Field
        name="address.state"
        className="p-2 text-lg border border-gray-300 rounded-sm"
        type="text" />
    </div>

    <div className='flex flex-col mb-4 lg:mb-0'>
      <label
        className='text-sm text-gray-400 uppercase'
        htmlFor="address.postcode">
          Postcode:
      </label>
      <Field
        name="address.postcode"
        className="p-2 text-lg border border-gray-300 rounded-sm"
        type="text" />
    </div>

    <div className='flex flex-col mb-4 lg:mb-0'>
      <label
        className='text-sm text-gray-400 uppercase'
        htmlFor="address.country">
          Country:
      </label>
      <Field
        name="address.country"
        className="p-2 text-lg border border-gray-300 rounded-sm"
        type="text" />
    </div>
  </div>
);

const ReferralForm = () => {
  const { data, isLoading } = useSWR('http://localhost:5000/api/referrals', fetcher)

  const handleDelete = (email: string) => {
    axios.delete(`http://localhost:5000/api/referrals/delete/${email}`)
    .then((response) => {
      console.log(response)
      mutate('http://localhost:5000/api/referrals')
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const handleSubmit = (values: Referral, resetForm: () => void) => {
    axios.post('http://localhost:5000/api/referrals/create', values)
    .then((response) => {
      console.log(response)
      mutate('http://localhost:5000/api/referrals')
      resetForm()
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 rounded-md border border-gray-300'>
      <div className='p-10 bg-white rounded-md'>
        <h1 className='text-3xl font-bold'>Referral Builder</h1>
        <Formik
          initialValues={{
            personalDetails : {
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
            },
            address: {
              homeName: '',
              street: '',
              suburb: '',
              state: '',
              postcode: '',
              country: '',
            }
          }}
          onSubmit={(values, {resetForm}) => {
            handleSubmit(values, resetForm)
          }}
        >
          {({ values }) => (
            <Form>
              <h2 className='text-gray-400 uppercase font-bold pb-2'>Personal Details</h2>
              <div className='w-full h-[1px] mb-6 bg-gray-300'/>
              <PersonalDetails values={values} />

              <h2 className='text-gray-400 uppercase font-bold pb-2 mt-6'>Address</h2>
              <div className='w-full h-[1px] mb-6 bg-gray-300'/>
              <AddressDetails values={values} />

              <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-8 mt-8'>
                <button
                  type='button'
                  className='flex-grow border border-gray-300 shadow-btn text-gray-400 uppercase font-bold py-4 mb-4 lg:mb-0 rounded'>
                    Upload Avatar
                </button>
                <button
                  type='submit'
                  className='flex-grow bg-green-500 shadow-btn text-white uppercase font-bold py-4 rounded'>
                    Create Referral
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className='px-5 py-20 bg-[#f5f5f5]'>
        <div className='bg-white rounded-md h-full py-10 px-4'>
          {data?.users.length > 0 && !isLoading && (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border-b border-gray-300">
                <thead>
                  <tr>
                    <th className="border-b border-gray-300 py-4 text-gray-400 text-left uppercase font-bold">Given Name</th>
                    <th className="border-b border-gray-300 py-4 text-gray-400 text-left uppercase font-bold">Surname</th>
                    <th className="border-b border-gray-300 py-4 text-gray-400 text-left uppercase font-bold">Email</th>
                    <th className="border-b border-gray-300 py-4 text-gray-400 text-left uppercase font-bold">Phone</th>
                    <th className="border-b border-gray-300 py-4 text-gray-400 text-left uppercase font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map((user: Referral, index: number) => (
                    <tr key={index} className="border-b">
                      <td className="border-b border-gray-300 py-4 text-gray-400">{user.personalDetails.firstName}</td>
                      <td className="border-b border-gray-300 py-4 text-gray-400">{user.personalDetails.lastName}</td>
                      <td className="border-b border-gray-300 py-4 text-gray-400">{user.personalDetails.email}</td>
                      <td className="border-b border-gray-300 py-4 text-gray-400">{user.personalDetails.phone}</td>
                      <td className="flex gap-2 border-b border-gray-300 py-4 text-gray-400">
                        <PencilIcon className="h-5 w-5 text-gray-400" />
                        <TrashIcon
                          onClick={() => handleDelete(user.personalDetails.email)}
                          className="h-5 w-5 text-gray-400 cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {data?.users.length === 0 && !isLoading && <p className='flex justify-center items-center font-bold h-full'>No referrals found</p>}
          {isLoading && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default ReferralForm;