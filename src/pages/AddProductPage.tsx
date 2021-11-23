import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import React from 'react';
import UploadFileImage from '../assets/upload-file.jpg';
import TextField from '@mui/material/TextField';

const Input = styled('input')({
  display: 'none',
});

const AddProductPage = () => {
  const [img, setImg] = React.useState(UploadFileImage);
  const [imgName, setImgName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImg(URL.createObjectURL(event.currentTarget.files[0]));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.id === 'description') {
      setDescription(event.currentTarget.value);
    } else {
      setImgName(event.currentTarget.value);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, ml: 10 }}>
      <Typography variant="h3" sx={{ mb: 3 }}>
        미술품 등록
      </Typography>
      <Typography sx={{ mb: 3 }} variant="body2">
        지원 가능 목록: 이미지 파일(png, jpg 등)
      </Typography>
      <Card sx={{ width: 400, height: 400, mb: 3 }}>
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={handleUploadChange}
          />
          <Button variant="outlined" component="span">
            <CardMedia component="img" height="400" image={img} alt="hello" />
          </Button>
        </label>
      </Card>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ mt: 3, mb: 3 }}>
          이름
        </Typography>
        <TextField
          placeholder="미술품 이름"
          required
          id="name"
          sx={{ width: 400, mb: 3 }}
          onChange={handleChange}
          value={imgName}
        />
        <Typography variant="h6" sx={{ mt: 3, mb: 3 }}>
          설명
        </Typography>
        <TextField
          placeholder="간단한 설명을 적어주세요"
          required
          id="description"
          sx={{ width: 400, mb: 3 }}
          onChange={handleChange}
          value={description}
        />
        <Button variant="contained" component="span" sx={{ width: 200 }}>
          등록
        </Button>
      </Box>
    </Box>
  );
};

export default AddProductPage;
