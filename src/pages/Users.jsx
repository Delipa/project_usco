import Box from '@mui/material/Box'
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime' },
  { id: 4, lastName: 'Stark', firstName: 'Arya' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys' }
]

const columns = [
  { field: 'id', headerName: 'ID', width: 130 },
  { field: 'firstName', headerName: 'Nombre', width: 130 },
  { field: 'lastName', headerName: 'Apellido', width: 130 },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Acciones',
    width: 80,
    getActions: (params, index) => [
      <GridActionsCellItem key={index} icon={<DeleteIcon />} label="Delete" />
    ]
  }
]

function users () {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{
          toolbar: GridToolbar
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true
          }
        }}
      />
    </Box>
  )
}

export default users
