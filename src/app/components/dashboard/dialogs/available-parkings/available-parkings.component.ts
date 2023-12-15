import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { WebService } from 'src/app/services/webservice/web.service';

@Component({
  selector: 'app-available-parkings',
  templateUrl: './available-parkings.component.html',
  styleUrls: ['./available-parkings.component.scss']
})
export class AvailableParkingsComponent implements OnInit {
  constructor(@Inject(NZ_MODAL_DATA) public data: any, private modal: NzModalRef, private web: WebService) { }
  slotsForm = new FormGroup({
    selectedSlot: new FormControl('', Validators.required),
    seletedVehicle: new FormControl('', Validators.required),
  });
  availableSlots: string[] = [];
  bookedSlots: any[] = [];
  availableCars: any[] = [];
  availableBikes: any[] = [];
  bookedCars: any[] = [];
  bookedBikes: any[] = [];
  selectedSlot: string = '';
  email: any;
  vehicleType: string = '';
  otherBookedVehicles :any[] = [];
  ngOnInit(): void {
    const type = this.data.vehicleType;
    this.otherBookedVehicles = this.data.otherUser;
    this.getAvailableVehicles();
    this.getAvailableSlots(type);
  }

  getAvailableVehicles() {
    this.web.getData('parking').subscribe((res: any) => {
      res.map((response:any) => {
        if(response.vehicleType ==='car'){
          this.bookedCars.push(response);
        } else if (response.vehicleType === 'bike'){
          this.bookedBikes.push(response);
        }
      })
    });
  }

  getAvailableSlots(type: string) {
    this.bookedSlots = this.data.slotsData.map((res: any) => {
      return res;
    });
  
    this.email = this.data.currentUser[0].email;
  
    if (type === 'car') {
      this.availableCars = this.data.currentUser[0].cars;
    } else if (type === 'bike') {
      this.availableBikes = this.data.currentUser[0].bikes;
    }
  
    this.selectedSlot = this.data.selectedSlot;
    this.vehicleType = this.data.vehicleType;
    this.otherBookedVehicles.forEach((user: any, index: number) => {
      if ((index + 1) % 2 === 0) {
        this.bookedSlots.push(user);
      }
    });
    setTimeout(() => {
      this.removeBookedCars(type);
    }, 100);
  
    for (let column = 'A' as string; column <= 'D' as unknown as string; column = String.fromCharCode(column.charCodeAt(0) + 1)) {
      for (let i = 1; i <= 14; i++) {
        const element = `${column}${i}`;
        if (!this.isSlotBooked(element)) {
          this.availableSlots.push(element);
        }
      }
    }
  }
  
  removeBookedCars(type:string) {
    if(type === 'car') {
      if (this.availableCars || this.bookedCars.length) {
        this.availableCars = this.availableCars.filter((car: any) => {
          return !this.bookedCars.some((res: any) => car === res.vehicleNumber);
        });
      }
    }
    else if(type ==='bike'){
      if (this.availableBikes  || this.bookedBikes.length) {
        this.availableBikes = this.availableBikes.filter((car: any) => {
          return !this.bookedBikes.some((res: any) => car === res.vehicleNumber);
        });
      }
    }
  }
  

  isSlotBooked(slot: any) {
    return this.bookedSlots.includes(slot);
  }

  cancelForm(data?:any) {
    this.modal.close(data);
  }
  submitForm() {
    if (this.slotsForm.invalid) {
      Object.values(this.slotsForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }
    const parkedVehicle = {
      email: this.email,
      vehicleType: this.vehicleType,
      vehicleNumber: this.slotsForm.value.seletedVehicle,
      slot: this.slotsForm.value.selectedSlot,
    }
    this.web.postData('parking', parkedVehicle).subscribe((res: any) => {
      this.modal.close(parkedVehicle);
    })
  }
}