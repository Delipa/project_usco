import { useState } from 'react';
import { useFormik } from 'formik';

function Form({ formData = [], onSubmit = {}, isLoading = false, submitButtonText = "Crear" }) {

    const [file, setFile] = useState(null)

    const formik = useFormik({
        initialValues: getInitialValues(),
        onSubmit: values => {
            onSubmit(values, file, formik)
        },
    });

    function getInitialValues() {
        const initialValues = {}
        formData.forEach((data) => {
            initialValues[data.id] = data.defaultValue ?? ""
        }
        )
        return initialValues
    }

    function getInput(element) {
        switch (element.type) {
            case "textarea":
                return (
                    <textarea
                        id={element.id}
                        name={element.id}
                        onChange={formik.handleChange}
                        value={formik.values[element.id]}
                        required={element.required}
                        className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                );

            case "file":
                return (
                    <input
                        id={element.id}
                        name={element.id}
                        type={element.type}
                        onChange={(event) => {
                            setFile(event.currentTarget.files[0]);
                            formik.setFieldValue(element.id, event.currentTarget.files[0].name);
                        }}
                        required={element.required}
                        className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                );

            default:
                return (
                    <input
                        id={element.id}
                        name={element.id}
                        type={element.type}
                        onChange={formik.handleChange}
                        value={formik.values[element.id]}
                        required={element.required}
                        className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                );
        }
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                {
                    formData.map((element) =>
                        <div className="sm:col-span-6" key={element.id}>
                            <label htmlFor={element.id} className="block text-sm font-medium leading-6 text-gray-900">
                                {element.label}
                            </label>
                            <div className="mt-2">
                                {getInput(element)}
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="my-12 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-secondary shadow-sm hover:bg-secondary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                    {isLoading ? "Cargando..." : submitButtonText}
                </button>
            </div>
        </form>
    )
}

export default Form