import axios from "axios";
export default class Data{
    url: string;

    constructor(url: string){
        this.url = url;
    }

    get(){
        return axios(this.url).then(response => response.data);
    }
}