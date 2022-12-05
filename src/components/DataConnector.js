import blog_data from './BlogData.js';
import exercise_data from './ExerciseData.js';


export const global_url = 'http://127.0.0.1:5000/api/';
export const global_url_prod = 'https://dbdeit.wisniewskicodind.atthost24.pl/';
export const global_url_test = 'http://127.0.0.1:5000/api/';
export const global_api_data = true
export const page_size = 10


function getData(endpoint, id, query, page, count){
    if (global_api_data){
        return getDataApi(endpoint, id, query, page, count);
    }
    else
        return getDataLocalInterface(endpoint, id, query, page, count);
  }


function getDataLocalInterface(endpoint, id, query, page, count){
  return new Promise((resolve, reject) => {
      const ret = getDataLocal(endpoint, id, query, page, count);
      if (ret.count !== 0){
        resolve(ret);
      }
      else{
        reject(new Error("endpoint does not exist locally"));
      }

    });
}


function getDataLocal(endpoint, id, query, page, count){
      const data = {blog: blog_data, exercise: exercise_data};
      if(endpoint in data){
          const requested_data_object = data[endpoint];
          return requested_data_object.getData(id, query, page, count)
      }
      return {data: undefined, count: 0};
}


function getDataApi(endpoint){
    const token = 'aspdsadkhsa';
    return new Promise((resolve, reject) => {
        let url = global_url+endpoint+'/';
        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
    
          }}
        ).then(response => {
            if (response.status !== 200) {
              return 0;
            }
            return response.json();
          })
          .then(data => {
              console.log(data);
              resolve(data);
            }).catch(error => {reject(error)});
         });
}

export {
    getData, getDataLocal
  }