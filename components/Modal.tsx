"use client"

import React, { FormEvent, Fragment } from 'react'

import { useState } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import Image from 'next/image'
import { addUserEmailToProduct } from '@/lib/actions'

interface Props {
    productId: string
}

const Modal = ({productId} : Props) => {
    let [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setisSubmitting] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setisSubmitting(true);
        await addUserEmailToProduct(productId, email);
        setisSubmitting(false)
        setEmail('')
        closeModal()
    }

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false)

  return (
    <>
        <button 
            type="button" 
            className='btn'
            onClick={openModal}
        >
            Track
        </button>
        <Transition show={isOpen}>
            <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" />
                </TransitionChild>
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel>
                    <div className="dialog-content">
                        <div className='flex flex-col'>
                            <div className='flex justify-between'>
                                <div className='p-3 border border-gray-200 rounded-10'>
                                    <Image 
                                      src="/assets/icons/logo.svg"
                                      alt="logo"
                                      width={28}
                                      height={28}
                                      />
                                </div>
                                <Image 
                                  src="/assets/icons/x-close.svg"
                                  alt="close"
                                  width={24}
                                  height={24}
                                  className="cursor-pointer"
                                  onClick={closeModal}
                                />
                            </div>
                            <h4 className="dialog-head_text">
                              Stay updated with product pricing alerts right in your inbox!
                            </h4>
                            <p className="text-sm text-gray-600 mt-2">
                                Never miss a bargain again with our timely alerts!
                            </p>
                        </div>

                        {/* from */}

                        <form className='flex flex-col mt-5' onSubmit={handleSubmit}>
                            <label htmlFor="email" className='text-sm font-medium text-gray-700'>
                                Email address
                            </label>
                            <div className='dialog-input_container'>
                                <Image
                                    src="/assets/icons/mail.svg"
                                    alt='mail'
                                    width={18}
                                    height={18}
                                />

                                <input 
                                    type="email" 
                                    required
                                    id='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter your email address'
                                    className='dialog-input'
                                />

                            </div>
                            <button type='submit' className='dialog-btn'>
                                {isSubmitting ? 'Submitting...' : 'Track'}
                            </button>
                        </form>

                    </div>
                    </DialogPanel>
                    </div>
                </TransitionChild>
            </Dialog>
        </Transition>
    </>
  )
}

export default Modal
