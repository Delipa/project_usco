import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridActionsCellItem, GridToolbarFilterButton } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import getCollection from '../../services/getCollection';
import formCreateProjectData from '../../utils/constants/formCreateProjectData';
import deleteDocument from '../../services/deleteDocument';

function Projects() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        getInitialData()
    }, []);

    async function getInitialData() {
        const response = await getCollection("projects")
        setIsLoading(false)
        setData(response)
    }

    function onPressEdit(id) {
        navigate(`edit/${id}`)
    }

    async function onPressDelete(id) {
        setIsLoading(true)
        const response = await deleteDocument("projects", id)
        setIsLoading(false)
        if (response) {
            const newData = data.filter(project => project.id != id)
            setData(newData)
            window.alert("Proyecto eliminado")
        }
    }

    function getColumns() {
        const allColumns = formCreateProjectData.filter((column) => column.showColumn)
        const columnsToSwhow = allColumns.map((column, index) => ({
            id: index,
            field: column.id,
            headerName: column.columnTitle ?? column.label,
            width: 150
        }))
        const storedUserInfo = localStorage.getItem('userInfo')
        if (storedUserInfo) {
            const userRol = JSON.parse(storedUserInfo)?.rol
            if (userRol === "admin") {
                columnsToSwhow.unshift({
                    field: 'actions',
                    type: 'actions',
                    headerName: 'Acciones',
                    cellClassName: 'actions',
                    getActions: ({ id }) => {
                        return [
                            <GridActionsCellItem
                                icon={<DeleteIcon />}
                                label="Delete"
                                onClick={() => onPressDelete(id)}
                                sx={{
                                    color: 'red',
                                }}
                            />,
                            <GridActionsCellItem
                                icon={<EditIcon />}
                                label="Edit"
                                className="textPrimary"
                                onClick={() => onPressEdit(id)}
                                sx={{
                                    color: 'gray',
                                }}
                            />,
                        ];
                    },
                })
            }
        }
        return columnsToSwhow
    }

    const handleRowClick = (params) => {
        navigate(`detail/${params.id}`)
    }

    function Toolbar() {
        return (
            <div>
                <GridToolbarFilterButton />
            </div>
        );
    }

    return (
        <div className="flex justify-center m-10" style={isLoading ? { height: '150px' } : { height: 'auto' }}>
            <DataGrid
                loading={isLoading}
                rows={isLoading ? [] : data}
                columns={getColumns()}
                slots={{ toolbar: Toolbar }}
                onRowClick={handleRowClick}
                disableRowSelectionOnClick
                sx={{
                    '& .MuiDataGrid-row': {
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                        },
                    },
                    '& .MuiDataGrid-footerContainer': {
                        display: 'none',
                    },
                }}
            />
        </div>
    )
}

export default Projects
