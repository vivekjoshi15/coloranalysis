import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorPickerModule } from 'ngx-color-picker'; 
import { WebcamModule } from 'ngx-webcam';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { AdunitService } from './adunit.service';
import { DataService, DataServiceOptions, ApiService } from './services/index';
import { BaseComponent } from './common/base/base.component';
import { ModalComponent } from './common/modals/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ColorPickerModule,
    MaterialModule,
    WebcamModule,    
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiService,
    DataService, 
    DataServiceOptions,
    AdunitService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
