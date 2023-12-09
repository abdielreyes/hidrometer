import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { BASE_URL } from "../utils/variables"
import { toast } from 'react-toastify';
function FeedbackForm() {
    const { handleSubmit, control, reset } = useForm();

    const onSubmit = async (data) => {
        // Aquí puedes manejar la lógica para enviar la retroalimentación
        try {

            console.log(data);
            const response = await axios.post(`${BASE_URL}/api/feedback`, data);
            console.log(response)
            const d = response.data;
            toast.success(d.message)
            reset();
        } catch (error) {
            console.error(error)
            toast.error(error.response.data.message)
        }

    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-4/5 lg:w-2/6 mx-auto ">
            <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="feedback">
                    Retroalimentación
                </label>
                <Controller
                    name="feedback"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <textarea
                            {...field}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            rows="4"
                            placeholder="Escribe tus comentarios aquí..."
                        />
                    )}
                />
            </div>
            <div className="mb-4">
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Enviar Retroalimentación
                </button>
            </div>
        </form>
    )
}

export default FeedbackForm