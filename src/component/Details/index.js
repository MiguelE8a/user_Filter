import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; 
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


const Details = (props) => {
  const [cargarImagen, setCargarImagen] = useState(-1)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const { location: { state } } = props;

  useEffect(() => {
    setIsLoading(true)
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(`https://servicios.inclubtest.online:2053/api/payment/schedule/vouchers/${state?.id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result)
        setData(res?.objModel)
        setIsLoading(false)

      })
      .catch(error => console.log('error', error));

  }, [])

  return (
    <div style={{
      textAlign:'center'
    }}>
       
      <button 
        style={{
          width:'100px'
        }} 
        onClick={()=> history.goBack()}> 
        back
      </button>
      <h1>Usuario: {state?.userResponseDto.name}</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Descripcion</TableCell>
              <TableCell align="right">Fecha de Pago</TableCell>
              <TableCell align="right">Fecha de Expiracion</TableCell>
              <TableCell align="right">%</TableCell>
              <TableCell align="right">Cuota</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (<p>cargando...</p>) : (
              <>
                {data.length > 0 ? (
                  <>
                    {data.map((row, index) => (
                      <>
                        <TableRow onClick={() => setCargarImagen(cargarImagen === index ? -1 : index)} style={{ cursor: 'pointer' }} key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.quoteDescription}
                          </TableCell>
                          <TableCell align="right">{row.payDate}</TableCell>
                          <TableCell align="right">{row.nextExpiration}</TableCell>
                          <TableCell align="right">{row.porcentaje}</TableCell>
                          <TableCell align="right">s/{row.quote}</TableCell>
                        </TableRow>
                        {cargarImagen === index && (
                          <>
                            {row.paymentVouchers.map((item) => (
                              <img style={{ width: '200px' }} src={`data:image/png;base64, ${item.base64} `} alt="Red dot" />

                            ))}
                          </>
                        )}
                      </>
                    ))}
                  </>
                ) : (<p>no hay usuarios...</p>)
                }
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )

}

export default Details