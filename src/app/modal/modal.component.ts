import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Carateres para a construção dos detalhes para validação //
interface TransactionPayload {
  // Card Info
  card_number: string;
  cvv: number;
  expiry_date: string;

  // Destination User ID
  destination_user_id: number;

  // Value of the Transaction
  value: number;
}


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input()
  selectedUser: any;

  @Output() onCloseModal = new EventEmitter<boolean>();

  vtrans:any = "";
  cardSelected: any = '1111111111111111';
  
  constructor(private http: HttpClient) { }

  cards:any = [
    // valid card
    {
      card_number: '1111111111111111',
      cvv: 789,
      expiry_date: '01/18',
    },
    // invalid card
    {
      card_number: '4111111111111234',
      cvv: 123,
      expiry_date: '01/20',
    },
  ];

  ngOnInit(): void {
    console.log(this.cards)
  }


  closeModal(response:any = {status: 'cancel'}) {
    console.log('Click')
    this.vtrans=""
    this.cardSelected = this.cards[0].card_number
    this.onCloseModal.emit(response)
  }

  //Método Post para validação de dados do cartão//
  makeTransaction() {

    let cdFull = this.cards.filter((card: any) => {
      if (card.card_number == this.cardSelected){
        return true
      }
      return false
    })[0];

    let transaction: TransactionPayload = {
      card_number: this.cardSelected,
      destination_user_id: this.selectedUser.id,
      value: parseFloat(this.vtrans.replace(',' , '.')),
      cvv: cdFull.cvv,
      expiry_date:cdFull.expiry_date
    }

    this.http.post('https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989', transaction).toPromise().then((response) => {
      console.log(response)
      this.closeModal(response)
    })
  }
}

