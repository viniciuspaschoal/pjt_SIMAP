//import './geral.css'
import TableStudents from './TableStudents'
import TableActualTail from './TableActualTail'

function Geral({ dadosFiltrados }){
    
    return(
        <>
            <div className="area-geral h-full w-full">

            {/* <TableStudents dados={dadosFiltrados} /> */}
            <TableActualTail/>
            </div>
        </>
    )
}

export default Geral