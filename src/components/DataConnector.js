import blog_data, {blog_list_from_api, blog_from_api} from './BlogData.js';
import exercise_data, { ExerciseDataList, exercise_list_from_api, exercise_from_api } from './ExerciseData.js';


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


function dataFromApi(endpoint, id, data){
  if(id!==undefined){
    return singleFromApi(endpoint, data);
  }
  return listFromApi(endpoint, data.data);
}

function singleFromApi(endpoint, data){
  const converters = {blog: blog_from_api, exercise: exercise_from_api};
  if(endpoint in converters){
      const converter = converters[endpoint];
      return {data: converter(data), count: 1};
  }
  return undefined;
}

function listFromApi(endpoint, data){
  const converters = {blog: blog_list_from_api, exercise: exercise_list_from_api};
  if(endpoint in converters){
      const converter = converters[endpoint];
      return converter(data);
  }
  return undefined;
}


function make_url(endpoint, id, query, page){
  let url = global_url+endpoint+'/';
  if(id!==undefined){
    url +=id;
  }
  return url;
}


function getDataApi(endpoint, id, query, page, count){
    const token = 'aspdsadkhsa';
    return new Promise((resolve, reject) => {
        const url = make_url(endpoint, id, query, page);
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
              resolve(dataFromApi(endpoint, id, data));
            }).catch(error => {reject(error)});
         });
}

export {
    getData, getDataLocal
  }