import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ 
      color: '#fff'
    }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Container fixed >
      <Typography component="h1" variant="h4" align="center" color = "#0474A9">FAQ</Typography>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" sx={{ 
        background: '#0474A9',
        color: '#fff'
      }}>
          <Typography>¿Cómo reportar un objeto?</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ 
        background: '#11A1B7',
        color: '#fff'
      }}>

          <Typography>
            Regístrate con tu correo institucional, y a continuación se te habilitará la pestaña de reportar objetos, donde se te pedirá que llenes un formulario.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" sx={{ 
        background: '#0474A9',
        color: '#fff'
      }}>
          <Typography>¿Dónde o cómo puedo recuperar un objeto?</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ 
        background: '#11A1B7',
        color: '#fff'
      }}>
          <Typography>
            Todos los objetos en la pestaña de Objetos Encontrados, fueron entregados a Locatec.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" sx={{ 
        background: '#0474A9',
        color: '#fff'
      }}>
          <Typography>¿Qué pasa si no encuentro mi objeto en Objetos Pedidos?</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ 
          background: '#11A1B7',
          color: '#fff'
        }}>
          <Typography>
            Te recomendamos darte una vuelta a locatec de tu Campus.
          </Typography>
        </AccordionDetails>
      </Accordion>
      </Container>
      <Typography component="h6" variant="h6" align="center" color = "#000" >
        Teléfono: 81 8358 2000
      </Typography>
    </div>
  );
}
