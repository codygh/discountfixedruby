import RequestUrl from '../config';

export const get_discounts = (searchValue) => {
  return new Promise(
    (resolve, reject) => {
      fetch(RequestUrl.DISCOUNTS + '?q='+searchValue.toLocaleLowerCase(), {
        method: 'GET',
      }).then((resp) => {
        try{
          if (resp.redirected){
            resolve({retry: true});
          }else{
            resolve(resp.json());
          }
        }catch(error){
          resolve({retry: true})
        }
      }).catch((error) => {
        reject(error)
      })
    }
  )
};

export const get_discount = (id) => {
  return new Promise(
    (resolve, reject) => {
      fetch(RequestUrl.DISCOUNT + '/'+id, {
        method: 'GET'
      }).then((resp) => {
        resolve(resp.json())
      }).catch((error) => {
        reject(error)
      })
    }
  )
};

export const create_discount = (discount) => {
  return new Promise(
    (resolve, reject) => {
      fetch(RequestUrl.DISCOUNT, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(discount)
      }).then((resp) => {
        resolve(resp.json())
      }).catch((error) => {
        reject(error)
      })
    }
  )
};

export const update_discount = (discount) => {
  return new Promise(
    (resolve, reject) => {
      fetch(RequestUrl.DISCOUNT, {
        method: 'PUT',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(discount)
      }).then((resp) => {
        resolve(resp.json())
      }).catch((error) => {
        reject(error)
      })
    }
  )
};

export const delete_discount = (discount) => {
  return new Promise(
    (resolve, reject) => {
      fetch(RequestUrl.DISCOUNT, {
        method: 'DELETE',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(discount)
      }).then((resp) => {
        resolve(resp.json())
      }).catch((error) => {
        reject(error)
      })
    }
  )
};

export const search_product = (searchValue) => {
  return new Promise(
    (resole, reject) => {
      fetch(RequestUrl.SEARCH_PRODUCT + '?search_value=' + searchValue, {
        method: 'GET',
      }).then((resp) => {
        resole(resp.json())
      }).catch((error) => {
        reject(error)
      })
    }
  );
}