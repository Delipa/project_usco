const formCreateProjectData = [
    {
        label: "Título del proyecto",
        type: "text",
        id: "projectTitle",
        columnTitle: "Titulo",
        showColumn: true,
        required: true
    },
    {
        label: "Descripción del proyecto",
        type: "text",
        id: "projectDescription",
        showColumn: true,
        required: true
    },
    {
        label: "ID del proyecto",
        type: "text",
        id: "projectId",
        showColumn: true,
        required: true
    },
    {
        label: "ID del estudiante",
        type: "text",
        id: "studentId",
        showColumn: true,
        required: true
    },
    {
        label: "Nombres del estudiante",
        type: "text",
        id: "studentName",
        showColumn: true,
        required: true
    },
    {
        label: "Apellidos del estudiante",
        type: "text",
        id: "studentSurName",
        showColumn: true,
        required: true
    },
    {
        label: "Correo electrónico del estudiante",
        type: "email",
        id: "studentEmail",
        showColumn: true,
        required: true
    },
    {
        label: "Número de celular del estudiante",
        type: "number",
        id: "studentCellphone",
        showColumn: true,
        required: true
    },
    {
        label: "Programa Académico del estudiante",
        type: "text",
        id: "studentProgram",
        showColumn: true,
        required: true
    },
    {
        label: "Nombres del asesor del proyecto",
        type: "text",
        id: "projectAdvisorName",
        showColumn: true,
        required: true
    },
    {
        label: "Apellidos del asesor del proyecto",
        type: "text",
        id: "projectAdvisorSurName",
        showColumn: true,
        required: true
    },
    {
        label: "Facultad",
        type: "text",
        id: "faculty",
        showColumn: true,
        required: true
    },
    {
        label: "Estado del proyecto",
        type: "text",
        id: "projectState",
        showColumn: true,
        required: true
    },
    {
        label: "Archivo del proyecto",
        type: "file",
        id: "projectFile",
        required: true
    }
]

export default formCreateProjectData
