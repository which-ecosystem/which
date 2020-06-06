import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';



const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    height: 500,
    margin: '20px auto',
  },
  images: {
    height: 400,
    width: 300,
  },
  imagesBlock: {
    display: 'flex',
  },
  percentageLeft:{
    position:'absolute',
    color: 'white',
    top: '86%',
    left:30,
    fontSize:20,
  },
  percentageRight:{
    position: 'absolute',
    color: 'white',
    top: '86%',
    right:30,
    fontSize:20,
  }

});

const PollCard: React.FC = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="avatar">
            R
          </Avatar>
        }
        title="Nick Name"
      />
      <div className={classes.imagesBlock}>
        <CardActionArea>
          <CardMedia className={classes.images}
                     image='https://images.pexels.com/photos/556666/pexels-photo-556666.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'/>
          <div className={classes.percentageLeft}>25%</div>
        </CardActionArea>
        <CardActionArea>
          <CardMedia className={classes.images}
                     image='https://cdn.psychologytoday.com/sites/default/files/field_blog_entry_images/2019-06/pexels-photo-556667.jpeg'/>
          <div className={classes.percentageRight}>75%</div>
        </CardActionArea>
      </div>
    </Card>
  );
}
export default PollCard;