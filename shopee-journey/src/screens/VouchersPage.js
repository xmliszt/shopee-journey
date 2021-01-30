import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getExistingVouchers } from '../api';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr));',
    gridGap: 40,
    color: '#494949',
    height: '100%',
    overflow: 'auto',
    padding: 50,
  },
  voucherCard: {
    display: 'flex',
    boxShadow: 'rgb(0 0 0 / 7%) 0.125rem 0.125rem 0.3125rem',
    padding: 0,
    height: '7rem',
    borderRadius: 0.125,
    borderWidth: '1px 1px 1px 0px',
    borderStyle: 'solid',
    borderColor:
      'rgb(232, 232, 232) rgb(232, 232, 232) rgb(232, 232, 232) transparent',
    borderImage: 'initial',
    position: 'relative',
    overflow: 'visible',
  },
  voucherLeft: {
    webkitBoxOrient: 'vertical',
    webkitBoxDirection: 'normal',
    flexDirection: 'column',
    webkitBoxPack: 'center',
    justifyContent: 'center',
    webkitBoxAlign: 'center',
    alignItems: 'center',
    width: '7rem',
    height: 'calc(100% - 0.125rem)',
    position: 'relative',
    display: 'flex',
    background:
      'linear-gradient(90deg, transparent 0px, transparent 0.25rem, rgb(238, 77, 45) 0px) border-box',
    borderRight: '1px dashed rgb(232, 232, 232)',
  },
  voucherRight: {
    position: 'relative',
    minWidth: 0,
    width: '100%',
    padding: 20,
    textAlign: 'left',
    height: 'calc(100% - 0.125rem)',
    background: 'rgb(255, 255, 255)',
  },
  voucherLeftLineWrapper: {
    top: 0,
    left: 0,
    position: 'absolute',
    width: '0.25rem',
    height: '100%',
    background:
      'radial-gradient(circle at 0px 0.375rem, transparent 0px, rgba(238, 77, 45, 0.03) 0.1875rem, rgb(238, 77, 45) 0px, rgb(238, 77, 45) 0.25rem, rgb(238, 77, 45) 0px) 0% 0% / 0.25rem 0.625rem repeat-y',
    backgroundRepeat: 'repeat-y',
    '&::before': {
      content: '',
      top: 0,
      left: 0,
      height: '100%',
      background:
        'repeating-linear-gradient(rgb(238, 77, 45), rgb(238, 77, 45) 0.125rem, transparent 0px, transparent 0.625rem) 0% 0% / 1px 0.625rem',
    },
  },
  voucherCode: {
    fontSize: 12,
    color: '#f44336',
    marginBottom: 10,
  },
  voucherText: {
    fontSize: 15,
    fontWeight: 900,
    marginBottom: 10,
  },
  validTill: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.4)',
  },
  shopeeIcon: {
    backgroundColor: 'rgb(238, 77, 45)',
    border: '0.5px solid white',
  },
}));

const generateRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateVoucherText = (isCoinCashback = false) => {
  if (isCoinCashback) {
    let percentage = generateRandomNumber(1, 20);
    let minSpend = generateRandomNumber(0, 50);
    return `${percentage}% coins cashback Min. Spend $${minSpend}`;
  } else {
    let priceOff = generateRandomNumber(1, 5);
    let minSpend = generateRandomNumber(0, 50);
    return `$${priceOff} off Min. Spend $${minSpend}`;
  }
};

export default function VouchersPage() {
  const classes = useStyles();

  const [vouchers, setVouchers] = useState([]);

  const fetchVouchers = async () => {
    let vouchersFetched = await getExistingVouchers();
    if (vouchersFetched.success) {
      setVouchers(vouchersFetched.data);
    } else {
      console.error(vouchersFetched.error);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  return (
    <div>
      <Header title='My Vouchers' />
      <div style={{ height: 60 }}></div>
      <div className={classes.gridContainer}>
        {vouchers.map((voucher, idx) => (
          <div key={idx} className={classes.voucherCard}>
            <div className={classes.voucherLeft}>
              <div className={classes.voucherLeftLineWrapper}></div>
              <div>
                <Avatar
                  src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ftoolsfromus.com%2Fwp-content%2Fuploads%2F2017%2F11%2FShopee-Icon.png&f=1&nofb=1'
                  alt='Shopee Icon'
                  className={classes.shopeeIcon}
                />
              </div>
            </div>
            <div className={classes.voucherRight}>
              <div className={classes.voucherCode}>{voucher.voucher_code}</div>
              <div className={classes.voucherText}>
                {generateVoucherText(idx % 2 == 0)}
              </div>
              <div className={classes.validTill}>
                Valid Till:{' '}
                {moment(voucher.end_time).format('DD MMM YYYY hh:mm a')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
