import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private chatservice: ChatService, private router: Router) {}

  ngOnInit(): void {}

  enter(provider: string): void {
    this.chatservice.login(provider);
  }
}
