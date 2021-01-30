import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { makeStyles } from '@material-ui/core/styles';
import { getSearchItems } from '../api';
import { Paper, Snackbar } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import MuiAlert from '@material-ui/lab/Alert';
import { getImageUrl } from 'libraries/utils/url';
import { withRouter } from 'react-router-dom';
import { LinkToProduct } from 'libraries/components/Link';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function useQuery(location) {
  var search = location.search.substring(1);
  return JSON.parse(
    '{"' +
      decodeURI(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr));',
    gridGap: 10,
    color: '#494949',
    height: '100%',
    overflow: 'auto',
  },
  itemContainer: {
    padding: '5px 10px 15px',
  },
  priceText: {
    marginTop: 10,
    fontSize: 18,
    color: '#f44336',
    textAlign: 'left',
  },
  itemName: { fontSize: 12, textAlign: 'justify', height: 80 },
  extraInfo: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityText: {
    fontSize: 10,
    color: '#828282',
  },
  soldText: {
    color: '#494949',
    marginLeft: 10,
    fontSize: 11,
  },
  noMore: {
    color: '#f44336',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    fontSize: 12,
    margin: '10px 0px',
    width: '100%',
  },
}));

function BrowsePage({ location }) {
  const query = useQuery(location);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertStyle, setAlertStyle] = useState('info');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [noMore, setNoMore] = useState(false);
  const [loading, setLoading] = useState(false);

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 250
    ) {
      if (!noMore) {
        fetchItems(page);
      }
    }
  };

  useEffect(() => {
    fetchItems(page);
  }, []);

  const fetchItems = async (page) => {
    setLoading(true);
    let response = await getSearchItems(query.q, page);
    if (response.success) {
      if (response.data.length === 0) {
        setNoMore(true);
      } else {
        setItems([...items, ...response.data]);
        const newPage = page + 1;
        setPage(newPage);
      }
    } else {
      pushAlert(response.error, 'error');
    }
    setLoading(false);
  };

  const pushAlert = (msg, style) => {
    setAlertMsg(msg);
    setAlertStyle(style);
    setAlertOpen(true);
  };

  const handleAlertClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity={alertStyle}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <Header />
      <div style={{ height: 60 }}></div>

      <div id='browseAnchor' className={classes.gridContainer}>
        {items.map((item, idx) => (
          <LinkToProduct key={idx} shopid={item.shop_id} itemid={item.item_id}>
            <Paper elevation={2} square className={classes.itemContainer}>
              <div style={{ textAlign: 'right' }}>
                <span className={classes.quantityText}>
                  {item.stock} in stock
                </span>
              </div>
              <img src={getImageUrl(item.cover)} width='100%' />
              <div className={classes.itemName}>{item.name}</div>
              <div className={classes.priceText}>S${item.price}</div>
              <div className={classes.extraInfo}>
                <Rating
                  name='item-rating'
                  defaultValue={item.rating}
                  precision={0.1}
                  size='small'
                />
                <span className={classes.soldText}>{item.sold} sold</span>
              </div>
            </Paper>
          </LinkToProduct>
        ))}
      </div>
      {loading ? <div className={classes.noMore}>Loading...</div> : ''}
      {noMore ? (
        <div className={classes.noMore}>There is no more item ...</div>
      ) : (
        ''
      )}
    </div>
  );
}

export default withRouter(BrowsePage);
