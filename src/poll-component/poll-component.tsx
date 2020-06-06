import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    height: 500,
    margin: '20px auto',
  },
  images: {
    height: 400,
    width: 300,
    margin:'20px 0',
  },
  imagesBlock: {
    display:'flex',
  }
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <div className={classes.imagesBlock}>
          <CardMedia className={classes.images}
                     image='https://images.pexels.com/photos/556666/pexels-photo-556666.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'/>
          <CardMedia className={classes.images}
                     image='https://cdn.psychologytoday.com/sites/default/files/field_blog_entry_images/2019-06/pexels-photo-556667.jpeg'/>
        </div>
      </CardActionArea>

    </Card>
  );
}