import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../app/common/base/base.component';

import { Observable, Subject } from 'rxjs';
import { WebcamUtil, WebcamInitError, WebcamImage } from 'ngx-webcam';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { userresponse, users } from './models/users';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'Color Analysis';
  userId: string;
  public colorArray: any = {};
  public selectedColorArray: any={};
  showregisterLogin: string;
  stepRegister: boolean;
  stepLogin: boolean;
  showModal: string;
  showModal1: string;
  showModal2: string;
  stepOne: boolean;
  stepTwo: boolean;
  stepThree: boolean;
  colorPicker: any;


  chkpink: boolean;
  chkblue: boolean;
  chkgreen: boolean;
  colorSelected:string;

  userResponse: userresponse;
  userModel: users;

  imgUrl: string;
  imgBase64: string;
  loginerror: string;
  isloginerror: boolean;

  private key: string = "username";
  private key1: string = "password";
  private key2: string = "userId";
  private keyUrl: string = "url";

  private formSubmitAttempt: boolean;
  myform: FormGroup;
  userFirstName: FormControl;
  userLastName: FormControl;
  userEmail: FormControl;
  userName: FormControl;
  userPassword: FormControl;
  ConfirmPassword: FormControl;
  ConfirmPassword1: string;

  private formSubmitAttemptlogin: boolean;
  loginForm: FormGroup;
  loginUserName: FormControl;
  loginPassword: FormControl;

  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    //width: {ideal: 1024},
    //height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  constructor(private httpclient: HttpClient, private api: ApiService) {
    super();
    this.assigningColors();
  }

  ngOnInit() {
    this.userId = "5bdbe75dda2d64145c233d56";
    this.formSubmitAttempt = false;
    this.userFirstName = new FormControl('', [Validators.required]);
    this.userLastName = new FormControl('', [Validators.required]);
    this.userEmail = new FormControl('', [Validators.required]);
    this.userPassword = new FormControl('', [Validators.required]);
    this.userName = new FormControl('', [Validators.required]);
    this.ConfirmPassword = new FormControl('');

    this.formSubmitAttemptlogin = false;
    this.loginUserName = new FormControl('', [Validators.required]);
    this.loginPassword = new FormControl('', [Validators.required]);

    this.chkblue = true;
    this.chkpink = false;
    this.chkgreen = false;
    this.errors = [];
    this.imgUrl = '';
    this.imgBase64 = '';
    this.loginerror = '';
    this.showregisterLogin = 'none';
    this.showModal = 'none';
    this.showModal1 = 'none';
    this.showModal2 = 'none';
    this.stepOne = true;
    this.stepTwo = false;
    this.stepThree = false;
    this.stepRegister = false;
    this.stepLogin = false;
    this.isloginerror = false;
    this.myform = new FormGroup({
      userFirstName: this.userFirstName,
      userLastName: this.userLastName,
      userEmail: this.userEmail,
      userPassword: this.userPassword,
      userName: this.userName,
      ConfirmPassword: this.ConfirmPassword
    });

    this.loginForm = new FormGroup({
      loginUserName: this.loginUserName,
      loginPassword: this.loginPassword
    });


    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  openSignUpIn() {
    this.showregisterLogin = 'none';
    this.stepLogin = true;
    this.stepRegister = false;
    this.showModal = 'block';
    this.stepOne = true;
    this.stepTwo = false;
    this.stepThree = false;
    this.showModal1 = 'none';
    this.showModal2 = 'none';
    this.isloginerror = false;
    this.loginerror = '';
  }


  openModal() {
    this.showModal = 'block';
  }

  actStepTwo() {
    this.stepOne = false;
    this.stepTwo = true;
    this.stepThree = false;
  }

  actStepThree() {
    this.errors = [];
    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = true;
  }

  acceptPic() {
    this.errors = [];
    this.showModal = 'none';
    this.stepOne = true;
    this.stepTwo = false;
    this.stepThree = false;
    this.showModal1 = 'block';
  }

  submitColor() {
    if(this.colorSelected=="pink"){
      this.selectedColorArray = {};
      this.selectedColorArray["color"]=this.colorArray["pink"];
      this.selectedColorArray["color1"]=this.colorArray["pink1"];
      this.selectedColorArray["color2"]=this.colorArray["pink2"];
      this.selectedColorArray["color3"]=this.colorArray["pink3"];
      this.selectedColorArray["color4"]=this.colorArray["pink4"];
      this.selectedColorArray["color5"]=this.colorArray["pink5"];
      this.selectedColorArray["color6"]=this.colorArray["pink6"];
    }
    else if(this.colorSelected=="green"){
      this.selectedColorArray = {};
      this.selectedColorArray["color"]=this.colorArray["green"];
      this.selectedColorArray["color1"]=this.colorArray["green1"];
      this.selectedColorArray["color2"]=this.colorArray["green2"];
      this.selectedColorArray["color3"]=this.colorArray["green3"];
      this.selectedColorArray["color4"]=this.colorArray["green4"];
      this.selectedColorArray["color5"]=this.colorArray["green5"];
      this.selectedColorArray["color6"]=this.colorArray["green6"];
     
    }else {
      this.selectedColorArray = {};
      this.selectedColorArray["color"]=this.colorArray["blue"];
      this.selectedColorArray["color1"]=this.colorArray["blue1"];
      this.selectedColorArray["color2"]=this.colorArray["blue2"];
      this.selectedColorArray["color3"]=this.colorArray["blue3"];
      this.selectedColorArray["color4"]=this.colorArray["blue4"];
      this.selectedColorArray["color5"]=this.colorArray["blue5"];
      this.selectedColorArray["color6"]=this.colorArray["blue6"];
    }
    this.showModal = 'none';
    this.stepOne = true;
    this.stepTwo = false;
    this.showModal1 = 'none';
    this.showModal2 = 'block';
  }

  submitFinal() {
    this.showModal = 'none';
    this.stepOne = true;
    this.stepTwo = false;
    this.showModal1 = 'none';
    this.showModal2 = 'none';
    this.showregisterLogin = "block";
  }

  public retakePic() {
    this.stepOne = false;
    this.stepTwo = true;
    this.stepThree = false;
  }

  public triggerSnapshot(): void {
    this.trigger.next();
    this.imgBase64 = this.webcamImage.imageAsBase64;
    var data: any;
    data = this.webcamImage.imageAsBase64
    this.api.saveImages(this.imgBase64).subscribe((response) => {
      if (response != null) {
        this.imgUrl = response["url"]
        sessionStorage.setItem(this.keyUrl, response["url"]);
        this.stepOne = false;
        this.stepTwo = false;
        this.stepThree = true;
      }
      else {

      }
    }, err => {
      console.log(err);

    });
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors = [];
    this.errors.push(error);
  }

  registerClose() {
    this.showregisterLogin = "none";
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    //console.info("received webcam image", webcamImage);
    console.log("received webcam image", webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log("active device: " + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  assigningColors() {
    this.colorArray['pink'] = '#ef1fbb';
    this.colorArray['pink1'] = '#e22c71';
    this.colorArray['pink2'] = '#fd1efc';
    this.colorArray['pink3'] = '#fdb0cf';
    this.colorArray['pink4'] = '#fa33a0';
    this.colorArray['pink5'] = '#f7cac9';
    this.colorArray['pink6'] = '#fd7aba';

    this.colorArray['blue'] = '#2c397c';
    this.colorArray['blue1'] = '#1e1d8f';
    this.colorArray['blue2'] = '#1e8efd';
    this.colorArray['blue3'] = '#7ea1ef';
    this.colorArray['blue4'] = '#81c9fb';
    this.colorArray['blue5'] = '#96d0ed';
    this.colorArray['blue6'] = '#8ebac9';

    this.colorArray['green'] = '#207035';
    this.colorArray['green1'] = '#cae958';
    this.colorArray['green2'] = '#999e85';
    this.colorArray['green3'] = '#a9b79f';
    this.colorArray['green4'] = '#178078';
    this.colorArray['green5'] = '#178078';
    this.colorArray['green6'] = '#49f92c';

    this.colorArray['clrBlue'] = '#95c8da';
    this.colorArray['clrBlue1'] = '#8bcff2';
    this.colorArray['clrBlue2'] = '#73c2fd';
    this.colorArray['clrBlue3'] = '#6795f8';
    this.colorArray['clrBlue4'] = '#0080ff';
    this.colorArray['clrBlue5'] = '#020181';
    this.colorArray['clrBlue6'] = '#121f6d';
  }

  isFieldInvalid(field: string) {
    return ((!this.myform.get(field)!.valid && this.myform.get(field)!.touched) ||
      (this.myform.get(field)!.untouched && this.formSubmitAttempt));
  }

  isFieldInvalidlogin(field: string) {

    return ((!this.loginForm.get(field)!.valid && this.loginForm.get(field)!.touched) ||
      (this.loginForm.get(field)!.untouched && this.formSubmitAttemptlogin));
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.api.login(this.loginUserName.value, this.loginPassword.value, sessionStorage.getItem(this.keyUrl)).subscribe((response) => {
        if (response != null) {
          sessionStorage.setItem(this.key2, response["user"]["userId"]);
          this.showregisterLogin = 'none';
          this.stepLogin = false;
          this.stepRegister = false;
          this.showModal = 'block';
          this.stepOne = true;
          this.loginerror = '';
          this.isloginerror = false;
        }
        else {
          this.isloginerror = true;
          this.loginerror = 'Username or Password is incorrect !!!';
        }
      }, err => {
        console.log(err);

      });

    }
    else {
      this.formSubmitAttemptlogin = true;
    }
  }

  onUserSubmit() {
    if (this.myform.valid) {
      console.log("VALID");
    } else {
      console.log("Not VALID");
    }
  }

  openRegister() {
    this.showregisterLogin = 'block';
    this.stepLogin = false;
    this.stepRegister = true;
    this.showModal = 'none';
    this.stepOne = false;
  }

  goPrevious() {
    this.showModal = 'none';
    this.stepOne = true;
    this.stepTwo = false;
    this.showModal1 = 'block';
    this.showModal2 = 'none';
  }
  pinkChange() {
    this.chkpink = true;
    this.chkblue = false;
    this.chkgreen = false;
    this.colorSelected="pink";
  }
  blueChange() {
    this.chkpink = false;
    this.chkblue = true;
    this.chkgreen = false; 
    this.colorSelected="blue";
  }
  greenChange() { 
    this.chkpink = false;
    this.chkblue = false;
    this.chkgreen = true;
    this.colorSelected="green";
  }

}
