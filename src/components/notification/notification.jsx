import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Notification(props) {
  return (
    <Card sx={{ maxWidth: 1080, marginBottom: '10px' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Gửi Email</Button>
        <Button size="small">Xóa thông báo</Button>
      </CardActions>
    </Card>
  );
}
