import React from 'react';
import { Container, Grid, Typography, Avatar, IconButton, Box, Rating } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import StarIcon from '@mui/icons-material/Star';

// Define labels for the Rating component
const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const Home = () => {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  return (
    <Container
      sx={{
        mt: 4,
        mb: 4,
        backgroundColor: '#f5f5f5',  // Cor de fundo clara
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        maxWidth: 'md',
        textAlign: 'center',  // Centraliza o conteúdo
      }}
    >
      <Typography
        variant="h4" 
        gutterBottom 
        align="center"
        sx={{ fontWeight: 'bold', color: 'text.primary' }}
      >
        Sistema de requisições e cotações
      </Typography>
      <br></br><br></br>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6}>
          <Avatar
            alt="C"
            src="/path/to/avatar.jpg"  // Substitua com o caminho da sua imagem de avatar
            sx={{
              width: 150,
              height: 150,
              bgcolor: '#003c8f',  // Cor de fundo azul para o Avatar
              margin: 'auto',
              border: '4px solid #003c8f',  // Borda azul ao redor da foto
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="body1"
            align="justify"
            sx={{
              fontWeight: 'bold', 
              color: 'text.primary',  // Cor do texto
              maxWidth: 400,
              margin: 'auto',
            }}
          >
            Profissional com vasta experiência em desenvolvimento de software. Apaixonado por novas tecnologias e sempre em busca de aprender e melhorar minhas habilidades. Isso aqui ficou parecendo um certificado né kkkkkk aiai
            
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 4 }}>
        <Grid item>
          <IconButton
            color="primary"
            aria-label="LinkedIn"
            component="a"
            href="https://www.linkedin.com/in/calebe-machado/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontSize: 48, color: '#0a66c2' }}  // Ícone LinkedIn
          >
            <LinkedInIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            color="primary"
            aria-label="GitHub"
            component="a"
            href="https://github.com/machadocalebe"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontSize: 48, color: '#333' }}  // Ícone GitHub
          >
            <GitHubIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Grid>
      </Grid>
      <Typography
        variant="h6"
        sx={{
          mt: 4,
          mb: 1,
          color: '#333',  // Cor do texto
        }}
        gutterBottom
      >
        Avaliação:
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          sx={{
            fontSize: 48,  // Aumenta o tamanho das estrelas
          }}
        />
        {value !== null && (
          <Box sx={{ mt: 1, fontSize: '1.2rem' }}>
            {labels[hover !== -1 ? hover : value]}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home;

