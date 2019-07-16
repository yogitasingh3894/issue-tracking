import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class PushnotifyService {
public permission: Permission;  
  messages: Subject<any>;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService) {

     this.permission = this.isSupported() ? 'default' : 'denied';  


    this.messages = <Subject<any>>wsService
      .connect()
      .map((response: any): any => {
        return response;
      })
   }

  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg) {
    this.messages.next(msg);
  }


  public isSupported(): boolean {  
        return 'Notification' in window;  
    }  
    requestPermission(): void {  
        let self = this;  
        if ('Notification' in window) {  
            Notification.requestPermission(function(status) {  
                return self.permission = status;  
            });  
        }  
    }  
    create(title: string, options ? : PushNotification): any {  
        let self = this; 

        return new Observable(function(obs) {  
            if (!('Notification' in window)) {  
                console.log('Notifications are not available in this environment');  
                obs.complete();  
            }  
            if (self.permission !== 'granted') {  
                console.log("The user hasn't granted you permission to send push notifications");  
                obs.complete();  
            }  
            let _notify = new Notification(title, options);  
            _notify.onshow = function(e) { 

                return obs.next({  
                    notification: _notify,  
                    event: e  
                });  
            };  
            _notify.onclick = function(e) { 


  window.open('/list-posts/5d21cb62b518f61fa04b3041','_self');
                /*return obs.next({  
                    notification: _notify,  
                    event: e  
                });*/  
            };  
            _notify.onerror = function(e) {  
                return obs.error({  
                    notification: _notify,  
                    event: e  
                });  
            };  
            _notify.onclose = function() {  
                return obs.complete();  
            };  
        });  
    }  
    generateNotification(source: Array < any > ): void {  
        let self = this;  
        source.forEach((item) => {  

              this.messages.next(item.alertContent); 
            let options = {  
                body: item.alertContent,  
                icon: "../resource/images/bell-icon.png" ,
                vibrate:[100, 50, 100]
              
            };  
            let notify = self.create(item.title, options).subscribe();  
        })  
    }  

}
export declare type Permission = 'denied' | 'granted' | 'default';  
export interface PushNotification {  
    body ? : string;  
    icon ? : string;  
    tag ? : string;  
    data ? : any;  
    renotify ? : boolean;  
    silent ? : boolean;  
    sound ? : string;  
    noscreen ? : boolean;  
    sticky ? : boolean;  
    dir ? : 'auto' | 'ltr' | 'rtl';  
    lang ? : string;  
    vibrate ? : number[];  
}  