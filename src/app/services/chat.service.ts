import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

import { Message } from 'src/app/models/message.model';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Message>;
  public chats: Message[] = [];
  public usuario: any = {};

  constructor(
    private afs: AngularFirestore,
    public auth: AngularFireAuth,
    private router: Router
  ) {
    this.auth.authState.subscribe((user) => {
      console.log('Estado del usuario: ', user);

      if (!user) {
        return;
      }

      if (user) {
        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
        this.usuario.image = user.photoURL;
      }
    });
  }

  login(provider: string): void {
    if (provider === 'google') {
      this.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(() => {
          this.router.navigateByUrl('/chats');
        });
    }
    if (provider === 'twitter') {
      this.auth
        .signInWithPopup(new firebase.auth.TwitterAuthProvider())
        .then(() => {
          this.router.navigateByUrl('/chats');
        });
    }
    if (provider === 'facebook') {
      this.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(() => {
          this.router.navigateByUrl('/chats');
        });
    }
  }

  logout(): void {
    this.usuario = {};
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('/login')
    })
  }

  loadMessages(): Observable<void> {
    this.itemsCollection = this.afs.collection<Message>('chats', (ref) =>
      ref.orderBy('date', 'desc').limit(5)
    );
    return this.itemsCollection.valueChanges().pipe(
      map((data: Message[]) => {
        this.chats = [];
        for (const message of data) {
          this.chats.unshift(message);
        }
      })
    );
  }

  addMessage(text: string) {
    const data: Message = {
      name: this.usuario.nombre,
      message: text,
      date: new Date().getTime(),
      uid: this.usuario.uid,
      image: this.usuario.image,
    };
    console.log('La data: ', data);
    return this.itemsCollection.add(data);
  }
}
