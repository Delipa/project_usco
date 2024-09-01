import { useEffect, useState } from 'react';
import getDocument from '../../services/getDocument';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import formCreateProjectData from '../../utils/constants/formCreateProjectData';
import Form from '../../components/Form';
import updateDocument from '../../services/updateDocument';
import getFile from '../../services/getFile';
import deleteDocument from '../../services/deleteDocument';
import postFile from '../../services/postFile';

function DetailProject() {
    const [comments, setComments] = useState([])
    const [urlDownoload, setUrlDownoload] = useState("")
    const [formData, setFormData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getInitialData()
    }, []);

    async function getInitialData() {
        const response = await getDocument("projects", id)
        setComments(response?.comments ?? [])
        const dataToForm = formCreateProjectData.map((element) => ({
            ...element,
            defaultValue: response[element.id] ?? "",
            required: false
        }))
        dataToForm.push({
            label: "Comentario nuevo",
            type: "textarea",
            id: "comments",
            showColumn: false,
            required: false
        })
        setFormData(dataToForm)
        const url = await getFile(`${id}/${response.projectFile}`)
        setUrlDownoload(url)
        setIsLoading(false)
    }

    async function onSubmit(values, file, formik) {
        setIsLoading(true)
        const todayDate = new Date();
        const formattedDate = todayDate.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
        const newComments = [{
            name: "Usuario",
            date: formattedDate,
            text: values.comments
        }, ...comments]
        const newData = {
            ...values,
            comments: values.comments != "" ? newComments : comments
        }
        setComments(newData.comments)
        const responseUpdateDocument = await updateDocument("projects", id, newData)
        var responsePostFileService = true
        if (file != null) {
            responsePostFileService = await postFile(file, `${id}/${file.name}`)
        }
        if (responseUpdateDocument && responsePostFileService) {
            window.alert("Datos actualizados")
            navigate('/project')
        }
        setIsLoading(false)
    }

    async function onPressDeleteProyect() {
        setIsLoading(true)
        const response = await deleteDocument("projects", id)
        if (response) {
            window.alert("Proyecto eliminado")
            navigate('/project')
        }
        setIsLoading(false)
    }

    function openFileUrl() {
        window.open(urlDownoload, '_blank');
    }

    return (
        <div className="flex justify-center">
            {formData != null ? (
                <div className='mb-10'>
                    <Form formData={formData} onSubmit={onSubmit} isLoading={isLoading} submitButtonText='Actualizar' />
                    <div>
                        {comments.map((comment, index) => (
                            <article key={index} className="flex max-w-xl flex-col items-start justify-between my-10 pb-5 border-b border-gray-300 my-4">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time dateTime={comment.date} className="text-gray-500">
                                        {comment.date}
                                    </time>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                        <span className="absolute inset-0" />
                                        {comment.name}
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600"> {comment.text}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                    <div className="my-12 flex items-center justify-end gap-x-6">
                        <button
                            type="button"
                            onClick={
                                () => { openFileUrl() }
                            }
                            className="text-sm font-semibold leading-6 text-gray-900">
                            Abirir archivo
                        </button>
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={
                                () => { onPressDeleteProyect() }
                            }
                            className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-secondary shadow-sm hover:bg-secondary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            {isLoading ? "Cargando..." : "Eliminar proyecto"}
                        </button>
                    </div>
                </div>
            ) :
                <h1>Cargando...</h1>
            }
        </div>
    )
}

export default DetailProject