import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';  
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import {states} from '../../utils/stateList';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Home() {
  const classes = useStyles();

  const history = useHistory();
 const [data, setData] = useState([]);
 const [codestate, setCodeState] = useState(0);
 const [isLoading, setIsLoading ] = useState(false);
 const handleChange = (event) => {
   const name = event.target.value
   setCodeState(name)
 }
 
 const handleRowClick = (row) => {
   history.push(`/Details`, row);
 }
 
 useEffect(()=>{
  setIsLoading(true)
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  fetch(`https://servicios.inclubtest.online:2053/api/suscription/all/state/${codestate}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      const res = JSON.parse(result)
      const objectModel = res.objModel
      setData(objectModel)
      setIsLoading(false)

    })
    .catch(error => console.log('error', error));
 },[codestate])

  return (
    <>
    <h1>Lista de Usuarios por Estado</h1>
      <Select
        native
        onChange={handleChange}
        inputProps={{
          name: 'age',
          id: 'age-native-simple',
        }}
      >
        { states.map((item) => (
          <option value={item.id}> {item.label}</option> 
        ))}
      </Select>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Client Name</TableCell>
              <TableCell align="right">Document</TableCell>
              <TableCell align="right">Telf</TableCell>
              <TableCell align="right">Mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (<p>cargando...</p>) : (
              <>
              {data.length > 0 ? (
                <>
                  {data.map((row) => (
                    <TableRow onClick={()=> handleRowClick(row) } style={{cursor:'pointer'}} key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.userResponseDto.id}
                      </TableCell>
                      <TableCell align="right">{row.userResponseDto.name}</TableCell>
                      <TableCell align="right">{row.userResponseDto.nroDocument}</TableCell>
                      <TableCell align="right">{row.userResponseDto.nroTelf}</TableCell>
                      <TableCell align="right">{row.userResponseDto.email}</TableCell>
                    </TableRow>
                  ))}
                </>
              ): (<p>no hay usuarios...</p>)
              }
              </>
              
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
