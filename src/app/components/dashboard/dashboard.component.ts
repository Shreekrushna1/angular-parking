import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';
import { WebService } from 'src/app/services/webservice/web.service';
import { AvailableParkingsComponent } from './dialogs/available-parkings/available-parkings.component';
import { ReleaseVehicleComponent } from './dialogs/release-vehicle/release-vehicle.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private web: WebService, private router: Router, private http: HttpClient, private dialog: NzModalService) { }
  isActive: string = 'car';
  parkedVehicleCarsData: any[] = [];
  parkedVehicleBikesData: any[] = [];
  currentUser: any;
  loggedEmail: string | null = '';
  bookByAnotherUser : any[] = [];
  parkedVehicle: any[] = [];
  bikesParked: any[] = [];
  columnA: string[] = [];
  columnB: string[] = [];
  columnC: string[] = [];
  columnD: string[] = [];
  availableCars: number = 0;
  availableBikes: number = 0;
  ngOnInit(): void {
    this.onReload();
  }
  onReload(){
    this.loggedEmail = localStorage.getItem('currentUserEmail');
    this.getCurrentUser();
    this.getColumns('car');
  }

  get getShortName(): string{
    return this.currentUser[0].firstName.charAt(0) + this.currentUser[0].lastName.charAt(0);
  }
  getColumns(type: string) {
    this.columnA = [];
    this.columnB = [];
    this.columnC = [];
    this.columnD = [];
    for (let column = 'A' as string; column <= 'D' as unknown as string; column = String.fromCharCode(column.charCodeAt(0) + 1)) {
      for (let i = 1; i <= 14; i++) {
        const element = `${column}${i}`;
        this.checkCondition(element, type);
        switch (column) {
          case 'A':
            this.columnA.push(element);
            break;
          case 'B':
            this.columnB.push(element);
            break;
          case 'C':
            this.columnC.push(element);
            break;
          case 'D':
            this.columnD.push(element);
            break;
        }
      }
    }
    this.getVehicles(type);
  }

  getVehicles(type: string) {
    this.web.getData('parking').subscribe((res: any) => {
      this.parkedVehicle = [];
      this.bikesParked = [];
      this.bookByAnotherUser = [];
    
      res.forEach((response: any) => {
        if (response.email === this.currentUser[0].email) {
          if (response.vehicleType === 'car') {
            this.parkedVehicle.push(response.slot);
            this.parkedVehicleCarsData.push(response);
          } else if (response.vehicleType === 'bike') {
            this.bikesParked.push(response.slot);
            this.parkedVehicleBikesData.push(response);
          }
        } else {
          if (response.slot) {
            const vehicleType = type;
            if(response.vehicleType === vehicleType){
              this.bookByAnotherUser.push(vehicleType,response.slot);
            }
          }
        }
      });      
    });
    setTimeout(() => {
      this.availableCars = this.currentUser[0].cars.length;
      this.availableBikes = this.currentUser[0].bikes.length;
    }, 1000);
  }
  isBookedByAnotherUser(slot: string,type: string): string {
    let isParked;
    if (type === 'car') {
      isParked = this.parkedVehicle.includes(slot);
    } else if (type === 'bike') {
      isParked = this.bikesParked.includes(slot);
    }
    return isParked ? 'parked' : 'non-parked';
  }
  

  checkCondition(vehicleNumber: string, type: string): boolean {
    if (type === 'car') {
      return this.parkedVehicle.includes(vehicleNumber);
    } else {
      return this.bikesParked.includes(vehicleNumber);
    }
  }

  isParked(slot: string, type: string): string {
    const isBooked = this.bookByAnotherUser.includes(slot);
    if (isBooked) {
      return 'booked-by-another-user';
    } else {
      let isParked;
      if (type === 'car') {
        isParked = this.parkedVehicle.includes(slot);
      } else if (type === 'bike') {
        isParked = this.bikesParked.includes(slot);
      }
      return isParked ? 'parked' : 'non-parked';
    }
  }
  

  handleButtonClick(slot: string): void {
    const dialogRef = this.dialog.create({
      nzTitle: 'Parking Slots',
      nzContent: AvailableParkingsComponent,
      nzData: { slotsData: this.isActive === 'car' ? this.parkedVehicle : this.bikesParked, currentUser: this.currentUser, selectedSlot: `${slot}`, vehicleType: this.isActive, otherUser: this.bookByAnotherUser },
      nzFooter: null
    });

    dialogRef.afterClose.subscribe((result) => {
      if(result){
        this.onReload();
      }
    });
  }

  releaseCar(type: string): void {
    const dialogRef = this.dialog.create({
      nzTitle: `Release ${type}`,
      nzContent: ReleaseVehicleComponent,
      nzData: {vehicleData: this.isActive === 'car' ? this.parkedVehicleCarsData : this.parkedVehicleBikesData },
      nzFooter: null
    });

    dialogRef.afterClose.subscribe((result) => {
      if(result){
        this.onReload();
      }
    })
  }
  getCurrentUser() {
    this.web.getData('users').subscribe((res: any) => {
      const foundUser: any = res.find((response: any) => {
        if (response.email === this.loggedEmail) {
          return response;
        }
      });
      if (foundUser) {
        this.currentUser = [foundUser];
      };
    });
  }

  changeType(type: string) {
    this.isActive = type;
    this.parkedVehicleBikesData = [];
    this.parkedVehicleCarsData = [];
    this.getColumns(type);
  }
  logout() {
    localStorage.removeItem('currentUserEmail');
    this.router.navigate(['login']);
  }

}
