import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  message = '';
  element: any;

  constructor(public chatService: ChatService) {
    this.chatService.loadMessages().subscribe(() => {
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 20);
    });
  }

  ngOnInit(): void {
    this.element = document.getElementById('app-messages');
  }

  sendMessage(): void {
    if (this.message.length === 0) {
      return;
    }

    this.chatService
      .addMessage(this.message)
      .then(() => (this.message = ''))
      .catch((err) => console.error('Error al enviar el mensaje: ', err));
  }
}
