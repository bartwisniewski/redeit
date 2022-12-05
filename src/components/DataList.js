

class DataList {
    constructor(data) {
        this.count = data.length;
        this.data = data;
        this.return_data = [...this.data];
      }

    getData(id, query, page, count){
        if(id !== undefined){
            return {data: this.dispatchSingleObject(id), count: 1};
        }
        this.return_data = [...this.data];
        if(query){
            this.filter(query);
        }
        if(page===undefined){
            page = 0;
        }
        if(count !== undefined){
            this.paginate(page, count);
        }
        this.sort();
        return {data: this.return_data, count: this.count};
    }

    dispatchSingleObject(id){
        const single_object = this.data.filter(single_object => {return(single_object.id === id)})[0];
        return single_object;
        }

     filter(query){
        const filter = query ? query.length >= 2 : false;
        if (filter){
            // filter data in inheriting classess
            this.return_data = this.return_data;
        }
    }

    paginate(page, count){
        const start = page*count;
        this.return_data = this.return_data.splice(start, count);
    }
}

export default DataList;