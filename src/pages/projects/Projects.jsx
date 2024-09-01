import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbarFilterButton } from '@mui/x-data-grid';
import getCollection from '../../services/getCollection';
import formCreateProjectData from '../../utils/constants/formCreateProjectData';

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

    function getColumns() {
        const allColumns = formCreateProjectData.filter((column) => column.showColumn)
        const columnsToSwhow = allColumns.map((column, index) => ({
            id: index,
            field: column.id,
            headerName: column.columnTitle ?? column.label,
            width: 150
        }))
        return columnsToSwhow
    }

    const handleRowClick = (params) => {
        navigate(`detail/${params.id}`);
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
                rows={data}
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
