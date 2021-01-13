import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
 
  constructor(private http: HttpClient) { }

  list:any = []
  selectedUser:any = {}
  showMessage: boolean = false;
  message: string = ''

  closeMsg(){
    this.showMessage = !this.showMessage
  }
  
  ngOnInit(): void {
    this.http.get('https://www.mocky.io/v2/5d531c4f2e0000620081ddce').toPromise().then((users) => {
      this.list = users;
    })
  }

  iniciarPagamento(p:string) {
    this.selectedUser = p;
  }  

  clmodal(response:any) {

    if(!response || !response.status) {
      this.message = "<span> O pagamento não foi concluído com sucesso.</span>"
      this.closeMsg ()
      return
    }

    switch (response.status){
      case 'cancel':
      break;

      case 'Aprovada':
        this.message = "O pagamento foi concluído com sucesso."
        this.closeMsg ()
        break;

      default:
        this.message = "<span>O pagamento não foi concluído com sucesso.</span>"
        this.closeMsg ()
        break;
    }
    this.selectedUser = {}
  }

}
