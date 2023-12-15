import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { WebService } from 'src/app/services/webservice/web.service';

@Component({
  selector: 'app-release-vehicle',
  templateUrl: './release-vehicle.component.html',
  styleUrls: ['./release-vehicle.component.scss']
})
export class ReleaseVehicleComponent implements OnInit {
  constructor(@Inject(NZ_MODAL_DATA) public data: any, private modal: NzModalRef, private web: WebService, private http:HttpClient) { }

  ngOnInit(): void {
  }

  releaseVehicle(data: any) {
    this.web.deleteData(`parking/${data.id}`).subscribe({
      next: (res: any) => {
        this.modal.close(data);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
  
}
