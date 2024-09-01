import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from "../../components/Form"
import formCreateProjectData from "../../utils/constants/formCreateProjectData"
import postData from "../../services/postData"
import postFile from "../../services/postFile"

function CreateProject() {

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    async function onSubmit(values, file, formik) {
        setIsLoading(true)
        console.log(values)
        const responsePosDataService = await postData("projects", { ...values, comments: [] })
        const responsePostFileService = await postFile(file, `${responsePosDataService.id}/${file.name}`)
        setIsLoading(false)
        if (responsePosDataService && responsePostFileService) {
            window.alert("Datos guardados")
            navigate('/project')
        }
    }

    return (
        <div className="flex justify-center">
            <div>
                <Form formData={formCreateProjectData} onSubmit={onSubmit} isLoading={isLoading} />
            </div>
        </div>
    )
}

export default CreateProject