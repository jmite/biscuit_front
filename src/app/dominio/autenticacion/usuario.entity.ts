import {EntidadBase} from '../entidadbase.entity';


export class Usuario extends EntidadBase {

  username: string;
  tokenRefresh: String;
  tokenAccess: String;

}
