import { Component, OnInit } from '@angular/core';
import { ViewMode, page_size } from '../constants';

@Component({
	selector: 'app-base',
	templateUrl: './base.component.html',
	styleUrls: ['./base.component.css']
})

export class BaseComponent implements OnInit {
	page_size: number = page_size;
	view_mode: ViewMode;
	ngOnInit() {
	}

	setViewMode(view_mode: ViewMode){
		this.view_mode = view_mode;
	}

	isEditMode(){
		if (this.view_mode== ViewMode.editMode){
			return true;
		}else{
			return false;
		}
	}

}
