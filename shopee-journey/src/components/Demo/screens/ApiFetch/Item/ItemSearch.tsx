import * as React from 'react';

import consts from 'consts';

import Button from '../../../components/Button';

import { get } from 'libraries/utils/fetch';

import styles from './styles.scss';

function ItemSearch() {
  const [keyword, setKeyword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(null);
  const [items, setItems] = React.useState(null);

  const searchItem = React.useCallback(() => {
    (async () => {
      setIsLoading(true);
      const response = await get(`${consts.API_URL}item/search`, {
        keyword: keyword,
        offset: 0,
        limit: 2,
      });
      if (response && response.data && response.data.items) {
        setItems(response.data.items);
      }
      setIsLoading(false);
    })();
  }, [keyword]);

  return (
    <>
      <h3>Item Search</h3>
      <div>
        <input
          className={styles.inputItemSearch}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <Button onClick={searchItem}>Search</Button>
      </div>
      {isLoading ? (
        <div>Searching...</div>
      ) : (
        <ul className={styles.searchResults}>
          {(items || []).map((item, index) => {
            return (
              <li key={index}>
                {item.name} - {item.rating}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default ItemSearch;
