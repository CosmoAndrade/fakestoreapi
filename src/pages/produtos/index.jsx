import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom"
import './produto.css'

import { Alert, Button, Container, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Loading from "../../components/loading";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



function Produto() {
    const history = useNavigate()
    const [open, setOpen] = useState(false);
    const [buttonText , setButtonText] = useState('Cadastrar')

    const handleOpen = ( typeFunction ) =>{ 
        setButtonText(typeFunction)
        setOpen(true)
    
    }
    const handleClose = () => {
        setOpen(false)
        clearForm()
    }

    const [idEdit , setIdEdit] = useState('')
    const [message, setMessage] = useState('')
    const [alertMessage, setAlertMessage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    

    function clearForm() {
        setTitle('')
        setCategory('')
    }


    function getProducts() {
        api.get("products?limit=5")
            .then((response) => setProducts(response.data))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }


    useEffect(() => {

        getProducts()
    }, [])


    function showAlert(item) {
        setMessage(item)
        setAlertMessage(true)
        setTimeout(() => {
            setAlertMessage(false)
        }, 2000);
    }


    function handleDelete(id) {
        setLoading(true)
        api.delete(`/products/${id}`).then((response) => {
            getProducts()

            showAlert('Apagado com sucesso!')

        }).finally(() => {
            setLoading(false)
        })
    }


    function createProduct() {
        const request = {
            title,
            category,

        }
        setLoading(true)
        handleClose()
       
        api.post("products", request)
            .then((reponse) => {
                history('/products')
                showAlert('Produto cadastrado com sucesso!')
            }).finally(() => {
                setLoading(false)
            })
    }
    

    function editProduct() {
        const request = {
            title,
            category,

        }
        setLoading(true)
        handleClose()
        
        api.put(`products/${idEdit}`, request)
            .then((reponse) => {
                history('/products')
                showAlert('Produto editado com sucesso!')
            }).finally(() => {
                setLoading(false)
            })
    }


    function openEdit(product){
        setTitle(product.title)
        setCategory(product.category)
        setIdEdit(product.id)
        handleOpen('Editar')
    }


    return (

        <>

            {alertMessage && <Alert severity="success" className="alert">{message}</Alert>}
            {loading && <Loading />}
            <Container>

                <div className="caixa" >
                    <header>
                        <div className="titulo">
                            <h1>Produtos</h1>
                            <Button className="btn" size="small" sx={{ borderRadius: '20px', color: '#75727F' }}  >25 cadastrados</Button>
                        </div>

                        <Button variant="contained"
                            onClick={() => handleOpen('Cadastrar')}
                        >
                            <AddIcon color="white" />
                            Adicionar produto
                        </Button>
                    </header>

                    {/* Modal Cadastrar */}
                    <div>

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >

                            <Box sx={style}>

                                <Button
                                    style={{ float: 'right' }}
                                    onClick={handleClose}
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                >Close
                                </Button>

                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Produto
                                </Typography>



                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Title"
                                    type="text"
                                    autoFocus
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}

                                />


                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Categotia"
                                    type="text"
                                    autoFocus
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}

                                />



                                <Button
                                    onClick={() => {
                                        if(buttonText === 'Cadastrar'){
                                            createProduct()
                                            return
                                        }

                                        editProduct()
                                    }}
                                    variant="contained"
                                    color="success"
                                    size="small"
                                >{buttonText}</Button>


                            </Box>
                        </Modal>
                    </div>








                    {products.map((product, index) => {
                        return (
                            <div key={index}>


                                <TableContainer component={Paper} className="tabela">
                                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow >

                                                <TableCell align="left">Produto</TableCell>
                                                <TableCell align="right">Categoria</TableCell>
                                                <TableCell align="right">Avaliação</TableCell>
                                                <TableCell>Ações</TableCell>

                                            </TableRow>
                                        </TableHead>

                                        <TableBody>

                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >

                                                <TableCell align="left">{product.title}</TableCell>
                                                <TableCell align="right">{product.category}</TableCell>
                                                <TableCell align="right">
                                                    <StarIcon style={{ color: '#757281' }} />
                                                    <StarIcon style={{ color: '#757281' }} />
                                                    <StarIcon style={{ color: '#757281' }} />
                                                </TableCell>
                                                <TableCell>

                                                    <Button
                                                        onClick={() => openEdit(product)}
                                                    >
                                                        <EditOutlinedIcon

                                                        />
                                                    </Button>


                                                    <Button
                                                        onClick={() => handleDelete(product.id)}
                                                    >
                                                        <DeleteOutlineOutlinedIcon />
                                                    </Button>

                                                </TableCell>


                                            </TableRow>


                                        </TableBody>

                                    </Table>


                                </TableContainer>

                            </div>


                        )
                    })}






                </div>


            </Container>


        </>


    );
}

export default Produto;