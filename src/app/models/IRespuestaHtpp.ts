import { IUsuarioToken } from './IUserToken';

export interface IRespuestaHttp{
    exito:number,
    mensaje:string,
    data:IUsuarioToken
}