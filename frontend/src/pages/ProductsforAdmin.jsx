import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Td, Th, TableContainer, Button, Image, useToast, CircularProgress, useDisclosure } from '@chakra-ui/react';
import { Delete, Edit } from '@mui/icons-material';
import { useFormik } from 'formik';
import { getAllGenres } from '../services/GenreServices';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Select, Textarea } from '@chakra-ui/react'
import ProductValidations from '../validations/ProductValidations';
import { deleteProduct, getAllProducts,getProductById, addProduct, updateProduct } from '../services/ProductServices';
import ProductEditModal from '../components/ProductEditModal';
import { uploadImageToCloudinary } from '../services/ImageServices';
import { getCategoryByGenre } from '../services/CategoryServices';
const ProductsforAdmin = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [allCategories, setAllCategories] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [allGenres, setAllGenres] = useState([])
  const [openm,setopenm]=useState(true);
  const toast = useToast();
  const { values, isValid, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
        name: "",
        description: "",
        category: "",
        color: "",
        gender: "",
        sizes: ["XS", "S", "M", "L", "XL"],
        price: 0
    },
    onSubmit: values => {
        addProduct(imageUrl, values.name, values.color, values.sizes, values.description, values.category, values.gender, values.price)
            .then((result) => {
                if (result.status) {
                    toast({
                        title: 'Error!',
                        description: 'Somethings went wrong.',
                        status: 'error',
                        duration: 2000,
                        isClosable: true
                    });
                } else {
                    onClose(true);
                    resetForm();
                    toast({
                        title: 'Added!',
                        description: 'Product successfully added.',
                        status: 'success',
                        duration: 2000,
                        isClosable: true
                    });
                }
            });
    },
    validationSchema: ProductValidations
});
const chooseImage = (e) => {
  uploadImageToCloudinary(e.target.files[0])
      .then(data => setImageUrl(data.url));
};

const onChangeGenre = (e) => {
  setSelectedGenre(e.target.value);
  getCategoryByGenre(e.target.value)
      .then((result) => {
          setAllCategories(result.category);
      });
};
  useEffect(() => {
    getAllProducts()
      .then((result) => {
        setProducts(result.allProducts);
      });
      getAllGenres()
      .then((result) => {
        setAllGenres(result.allGenres);
      });
  });

  const onClickEdit = (id) => {
    setIsEdit(true);
    setCurrentId(id);
    onOpen(true);
  };

  const onClickDelete = (id) => {
    deleteProduct(id)
      .then((result) => {
        if (result.status) {
          toast({
            title: 'Error!',
            description: 'Somethings went wrong.',
            status: 'error',
            duration: 2000,
            isClosable: true
          });
        } else {
          toast({
            title: 'Deleted!',
            description: 'Product succesfully deleted.',
            status: 'success',
            duration: 2000,
            isClosable: true
          });
        }
      })
  };

  const onClickAdd = () => {
    setIsEdit(false);
    onOpen(true);
  };

  if (products.length > 0) {
    return (
      <Box>
        <TableContainer p={3} >
          <Table variant='striped' >
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Color</Th>
                <Th>Gender</Th>
                <Th>Price</Th>
                <Th><Button colorScheme='facebook' onClick={onClickAdd} >Add New</Button></Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                products.map((product) => {
                  return (
                    <Tr key={product._id}>
                      <Td><Image width={70} height={100} src={product.imageUrl} /></Td>
                      <Td>{product._id}</Td>
                      <Td>{product.name}</Td>
                      <Td>{product.color}</Td>
                      <Td>{product.gender}</Td>
                      <Td>{product.price} $</Td>
                      <Td>
                        <Button onClick={() => onClickEdit(product._id)} colorScheme='facebook'><Edit /></Button>
                        <Button onClick={() => onClickDelete(product._id)} bg='whitesmoke' color='facebook.500'><Delete /></Button>
                      </Td>
                    </Tr>
                  )
                })
              }
            </Tbody>
          </Table>
        </TableContainer>
        <ProductEditModal isOpen={isOpen} onClose={onClose} isEdit={isEdit} currentId={currentId} />
      </Box>
    )
  } else {
    return (
      <Box alignItems='center' display='flex' justifyContent='center' width='100%' minHeight='40vh' >
        {/* <CircularProgress isIndeterminate color='facebook.500' /> */}
        <Button colorScheme='facebook' variant='ghost' ml={3} onClick={()=>setopenm(true)}>Add Product</Button>
        <Modal isOpen={openm}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color='facebook.500' >New Product</ModalHeader>
                    <ModalCloseButton onClick={()=>setopenm(false)} />
                    <ModalBody>
                        <Input type='file' p={0} border='none' onChange={chooseImage} />
                        <Input mt={3} name='name' placeholder='Name' onChange={handleChange} value={values.name} />
                        <Textarea name='description' resize='none' mt={3} placeholder='Description' onChange={handleChange} value={values.description} />
                        <Select mt={3} placeholder='Genre' onChange={onChangeGenre} value={selectedGenre} >
                            {
                                allGenres && allGenres.map((genre) => {
                                    return <option key={genre._id} value={genre._id}>{genre.name}</option>
                                })
                            }
                        </Select>
                        <Select mt={3} name='category' placeholder='Category' onChange={handleChange} value={values.category} >
                            {
                                allCategories && allCategories.map((category) => {
                                    return <option key={category._id} value={category._id}>{category.name}</option>
                                })
                            }
                        </Select>
                        <Select mt={3} name='color' placeholder='Color' onChange={handleChange} value={values.color} >
                            <option value="blue">Blue</option>
                            <option value="white">White</option>
                            <option value="green">Green</option>
                            <option value="black">Black</option>
                            <option value="red">Red</option>
                        </Select>
                        <Select mt={3} name='gender' placeholder='Gender' onChange={handleChange} value={values.gender} >
                            <option value="man">Man</option>
                            <option value="woman">Woman</option>
                            <option value="unisex">Unisex</option>
                        </Select>
                        <Input mt={3} placeholder='Price' type='number' name='price' onChange={handleChange} value={values.price} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='facebook' onClick={handleSubmit} disabled={!isValid && imageUrl === ""} >Add</Button>
                        <Button colorScheme='facebook' variant='ghost' ml={3} onClick={()=>setopenm(false)}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
      </Box>
    )
  }

}

export default ProductsforAdmin;