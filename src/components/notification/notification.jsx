import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import NotificationService from "../../services/notification.service";

export default function Notification(props) {
  const history = useHistory();

  const handleDelete = async () => {
    await NotificationService.delete(props.noti_id);
    const path = "/notifications";
    await history.push(path);
  };

  return (
    <Card sx={{ maxWidth: 1080, marginBottom: "10px" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          {props.class}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.content}
        </Typography>
      </CardContent>
      {props.isManager ? (
        <CardActions>
          {/* <Button size="small">Gửi Email</Button> */}
          <Button size="small" onClick={handleDelete}>
            Xóa thông báo
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
}
