import './geral.css'
import TableStudents from './TableStudents'

function Geral({ dadosFiltrados }){
    
    return(
        <>
            <div className="area-geral">

            <TableStudents dados={dadosFiltrados} />
            </div>
        </>
    )
}

export default Geral