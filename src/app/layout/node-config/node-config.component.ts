import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, ServerDataSource } from 'ng2-smart-table';
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { apiRoutersService } from '../../shared/services/api_routers.service';

@Component({
    selector: 'app-node-config',
    templateUrl: './node-config.component.html',
    styleUrls: ['./node-config.component.scss']
})
export class NodeConfigComponent{


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
        InvId: {
          title: 'ID',
        },
        manufacturer: {
          title: 'Make',
        },
        model_no: {
          title: 'Model',
        },
        location: {
          title: 'Location',
        },
      },
};

    source: ServerDataSource;
    public resMsg;

    constructor(private http: HttpClient, private api_routers:apiRoutersService) {
      this.source = new ServerDataSource(http, { endPoint: 'http://192.168.122.100/api_routers' });
    }

    onDeleteConfirm(event) {
      if (window.confirm('Are you sure you want to delete?')) {
        event.confirm.resolve(event.data);
      //  console.log(event.newData.router_ip);
        let InvId = event.data['InvId'];
        console.log(InvId);
        this.api_routers.removeRouter(InvId)
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
        let invId = event.newData['InvId'];
        //let ip = this.setIP(event);
        let manufacturer = event.newData['manufacturer'];
        let model_no = event.newData['model_no'];
        let location = event.newData['location'];
        // manufacturer = manufacturer.replace(" ", "");
        // location = location.replace(" ", "");
        this.api_routers.editRouter(invId,manufacturer, model_no, location)
        .subscribe(resMsg => this.resMsg = resMsg);

      } else {
        event.confirm.reject();
      }
    }

    onCreateConfirm(event) {
      if (window.confirm('Are you sure you want to create?')) {
        //event.newData['name'] += ' + added in code';
        event.confirm.resolve(event.newData);
      let InvId = event.newData['InvId'];

      //  let invId = this.set(event);
      let manufacturer = event.newData['manufacturer'];
      let model_no = event.newData['model_no'];
      let location = event.newData['location'];

      this.api_routers.addRouter(InvId, manufacturer, model_no, location)
      .subscribe(resMsg => this.resMsg = resMsg);

      } else {
        event.confirm.reject();
      }
    }

  }
