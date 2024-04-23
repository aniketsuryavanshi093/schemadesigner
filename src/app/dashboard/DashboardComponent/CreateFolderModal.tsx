import { createFolderAction } from '@/actions/SchemaActions';
import CustomModal from '@/components/Modals/CustomModal'
import enqueSnackBar from '@/utils/enqueSnackBar';
import { newfoldervalidation } from '@/utils/validations/validation';
import { Button } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik'
import React, { useTransition } from 'react'
import { Spinner } from 'reactstrap';

const CreateFolderModal: React.FC<{ onClose: () => void, isOpen: boolean }> = ({ isOpen, onClose }) => {
    const [isPending, startTransition] = useTransition();
    const queryCLient = useQueryClient();
    const handleServerAction = async (value: any) => {
        try {
            const rsposne = await createFolderAction(value)
            onClose()
            enqueSnackBar({ type: "success", message: "Folder created!" })
            queryCLient.invalidateQueries({ queryKey: ['userfolder'] })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <CustomModal size="md" isOpen={isOpen} title="Create New Folder" onClose={onClose} >
            <Formik
                initialValues={{
                    name: "",
                }}
                validationSchema={newfoldervalidation}
                onSubmit={(value) => {
                    startTransition(() => handleServerAction(value))
                }}
            >
                {({ values, errors, handleChange }) => (
                    <Form>
                        <div className='w-full'>
                            <label className="block font-semibold text-sm text-gray-700" htmlFor="name">
                                <span>Folder name</span>
                            </label>
                            <input className="createinput max-w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-gray-300 mt-1 block w-full disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200" id="name" type="text" name='name' onChange={handleChange} value={values.name} ></input>
                        </div>
                        <div className='flex mb-3 items-center gap-3 justify-end w-full'>
                            <Button type="button" onClick={onClose} disabled={isPending} className='mt-3 h-[37px] rounded-md '>
                                Cancel
                            </Button>
                            <Button type='submit' disabled={isPending} className='mt-3 rounded-md newdaigrambtn'>
                                {isPending ? <Spinner size="sm" /> : 'Create Folder'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </CustomModal>
    )
}

export default CreateFolderModal