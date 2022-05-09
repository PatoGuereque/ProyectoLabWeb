import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useObjectContext } from '../context/objects-context';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const ReportarObjeto = () => {
  const { postObject, clearPostResponse, postResponse } = useObjectContext();
  const [showErrorAlert, editErrorAlert] = useState(false);
  const [form, updateForm] = useState({});
  const hiddenFileInput = useRef(null);
  const [fileName, setFileName] = useState('');
  const [errorLabel, setErrorLabel] = useState('Error');

  const readFile = (event) => {
    console.log(event.target);
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function () {
        updateForm({
          ...form,
          imageBase64: reader.result,
        });
      };
    }
  };

  useEffect(() => {
    return () => {
      clearPostResponse();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendForm = async () => {
    //Error Handling
    if (
      !form.campus ||
      !form.location ||
      !form.category ||
      !form.imageBase64 ||
      form.campus.trim() === '' ||
      form.location.trim() === '' ||
      form.category.trim() === '' ||
      form.imageBase64.trim() === ''
    ) {
      setErrorLabel('Debes de llenar todos los campos.');
      editErrorAlert(true);
      const timer = setTimeout(() => {
        editErrorAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    try {
      await postObject({
        ...form,
        dateFound: new Date(),
        status: 'active',
      });
    } catch (error) {
      return new Error(error);
    }
    updateForm({
      campus: '',
      category: '',
      location: '',
      imageBase64: '',
      comments: '',
    });
  };

  return (
    <>
      {postResponse && (
        <Alert
          variant="filled"
          severity={postResponse.success ? 'success' : 'error'}
          style={{ margin: 20 }}
        >
          {postResponse.success ? 'El objeto ha sido reportado!' : 'Error'}
        </Alert>
      )}
      {showErrorAlert && (
        <Alert variant="filled" severity="error" style={{ margin: 20 }}>
          {errorLabel}
        </Alert>
      )}
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Reportar
          </Typography>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Detalles
            </Typography>
            <Typography
              component="h4"
              variant="h4"
              align="center"
              style={{ fontSize: 15 }}
            >
              * Campos Obligatorios
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Campus *
                    </InputLabel>
                    <NativeSelect
                      inputProps={{
                        name: 'campus',
                        id: 'campus',
                      }}
                      onChange={(e) =>
                        updateForm({ ...form, campus: e.target.value })
                      }
                    >
                      <option value={'Aguascalientes'}>Aguascalientes</option>
                      <option value={'Chiapas'}>Chiapas</option>
                      <option value={'Chihuahua'}>Chihuahua</option>
                      <option value={'Ciudad de Méxic'}>
                        Ciudad de México
                      </option>
                      <option value={'Ciudad Juárez'}>Ciudad Juárez</option>
                      <option value={'Ciudad Obregón'}>Ciudad Obregón</option>
                      <option value={'Cuernavaca'}>Cuernavaca</option>
                      <option value={'Estado de México'}>
                        Estado de México
                      </option>
                      <option value={'Guadalajara'}>Guadalajara</option>
                      <option value={'Hidalgo'}>Hidalgo</option>
                      <option value={'Irapuato'}>Irapuato</option>
                      <option value={'Laguna'}>Laguna</option>
                      <option value={'León'}>León</option>
                      <option value={'Monterrey'}>Monterrey</option>
                      <option value={'Morelia'}>Morelia</option>
                      <option value={'Puebla'}>Puebla</option>
                      <option value={'Querétaro'}>Querétaro</option>
                      <option value={'Saltillo'}>Saltillo</option>
                      <option value={'San Luis Potosí'}>San Luis Potosí</option>
                      <option value={'Santa Fe'}>Santa Fe</option>
                      <option value={'Sinaloa'}>Sinaloa</option>
                      <option value={'Sonora Norte'}>Sonora Norte</option>
                      <option value={'Tampico'}>Tampico</option>
                      <option value={'Toluca'}>Toluca</option>
                      <option value={'Zacatecas'}>Zacatecas</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="location"
                  label="Ubicación"
                  fullWidth
                  name="location"
                  variant="standard"
                  value={form.location}
                  onChange={(e) =>
                    updateForm({ ...form, location: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="category"
                  name="category"
                  label="Categoría"
                  fullWidth
                  variant="standard"
                  value={form.category}
                  onChange={(e) =>
                    updateForm({ ...form, category: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'left' }}>
                <Typography
                  component="h6"
                  variant="h4"
                  align="left"
                  style={{ fontSize: 15 }}
                >
                  Solo imagenes de máximo 16MB
                </Typography>
                <input
                  placeholder="Imagen"
                  type="file"
                  id="imageBase64"
                  name="imageBase64"
                  ref={hiddenFileInput}
                  onChange={(e) => readFile(e)}
                  style={{ display: 'none' }}
                />
                <p>{fileName}</p>
                <Button
                  variant="outlined"
                  onClick={() => hiddenFileInput.current.click()}
                >
                  SUBIR IMAGEN
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="comments"
                  name="comments"
                  label="Comentarios"
                  fullWidth
                  multiline
                  rows={4}
                  variant="standard"
                  value={form.comments}
                  onChange={(e) =>
                    updateForm({ ...form, comments: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => sendForm()}
                >
                  REPORTAR
                </Button>
              </Grid>
            </Grid>
          </React.Fragment>
        </Paper>
      </Container>
    </>
  );
};

export default ReportarObjeto;
