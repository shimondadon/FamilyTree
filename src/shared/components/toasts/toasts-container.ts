import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
	selector: 'app-toasts',
	standalone: true,
	imports: [NgbToastModule, NgIf, NgTemplateOutlet, NgFor],
	templateUrl:'./toasts-container.html',
	styleUrls:['./toasts-container.css']
})
export class ToastsContainer {
	constructor(public toastService: ToastService) {}

	isTemplate(toast:any) {
		return toast.textOrTpl instanceof TemplateRef;
	}
}