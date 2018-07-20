import { Component, OnInit } from '@angular/core';

// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Ng2SmartTableModule, ServerDataSource } from 'ng2-smart-table';

import { apiUsersService } from '../../shared/services/api_users.service';




@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  settings = {
    delete: {
      confirmDelete: true,
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
 columns: {
   username: {
     title: 'username',
     editable: false,
   },
   password: {
     title: 'password',
   },
   role: {
     title: 'role',
   },
 },
};

source: ServerDataSource;
public resMsg;

constructor(private http: HttpClient, private api_users:apiUsersService) {
 this.source = new ServerDataSource(http, { endPoint: 'http://192.168.122.100/api_users/admin/all_data' });
}
    ngOnInit() {}
    onDeleteConfirm(event) {
      if (window.confirm('Are you sure you want to delete?')) {
        event.confirm.resolve(event.data);

        let username = event.data['username'];
        this.api_users.removeUser(username)
        .subscribe(resMsg => this.resMsg = resMsg);

      } else {
        event.confirm.reject();
      }
    }

    onSaveConfirm(event) {
      if (window.confirm('Are you sure you want to save?')) {
        //event.newData['name'] += ' + added in code';
        event.confirm.resolve(event.newData);
        console.log(event.newData);
        let username = event.newData['username'];
        let password = event.newData['password'];
        let role = event.newData['role'];


        this.api_users.updateUser(username, password, role)
        .subscribe(resMsg => this.resMsg = resMsg);

      } else {
        event.confirm.reject();
      }
    }

    onCreateConfirm(event) {
      if (window.confirm('Are you sure you want to create?')) {
        //event.newData['name'] += ' + added in code';
        event.confirm.resolve(event.newData);

        let username = event.newData['username'];
        let password = event.newData['password'];
        let role = event.newData['role'];
        console.log(username+password);
        this.api_users.addUser(username, password, role)
        .subscribe(resMsg => this.resMsg = resMsg);

      } else {
        event.confirm.reject();
      }
    }

}
